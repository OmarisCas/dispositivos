import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import AppContainer from './AppContainer';
import api from '../api';

const AddCargo = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const onAddSubmit = async () => {
        setLoading(true);
        try {
            await api.addCargo({
                nombre, descripcion,
            })
            history.push('/cargos');
        } catch {
            alert('Fallo al agregar cargo!');
        } finally {
            setLoading(false);
        }
    };

    return(
        <AppContainer title="Agregar Cargo">
            <form>
                <div className="form-group">
                    <label>Nombre</label>
                    <input className="form-control" type="text" value={nombre} onChange={e => setNombre(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Descripcion</label>
                    <textarea className="form-control" value={descripcion} onChange={e => setDescripcion(e.target.value)} ></textarea>
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

export default AddCargo;