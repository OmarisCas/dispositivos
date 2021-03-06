import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import AppContainer from './AppContainer';
import api from '../api';

const AddEstado = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [codigo, setCodigo] = useState('');
    const [nombre, setNombre] = useState('');

    const onAddSubmit = async () => {
        setLoading(true);
        try {
            await api.addEstado({
                codigo, nombre,
            })
            history.push('/estados');
        } catch {
            alert('Fallo al agregar estado!');
        } finally {
            setLoading(false);
        }
    };

    return(
        <AppContainer
            classcard="card border-success" classheader="card-header border-success" title="Agregar Estado">
            <form>
                <div className="form-group">
                    <label>Código</label>
                    <input className="form-control" type="number" value={codigo} onChange={e => setCodigo(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Nombre</label>
                    <input className="form-control" type="text" value={nombre} onChange={e => setNombre(e.target.value)} />
                </div>
                <div className="form-group">
                    <button type="button" className="btn btn-success" onClick={onAddSubmit} disabled={loading}>
                        {loading ? 'Cargando...' : 'Agregar'}
                    </button>&nbsp;&nbsp;
                    <Link type="button" className="btn btn-danger" to="/estados">
                        {loading ? 'Cancelando...' : 'Cancelar'}
                    </Link>
                </div>
            </form>
        </AppContainer>
    );
};

export default AddEstado;