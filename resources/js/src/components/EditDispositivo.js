import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
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
    const [personas, setPersonas] = useState([]);

    const onEditSubmit = async () => {
        setLoading(true);
        try {
            await api.updateDispositivo({
                mac, nombre, marca, modelo, persona_id
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

    useEffect(() => {
        api.getOneDispositivo(id).then(res => {
            const result = res.data;
            const dispositivo = result.data;
            setMac(dispositivo.mac);
            setNombre(dispositivo.nombre);
            setMarca(dispositivo.marca);
            setModelo(dispositivo.modelo);
            setPersona_id(dispositivo.persona_id);
        })
        fetchPersonas();
    }, []);

    return(
        <AppContainer title="Editar Dispositivo">
            <form>
                <div className="form-group">
                    <label>Mac</label>
                    <textarea className="form-control" value={mac} onChange={e => setMac(e.target.value)} ></textarea>
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
                    <button type="button" className="btn btn-success" onClick={onEditSubmit} disabled={loading}>
                        {loading ? 'Cargando...' : 'Editar'}
                    </button>
                </div>
            </form>
        </AppContainer>
    );
};

export default EditDispositivo;