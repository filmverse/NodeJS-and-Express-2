import axios from "axios";
const baseURL = 'http://localhost:3001/notes'

const getAll = () => {
    return axios.get(baseURL)
}

const create = (noteAdd) => {
    return axios.post(baseURL, noteAdd)
}

const update = () => {}

const remove = (id) => {
    return axios.delete(`baseURL/${id}`)
}

const noteApp = {getAll, create, remove}

export default noteApp;