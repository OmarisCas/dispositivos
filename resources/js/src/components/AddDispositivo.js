import React, { useEffect, useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import AppContainer from './AppContainer';
import api from '../api';

const AddDispositivo = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [mac, setMac] = useState('');
    const [nombre, setNombre] = useState('');
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [persona_id, setPersona_id] = useState('');
    const [filtro_id, setFiltro_id] = useState('');
    const [personas, setPersonas] = useState([]);
    const [filtros, setFiltros] = useState([]);

    const onAddSubmit = async () => {
        setLoading(true);
        try {
            await api.addDispositivo({
                mac, nombre, marca, modelo, persona_id, filtro_id
            })
            history.push('/dispositivos');
        } catch {
            alert('Fallo al agregar dispositivo!');
        } finally {
            setLoading(false);
        }
    };

    const fetchPersonas = () => {
        api.getAllPersonas().then(res => {
            const result = res.data;
            setPersonas(result.data)
        });
    }

    const fetchFiltros = () => {
        api.getAllFiltros().then(res => {
            const result = res.data;
            setFiltros(result.data)
        });
    }

    useEffect(() => {
        fetchPersonas();
        fetchFiltros();
    }, []);

    return(
        <AppContainer
            classcard="card border-success" classheader="card-header border-success" title="Agregar Dispositivo">
            <form>
                <div className="form-group">
                    <label>MAC</label>
                    <input className="form-control" type="text" value={mac} onChange={e => setMac(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Nombre</label>
                    <textarea className="form-control" value={nombre} onChange={e => setNombre(e.target.value)} ></textarea>
                </div>
                <div className="form-group">
                    <label>Marca</label>
                    <input className="form-control" type="text" value={marca} onChange={e => setMarca(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Modelo</label>
                    <input className="form-control" type="text" value={modelo} onChange={e => setModelo(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Dueño</label>
                    <select onChange={e => setPersona_id(e.target.value)} className="form-control">
                        <option selected>---------</option>
                        {personas.map(persona => 
                            <option key={persona.id} value={persona.id}>{persona.nombre+" "+persona.apellido}</option>
                        )}
                    </select>
                </div>
                <div className="form-group">
                    <label>Filtro</label>
                    <select onChange={e => setFiltro_id(e.target.value)} className="form-control">
                        <option selected>---------</option>
                        {filtros.map(filtro => 
                            <option key={filtro.id} value={filtro.id}>{filtro.nombre}</option>
                        )}
                    </select>
                </div>
                <div className="form-group">
                    <button type="button" className="btn btn-success" onClick={onAddSubmit} disabled={loading}>
                        {loading ? 'Cargando...' : 'Agregar'}
                    </button>&nbsp;&nbsp;
                    <Link type="button" className="btn btn-danger" to="/dispositivos">
                        {loading ? 'Cancelando...' : 'Cancelar'}
                    </Link>
                </div>
            </form>
        </AppContainer>
    );
};

export default AddDispositivo;