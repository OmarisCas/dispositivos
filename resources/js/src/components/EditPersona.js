import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from "react-router-dom";
import AppContainer from './AppContainer';
import api from '../api';

const EditPersona = () => {
    const { id } = useParams();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [cargo_id, setCargo_id] = useState('');
    const [cargos, setCargos] = useState([]);

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

    const fetchCargos = () => {
        api.getAllCargos().then(res => {
            const result = res.data;
            setCargos(result.data)
        });
    }

    useEffect(() => {
        api.getOnePersona(id).then(res => {
            const result = res.data;
            const persona = result.data;
            setNombre(persona.nombre);
            setApellido(persona.apellido);
            setCargo_id(persona.cargo_id);
        })
        fetchCargos();
    }, []);

    return(
        <AppContainer
            classcard="card border-danger" classheader="card-header border-danger" title="Editar Persona">
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
                    <label>Cargo</label>
                    <select onChange={e => setCargo_id(e.target.value)} className="form-control">
                        {cargos.map(cargo =>
                            <option selected={cargo_id == cargo.id} key={cargo.id} value={cargo.id}>{cargo.nombre}</option>
                        )}
                    </select>
                </div>
                <div className="form-group">
                    <button type="button" className="btn btn-success" onClick={onEditSubmit} disabled={loading}>
                        {loading ? 'Cargando...' : 'Editar'}
                    </button>&nbsp;&nbsp;
                    <Link type="button" className="btn btn-danger" to="/personas">
                        {loading ? 'Cancelando...' : 'Cancelar'}
                    </Link>
                </div>
            </form>
        </AppContainer>
    );
};

export default EditPersona;