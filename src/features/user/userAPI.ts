import request from "../request";

const getUsersQuery = `
query {
  getUsers {
    id
    name
    phone
  }
}`;

export function fetchUsers() {
  return request({
    method: "post",
    data: {
      query: getUsersQuery,
    },
  });
}

const fetchUserQuery = `
query($id: String!) {
  getUserById(Id: $id){
    id
    name
    phone
    role
  }
}`;

export function fetchUserById(id: string) {
  return request({
    method: "post",
    data: {
      query: fetchUserQuery,
      variables: { id },
    },
  });
}

const registerQuery = `
mutation($name: String!, $password: String!, $phone: String!) {
  addUser(UserInput: {
    name: $name,
    phone: $phone,
    password: $password,
  }){
    id
    name
    phone
    password
  }
}`;

export function register(name: string, phone: string, password: string) {
  return request({
    method: "post",
    data: {
      query: registerQuery,
      variables: {
        name,
        phone,
        password,
      },
    },
  });
}

const loginQuery = `
mutation($name: String!, $password: String!) {
  login(UserInput: {
    name: $name,
    password: $password,
  }){
    accessToken
    userId
  }
}`;

export function login(name: string, password: string) {
  return request({
    method: "post",
    data: {
      query: loginQuery,
      variables: {
        name,
        password,
      },
    },
  });
}
