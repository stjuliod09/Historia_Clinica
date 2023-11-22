const {person, city, state, patient, previous_history, previous_history_follow_up, antecedent_type} = require("../DB/index");

async function create(req) {
    try {
        const existingPerson = await person.findOne({
            where: {
                id: req.id,
            }
        });

        if (existingPerson) {
            return { status: 201, mensaje: "The person is already created" };
        }

        let existingState, existingCity;

        // Verificar y crear el estado si no se proporciona el ID
        if (!req.city_of_birth.state.id) {
            // En caso de que no se proporcione el ID del estado,
            // intenta buscarlo o crearlo en base a los otros datos
            const [newState, createdState] = await state.findOrCreate({
                where: {
                    name: req.city_of_birth.state.name,
                    code: req.city_of_birth.state.code,
                    country_id: req.city_of_birth.state.country_id
                }
            });
            existingState = newState;
        } else {
            // Si se proporciona el ID del estado, busca el estado existente
            existingState = await state.findByPk(req.city_of_birth.state.id);
        }

        // Verificar y crear la ciudad según la existencia del ID o el nombre
        if (!req.city_of_birth.id) {
            // Si no se proporciona el ID de la ciudad, busca o crea una nueva ciudad por el nombre
            const [newCity, createdCity] = await city.findOrCreate({
                where: {
                    name: req.city_of_birth.name,
                    code: req.city_of_birth.code,
                    state_id: existingState.id
                }
            });
            existingCity = newCity;
        } else {
            // Si se proporciona el ID de la ciudad, busca la ciudad existente
            existingCity = await city.findByPk(req.city_of_birth.id);
        }

        // Crea la nueva persona con las referencias a la ciudad y el estado
        const newPerson = await person.create({
            ...req,
            city_of_birth: existingCity.id,
            state_id: existingState.id,
        });

        const newPatient = await patient.create({
            person_id: newPerson.id,
            is_active: 1,
        });

        return { status: 200, mensaje: "The person or patient has been created", person: newPerson };
    } catch (error) {
        return { status: 500, mensaje: "Error creating person", error };
    }
}

async function getAll() {
    try {
        const allPersons = await person.findAll({
            include: [
                {
                    model: city,
                    include: {
                        model: state ,
                    },
                },
            ],
        });
  
      if (!allPersons || allPersons.length === 0) {
        return { status: 404, mensaje: "No persons found" };
      }
  
      return { status: 200, mensaje: "Persons retrieved successfully", data: allPersons };
    } catch (error) {
      return { status: 500, mensaje: "Error fetching persons", error: error.message };
    }
  }
  

  async function update(body, params) {
    try {
        const personToUpdate = await person.findOne({
            where: {
                id: params.id,
            },
            include: [{ model: city, include: state }], // Incluye city y, a su vez, incluye state
        });

        if (!personToUpdate) {
            return { status: 404, mensaje: "Person not found" };
        }

        const originalPerson = { ...personToUpdate.get() }; // Copia de las propiedades originales

        Object.assign(personToUpdate, body);
        personToUpdate.updated_at = new Date();

        await personToUpdate.save();

        // Verificar si al menos una columna ha cambiado
        const hasChanged = Object.keys(body).some(key => personToUpdate[key] !== originalPerson[key]);

        if (hasChanged) {
            return { status: 200, mensaje: "The person has been updated", data: personToUpdate };
        } else {
            return { status: 201, mensaje: "No changes detected" };
        }
    } catch (error) {
        return { status: 500, mensaje: "Error updating person", error };
    }
}


async function getId(id) {
    try {
      const foundPerson = await person.findByPk(id,
        {include: [
            {
                model: city,
                include: {
                    model: state,
                },
            },
        ],
        });
  
      if (!foundPerson) {
        return { status: 404, message: "Person not found" };
      }
  
      return { status: 200, message: "Person found", data: foundPerson };
    } catch (error) {
      return { status: 500, message: "Error fetching person", error: error.message };
    }
  }

async function createPreviousHistory(req){
    const { patient_id, personal, relative, approximated_date_of_occurrence, value } = req;

    try {
        const newPreviousHistory = await previous_history.findOne({
            where: {
                patient_id: patient_id,
            }
        });

        if (newPreviousHistory) {
            return { status: 201, mensaje: "The previous_history is already created" }
        }

        // En este punto, necesitas buscar o crear el antecedent_type según su nombre y código
        let AntecedentType = await antecedent_type.findOrCreate({
            where: {
                name: req.antecedent_type.name,
                code: req.antecedent_type.code
            }
        });

        // Obtiene el ID del antecedent_type encontrado o creado
        const antecedent_type_id = AntecedentType[0].id;

        // Crea el registro en previous_history
        const newPreviousHistoryRecord = await previous_history.create({
            patient_id,
            personal,
            relative,
            antecedent_type: antecedent_type_id,
            approximated_date_of_occurrence,
            value
        }, {
            include: [{
                model: antecedent_type,
                as: 'AntecedentTypeInfo', 
                attributes: ['id', 'name', 'code']
            }]
        });
        

        return { status: 200, mensaje: "The previous_history has been created", data: newPreviousHistoryRecord }
    } catch (error) {
        return { status: 500, mensaje: "Error creating previous history", error };
    }
}

  

module.exports = {
    create,
    getAll,
    getId,
    update,
    createPreviousHistory
};