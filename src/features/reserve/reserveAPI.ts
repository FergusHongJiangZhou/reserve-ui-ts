import request from "../request";

const getReservationsQuery = `
query {
  getReservations {
    size
    id
    userId
    user{
      id
      name
    }
    status
    reservedAt
  }
}`;

export function fetchReservations() {
  return request({
    method: "post",
    data: {
      query: getReservationsQuery,
    },
  });
}

const getReservationByIdQuery = `
query($id: String!) {
  getReservationById(Id: $id) {
    size
    id
    userId
    user{
      id
      name
      phone
    }
    status
    reservedAt
  }
}`;

export function fetchReservationById(id: string) {
  return request({
    method: "post",
    data: {
      query: getReservationByIdQuery,
      variables: {
        id,
      },
    },
  });
}

const reserveQuery = `
mutation($size: Float!, $userId: ID!, $reservedAt: DateTime!) {
  addReservation(ReservationInput: {
    size: $size,
    userId: $userId,
    reservedAt: $reservedAt,
  }){
    id
    size
    userId
    reservedAt
    status
    user {
      id
      name
      phone
    }
  }
}`;

export function reserve(size: number, userId: string, reservedAt: Date) {
  return request({
    method: "post",
    data: {
      query: reserveQuery,
      variables: {
        size,
        userId,
        reservedAt,
      },
    },
  });
}

const updateQuery = `
mutation($id: ID!, $size: Float!, $status: String!, $reservedAt: DateTime!) {
  updateReservation(ReservationInput: {
    id: $id,
    size: $size,
    status: $status,
    reservedAt: $reservedAt,
  }){
    id
    size
    userId
    reservedAt
    status
    user {
      id
      name
      phone
    }
  }
}`;

export function update(id: string, size: number, status: string, reservedAt: Date) {
  return request({
    method: "post",
    data: {
      query: updateQuery,
      variables: {
        id,
        size,
        status,
        reservedAt,
      },
    },
  });
}
