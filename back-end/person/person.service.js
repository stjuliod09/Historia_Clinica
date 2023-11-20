const {person} = require("../DB/index");

async function create(req) {
    const criterio = {
        where: {
            first_name: req.first_name,
            first_last_name: req.first_last_name,
        }
    };

    let newPerson = await person.findOne(criterio); 

    if (newPerson) {
        return { status: 201, mensaje: "The person is already created" };
    }

    try {
        newPerson = await person.create(req); 
        return { status: 200, mensaje: "The person has been created", person: newPerson };
    } catch (error) {
        return { status: 500, mensaje: "Error creating person", error };
    }
}

async function getAll() {
    try {
      const allPersons = await person.findAll();
  
      if (!allPersons || allPersons.length === 0) {
        return { status: 404, mensaje: "No persons found" };
      }
  
      return { status: 200, mensaje: "Persons retrieved successfully", data: allPersons };
    } catch (error) {
      return { status: 500, mensaje: "Error fetching persons", error: error.message };
    }
  }
  

async function update(body, params) {
    const criterio = {
        where: {
            id: params.id
        }
    };

    let personToUpdate = await person.findOne(criterio);

    if (personToUpdate) {
        const originalPerson = { ...personToUpdate.get() }; // Copia de las propiedades originales

        try {
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
    } else {
        return { status: 404, mensaje: "Person not found" };
    }
}

async function getId(id) {
    try {
      const foundPerson = await person.findByPk(id);
  
      if (!foundPerson) {
        return { status: 404, message: "Person not found" };
      }
  
      return { status: 200, message: "Person found", data: foundPerson };
    } catch (error) {
      return { status: 500, message: "Error fetching person", error: error.message };
    }
  }
  

module.exports = {
    create,
    getAll,
    getId,
    update,
};