import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import AppContainer from './AppContainer';
import api from '../api';

const EditPersona = () => {
    const { id } = useParams();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [cargo_id, setCargo_id] = useState('');

    const onEditSubmit = async () => {
        setLoading(true);
        try {
            await api.updatePersona({
                nombre, apellido, cargo_id
            }, id);
            history.push('/personas');
        } catch {
            alert('Fallo al editar persona!');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        api.getOnePersona(id).then(res => {
            const result = res.data;
            const persona = result.data;
            setNombre(persona.nombre);
            setApellido(persona.apellido);
            setCargo_id(persona.cargo_id);
        })
    }, []);

    return(
        <AppContainer title="Editar Persona">
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
                    <button type="button" className="btn btn-success" onClick={onEditSubmit} disabled={loading}>
                        {loading ? 'Cargando...' : 'Editar'}
                    </button>
                </div>
            </form>
        </AppContainer>
    );
};

export default EditPersona;