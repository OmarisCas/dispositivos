const axios = window.axios;

const BASE_API_URL = 'http://localhost:8000/api'

export default {
    getAllPersonas: () => 
        axios.get(`${BASE_API_URL}/personas`),
    getOnePersona: (id) =>
        axios.get(`${BASE_API_URL}/personas/${id}/edit`),
    addPersona: (persona) =>
        axios.post(`${BASE_API_URL}/personas`, persona),
    updatePersona: (persona, id) =>
        axios.put(`${BASE_API_URL}/personas/${id}`, persona),
    deletePersona: (id) =>
        axios.delete(`${BASE_API_URL}/personas/${id}`),

    getAllDispositivos: () => 
        axios.get(`${BASE_API_URL}/dispositivos`),
    getOneDispositivo: (id) =>
        axios.get(`${BASE_API_URL}/dispositivos/${id}/edit`),
    addDispositivo: (dispositivo) =>
        axios.post(`${BASE_API_URL}/dispositivos`, dispositivo),
    updateDispositivo: (dispositivo, id) =>
        axios.put(`${BASE_API_URL}/dispositivos/${id}`, dispositivo),
    deleteDispositivo: (id) =>
        axios.delete(`${BASE_API_URL}/dispositivos/${id}`),
}