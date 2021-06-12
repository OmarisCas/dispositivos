import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import AppContainer from './AppContainer';
import api from '../api';

const EditEstado = () => {
    const { id } = useParams();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [codigo, setCodigo] = useState('');
    const [nombre, setNombre] = useState('');

    const onEditSubmit = async () => {
        setLoading(true);
        try {
            await api.updateEstado({
                codigo, nombre
            }, id);
            history.push('/estados');
        } catch {
            alert('Fallo al editar estado!');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        api.getOneEstado(id).then(res => {
            const result = res.data;
            const estado = result.data;
            setCodigo(estado.codigo);
            setNombre(estado.nombre);
        })
    }, []);

    return(
        <AppContainer title="Editar Estado">
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
                    </button>
                </div>
            </form>
        </AppContainer>
    );
};

export default EditEstado;