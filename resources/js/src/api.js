const axios = window.axios;

const BASE_API_URL = 'http://192.168.18.101:8000/api'

export default {
    //PERSONAS
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

    //DISPOSITIVOS
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

    //CARGOS
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

    //IPES
    getAllIpes: () =>
        axios.get(`${BASE_API_URL}/ipes`),
    getAllIpesOff: () =>
        axios.get(`${BASE_API_URL}/ipesoff`),
    getOneIpe: (id) =>
        axios.get(`${BASE_API_URL}/ipes/${id}/edit`),
    addIpe: (ipe) =>
        axios.post(`${BASE_API_URL}/ipes`, ipe),
    updateIpe: (ipe, id) =>
        axios.put(`${BASE_API_URL}/ipes/${id}`, ipe),
    deleteIpe: (id) =>
        axios.delete(`${BASE_API_URL}/ipes/${id}`),

    //ESTADOS
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

    //CONEXIONES
    getAllConexiones: () =>
        axios.get(`${BASE_API_URL}/conexiones`),
    getOneConexione: (id) =>
        axios.get(`${BASE_API_URL}/conexiones/${id}/edit`),
    addConexione: (conexione) =>
        axios.post(`${BASE_API_URL}/conexiones`, conexione),
    updateConexione: (conexione, id) =>
        axios.put(`${BASE_API_URL}/conexiones/${id}`, conexione),
    deleteConexione: (id) =>
        axios.delete(`${BASE_API_URL}/conexiones/${id}`),

    //MONITOREOS
    getAllMonitoreos: () =>
        axios.get(`${BASE_API_URL}/monitoreos`),
    getOneMonitoreo: (id) =>
        axios.get(`${BASE_API_URL}/monitoreos/${id}/edit`),
    addMonitoreo: (monitoreo) =>
        axios.post(`${BASE_API_URL}/monitoreos`, monitoreo),
    updateMonitoreo: (monitoreo, id) =>
        axios.put(`${BASE_API_URL}/monitoreos/${id}`, monitoreo),
    deleteMonitoreo: (id) =>
        axios.delete(`${BASE_API_URL}/monitoreos/${id}`),

    //FILTROS
    getAllFiltros: () =>
        axios.get(`${BASE_API_URL}/filtros`),
    getOneFiltro: (id) =>
        axios.get(`${BASE_API_URL}/filtros/${id}/edit`),
    addFiltro: (filtro) =>
        axios.post(`${BASE_API_URL}/filtros`, filtro),
    updateFiltro: (filtro, id) =>
        axios.put(`${BASE_API_URL}/filtros/${id}`, filtro),
    deleteFiltro: (id) =>
        axios.delete(`${BASE_API_URL}/filtros/${id}`),
    
}