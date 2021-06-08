import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import AppContainer from './AppContainer';
import api from '../api';

const AddPersona = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [cargo_id, setCargo_id] = useState('');

    const onAddSubmit = async () => {
        setLoading(true);
        try {
            await api.addPersona({
                nombre, apellido, cargo_id,
            })
            history.push('/personas');
        } catch {
            alert('Fallo al agregar persona!');
        } finally {
            setLoading(false);
        }
    };

    return(
        <AppContainer title="Agregar Persona">
            <form>
                <div className="form-group">
                    <label>Nombre</label>
                    <input className="form-control" type="text" value={nombre} onChange={e => setNombre(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Apellido</label>
                    <input className="form-control" type="text" value={apellido} onChange={e => setApellido(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Cargo_id</label>
                    <input className="form-control" type="text" value={cargo_id} onChange={e => setCargo_id(e.target.value)} />
                </div>
                <div className="form-group">
                    <button type="button" className="btn btn-success" onClick={onAddSubmit} disabled={loading}>
                        {loading ? 'Cargando...' : 'Agregar'}
                    </button>
                </div>
            </form>
        </AppContainer>
    );
};

export default AddPersona;