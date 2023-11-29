const cabezeraSinToken = {
  'Content-Type': 'application/json'
};
const Url = 'http://localhost:4000';

const APIURL = Url + '/person/';

const UserService = {
  getAll: async function () {
    try {
      const url = APIURL + 'getAll';
      const requestOptions = {
        method: 'GET',
        headers: cabezeraSinToken,
        redirect: 'follow'
      };
      const response = await fetch(url, requestOptions);
      console.log(response);
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  },
  getId: async function (id) {
    try {
      const url = APIURL + 'get/' + `${id}`;
      console.log(url);

      const requestOptions = {
        method: 'GET',
        headers: cabezeraSinToken,
        redirect: 'follow'
      };
      const response = await fetch(url, requestOptions);

      const data = await response.json();
      console.log(data);

      return data;
    } catch (e) {
      console.log(e);
    }
  },
  create: async function (raw) {
    try {
      const url = APIURL + 'create';

      const requestOptions = {
        method: 'POST',
        body: JSON.stringify(raw),
        headers: cabezeraSinToken,
        redirect: 'follow'
      };
      const response = await fetch(url, requestOptions);
      console.log(response);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
    }
  },
  update: async function (raw) {
    try {
      const url = APIURL;
      const requestOptions = {
        method: 'POST',
        body: raw,
        headers: cabezeraSinToken,
        redirect: 'follow'
      };
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  },
  getUserById: async function (id) {
    try {
      const url = APIURL + `getUserById/${id}`;
      console.log(url);

      const requestOptions = {
        method: 'GET',
        headers: cabezeraSinToken,
        redirect: 'follow'
      };
      const response = await fetch(url, requestOptions);

      const data = await response.json();

      console.log(data);

      return data;
    } catch (e) {
      console.log(e);
    }
  },
  contactCreate: async function (raw) {
    try {
      console.log(raw);
      const url = APIURL + 'contact/create';
      const requestOptions = {
        method: 'POST',
        body: JSON.stringify(raw),
        headers: cabezeraSinToken,
        redirect: 'follow'
      };
      const response = await fetch(url, requestOptions);
      console.log(response);
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  }
};

export default UserService;
