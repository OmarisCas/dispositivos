import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import AppContainer from './AppContainer';
import api from '../api';

const EditCargo = () => {
    const { id } = useParams();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const onEditSubmit = async () => {
        setLoading(true);
        try {
            await api.updateCargo({
                nombre, descripcion
            }, id);
            history.push('/cargos');
        } catch {
            alert('Fallo al editar cargo!');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        api.getOneCargo(id).then(res => {
            const result = res.data;
            const cargo = result.data;
            setNombre(cargo.nombre);
            setDescripcion(cargo.descripcion);
        })
    }, []);

    return(
        <AppContainer title="Editar Cargo">
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
                    <button type="button" className="btn btn-success" onClick={onEditSubmit} disabled={loading}>
                        {loading ? 'Cargando...' : 'Editar'}
                    </button>
                </div>
            </form>
        </AppContainer>
    );
};

export default EditCargo;