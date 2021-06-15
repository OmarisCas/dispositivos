import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from "react-router-dom";
import AppContainer from './AppContainer';
import api from '../api';

const EditFiltro = () => {
    const { id } = useParams();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [codigo, setCodigo] = useState('');
    const [nombre, setNombre] = useState('');

    const onEditSubmit = async () => {
        setLoading(true);
        try {
            await api.updateFiltro({
                codigo, nombre
            }, id);
            history.push('/filtros');
        } catch {
            alert('Fallo al editar filtro!');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        api.getOneFiltro(id).then(res => {
            const result = res.data;
            const filtro = result.data;
            setCodigo(filtro.codigo);
            setNombre(filtro.nombre);
        })
    }, []);

    return(
        <AppContainer
            classcard="card border-danger" classheader="card-header border-danger" title="Editar Filtro">
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
                    <button type="button" className="btn btn-success" onClick={onEditSubmit} disabled={loading}>
                        {loading ? 'Cargando...' : 'Editar'}
                    </button>&nbsp;&nbsp;
                    <Link type="button" className="btn btn-danger" to="/filtros">
                        {loading ? 'Cancelando...' : 'Cancelar'}
                    </Link>
                </div>
            </form>
        </AppContainer>
    );
};

export default EditFiltro;