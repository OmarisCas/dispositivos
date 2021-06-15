import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from "react-router-dom";
import AppContainer from './AppContainer';
import api from '../api';

const EditDispositivo = () => {
    const { id } = useParams();
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

    const onEditSubmit = async () => {
        setLoading(true);
        try {
            await api.updateDispositivo({
                mac, nombre, marca, modelo, persona_id, filtro_id
            }, id);
            history.push('/dispositivos');
        } catch {
            alert('Fallo al editar dispositivo!');
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
        api.getOneDispositivo(id).then(res => {
            const result = res.data;
            const dispositivo = result.data;
            setMac(dispositivo.mac);
            setNombre(dispositivo.nombre);
            setMarca(dispositivo.marca);
            setModelo(dispositivo.modelo);
            setPersona_id(dispositivo.persona_id);
            setFiltro_id(dispositivo.filtro_id);
        })
        fetchPersonas();
        fetchFiltros();
    }, []);

    return(
        <AppContainer
            classcard="card border-danger" classheader="card-header border-danger" title="Editar Dispositivo">
            <form>
                <div className="form-group">
                    <label>Mac</label>
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
                        {personas.map(persona =>
                            <option selected={persona_id == persona.id} key={persona.id} value={persona.id}>{persona.nombre+" "+persona.apellido}</option>
                        )}
                    </select>
                </div>
                <div className="form-group">
                    <label>Filtro</label>
                    <select onChange={e => setFiltro_id(e.target.value)} className="form-control">
                        {filtros.map(filtro =>
                            <option selected={filtro_id == filtro.id} key={filtro.id} value={filtro.id}>{filtro.nombre}</option>
                        )}
                    </select>
                </div>
                <div className="form-group">
                    <button type="button" className="btn btn-success" onClick={onEditSubmit} disabled={loading}>
                        {loading ? 'Cargando...' : 'Editar'}
                    </button>&nbsp;&nbsp;
                    <Link type="button" className="btn btn-danger" to="/dispositivos">
                        {loading ? 'Cancelando...' : 'Cancelar'}
                    </Link>
                </div>
            </form>
        </AppContainer>
    );
};

export default EditDispositivo;