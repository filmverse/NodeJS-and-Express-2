import axios from "axios";
const baseURL = 'http://localhost:3001/api/persons'

const getAll = () => {
    return axios.get(baseURL)
}

const create = (newPerson) => {
    return axios.post(baseURL, newPerson)
}

const update = (id, newPerson) => {
    return axios.put(`${baseURL}/${id}`, newPerson)
}

const remove = (id) => {
    return axios.delete(`${baseURL}/${id}`)
}

const Book = {getAll, create, update, remove}

export default Book;