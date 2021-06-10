import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import AppContainer from './AppContainer';
import api from '../api';

const AddEstado = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [nombre, setNombre] = useState('');

    const onAddSubmit = async () => {
        setLoading(true);
        try {
            await api.addEstado({
                nombre,
            })
            history.push('/estados');
        } catch {
            alert('Fallo al agregar estado!');
        } finally {
            setLoading(false);
        }
    };

    return(
        <AppContainer title="Agregar Estado">
            <form>
                <div className="form-group">
                    <label>Longitud</label>
                    <input className="form-control" type="text" value={nombre} onChange={e => setNombre(e.target.value)} />
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

export default AddEstado;