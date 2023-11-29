const { patient, city, previous_history, contact, user } = require('../DB/index');

async function create(req) {
  // try {
  const existingPerson = await patient.findOne({
    where: {
      id: req.id
    }
  });

  if (existingPerson) {
    return { status: 201, mensaje: 'The patient is already created' };
  }

  let existingCity;

  // Verificar y crear la ciudad según la existencia del ID o el nombre
  if (req.city_of_birth && !req.city_of_birth.id) {
    const [newCity, createdCity] = await city.findOrCreate({
      where: {
        name: req.city_of_birth.name,
        state: req.city_of_birth.state
      }
    });
    existingCity = newCity;
  } else if (req.city_of_birth && req.city_of_birth.id) {
    existingCity = await city.findByPk(req.city_of_birth.id);
  }

  // Crea la nueva persona sin referencia a la ciudad si no se proporciona
  const personData = {
    ...req,
    ...(req.city_of_birth && { city_of_birth: existingCity.id })
  };

  const newPerson = await patient.create(personData);

  return { status: 200, mensaje: 'The patient or patient has been created', data: newPerson };
  // } catch (error) {
  //   return { status: 500, mensaje: 'Error creating patient', error };
  // }
}

async function getAll() {
  // try {
  const allPersons = await patient.findAll({
    include: [
      {
        model: city
      }
    ]
  });

  if (!allPersons || allPersons.length === 0) {
    return { status: 404, mensaje: 'No persons found' };
  }

  return { status: 200, mensaje: 'Persons retrieved successfully', data: allPersons };
  // } catch (error) {
  //   return { status: 500, mensaje: 'Error fetching persons', error: error.message };
  // }
}

async function update(body, params) {
  try {
    const personToUpdate = await person.findOne({
      where: {
        id: params.id
      },
      include: [{ model: city }]
    });

    if (!personToUpdate) {
      return { status: 404, mensaje: 'Person not found' };
    }

    const originalPerson = { ...personToUpdate.get() }; // Copia de las propiedades originales

    Object.assign(personToUpdate, body);
    personToUpdate.updated_at = new Date();

    await personToUpdate.save();

    // Verificar si al menos una columna ha cambiado
    const hasChanged = Object.keys(body).some((key) => personToUpdate[key] !== originalPerson[key]);

    if (hasChanged) {
      return { status: 200, mensaje: 'The person has been updated', data: personToUpdate };
    } else {
      return { status: 201, mensaje: 'No changes detected' };
    }
  } catch (error) {
    return { status: 500, mensaje: 'Error updating person', error };
  }
}

async function getId(id) {
  try {
    const foundPerson = await patient.findByPk(id, {
      include: [
        {
          model: city
        }
      ]
    });

    if (!foundPerson) {
      return { status: 404, message: 'Person not found' };
    }

    return { status: 200, message: 'Person found', data: foundPerson };
  } catch (error) {
    return { status: 500, message: 'Error fetching person', error: error.message };
  }
}

async function createPreviousHistory(req) {
  try {
    const newPreviousHistory = await previous_history.findOne({
      where: {
        patient_id: patient_id
      }
    });

    if (newPreviousHistory) {
      return { status: 201, mensaje: 'The previous_history is already created' };
    }

    // Crea el registro en previous_history
    const newPreviousHistoryRecord = await previous_history.create(req);

    return { status: 200, mensaje: 'The previous_history has been created', data: newPreviousHistoryRecord };
  } catch (error) {
    return { status: 500, mensaje: 'Error creating previous history', error };
  }
}

async function createContact(req) {
  const newContact = await contact.create(req);
  return { status: 200, mensaje: 'The contact has been created', newContact };
}

async function createUser(req) {
  const newUser = await user.create(req);
  return { status: 200, mensaje: 'The user has been created', newUser };
}

async function getUserById(userId) {
  try {
    const newUser = await user.findOne({ where: { id: userId.id } });

    if (newUser) {
      return { status: 200, mensaje: 'User found', newUser };
    } else {
      return { status: 404, mensaje: 'User not found' };
    }
  } catch (error) {
    // Manejo de errores si la búsqueda falla
    return { status: 500, mensaje: 'Error fetching user', error };
  }
}

module.exports = {
  create,
  getAll,
  getId,
  update,
  createPreviousHistory,
  createContact,
  createUser,
  getUserById
};
