import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import AppContainer from './AppContainer';
import api from '../api';

const AddFiltro = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [codigo, setCodigo] = useState('');
    const [nombre, setNombre] = useState('');

    const onAddSubmit = async () => {
        setLoading(true);
        try {
            await api.addFiltro({
                codigo, nombre,
            })
            history.push('/filtros');
        } catch {
            alert('Fallo al agregar filtro!');
        } finally {
            setLoading(false);
        }
    };

    return(
        <AppContainer
            classcard="card border-success" classheader="card-header border-success" title="Agregar Filtro">
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
                    <Link type="button" className="btn btn-danger" to="/filtros">
                        {loading ? 'Cancelando...' : 'Cancelar'}
                    </Link>
                </div>
            </form>
        </AppContainer>
    );
};

export default AddFiltro;