const ENDPOINT = `https://todo-backend-101.herokuapp.com/`;
const VERSION = `api/v1/`;

export const BASE_URL = `${ENDPOINT}${VERSION}`;

export const getField = (fieldName, list, id) => {
  for (let idx = 0; idx < list.length; idx++) {
    const element = list[idx];
    if (element._id === id) {
      return !fieldName ? element : element[fieldName];
    }
  }
};
