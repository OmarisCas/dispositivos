import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
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

    const onAddSubmit = async () => {
        setLoading(true);
        try {
            await api.addDispositivo({
                mac, nombre, marca, modelo, persona_id,
            })
            history.push('/dispositivos');
        } catch {
            alert('Fallo al agregar dispositivo!');
        } finally {
            setLoading(false);
        }
    };

    return(
        <AppContainer title="Agregar Dispositivo">
            <form>
                <div className="form-group">
                    <label>MAC</label>
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
                    <label>Persona_id</label>
                    <input className="form-control" type="text" value={persona_id} onChange={e => setPersona_id(e.target.value)} />
                </div>
                <div className="form-group">
                    <button type="button" className="btn btn-success" onClick={onAddSubmit} disabled={loading}>
                        {loading ? 'Cargando...' : 'Agregar Dispositivo'}
                    </button>
                </div>
            </form>
        </AppContainer>
    );
};

export default AddDispositivo;