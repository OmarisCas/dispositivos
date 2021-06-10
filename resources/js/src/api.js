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

    getAllCargos: () =>
        axios.get(`${BASE_API_URL}/cargos`),
    getOneCargo: (id) =>
        axios.get(`${BASE_API_URL}/cargos/${id}/edit`),
    addCargo: (cargo) =>
        axios.post(`${BASE_API_URL}/cargos`, cargo),
    updateCargo: (cargo, id) =>
        axios.put(`${BASE_API_URL}/cargos/${id}`, cargo),
    deleteCargo: (id) =>
        axios.delete(`${BASE_API_URL}/cargos/${id}`),

    getAllIpes: () =>
        axios.get(`${BASE_API_URL}/ipes`),
    getOneIpe: (id) =>
        axios.get(`${BASE_API_URL}/ipes/${id}/edit`),
    addIpe: (ipe) =>
        axios.post(`${BASE_API_URL}/ipes`, ipe),
    updateIpe: (ipe, id) =>
        axios.put(`${BASE_API_URL}/ipes/${id}`, ipe),
    deleteIpe: (id) =>
        axios.delete(`${BASE_API_URL}/ipes/${id}`),

    getAllEstados: () =>
        axios.get(`${BASE_API_URL}/estados`),
    getOneEstado: (id) =>
        axios.get(`${BASE_API_URL}/estados/${id}/edit`),
    addEstado: (estado) =>
        axios.post(`${BASE_API_URL}/estados`, estado),
    updateEstado: (estado, id) =>
        axios.put(`${BASE_API_URL}/estados/${id}`, estado),
    deleteEstado: (id) =>
        axios.delete(`${BASE_API_URL}/estados/${id}`),
            
}