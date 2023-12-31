const personService = require('./person.service');

// CRUD USUARIOS

async function create(req, res, next) {
  const respuesta = await personService.create(req.body);
  return res.status(respuesta.status).json(respuesta);
}

async function update(req, res, next) {
  const respuesta = await personService.update(req.body, req.params);
  return res.status(respuesta.status).json(respuesta);
}

async function getId(req, res, next) {
  const respuesta = await personService.getId(req.params.id);
  return res.status(respuesta.status).json(respuesta);
}
async function getAll(req, res, next) {
  const respuesta = await personService.getAll();
  return res.status(respuesta.status).json(respuesta);
}

async function createPreviousHistory(req, res, next) {
  const respuesta = await personService.createPreviousHistory(req.body);
  return res.status(respuesta.status).json(respuesta);
}

async function createContact(req, res, next) {
  const respuesta = await personService.createContact(req.body);
  return res.status(respuesta.status).json(respuesta);
}

async function createUser(req, res, next) {
  const respuesta = await personService.createUser(req.body);
  return res.status(respuesta.status).json(respuesta);
}

async function getUserById(req, res, next) {
  const respuesta = await personService.getUserById(req.params);
  return res.status(respuesta.status).json(respuesta);
}

module.exports = {
  update,
  create,
  getAll,
  getId,
  createPreviousHistory,
  createContact,
  createUser,
  getUserById
};
