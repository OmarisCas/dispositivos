import React, { useEffect, useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import AppContainer from './AppContainer';
import api from '../api';

const AddPersona = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [cargo_id, setCargo_id] = useState('');
    const [cargos, setCargos] = useState([]);

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

    const fetchCargos = () => {
        api.getAllCargos().then(res => {
            const result = res.data;
            setCargos(result.data)
        });
    }

    useEffect(() => {
        fetchCargos();
    }, []);

    return(
        <AppContainer
            classcard="card border-success" classheader="card-header border-success" title="Agregar Persona">
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
                        <option selected>---------</option>
                        {cargos.map(cargo => 
                            <option key={cargo.id} value={cargo.id}>{cargo.nombre}</option>
                        )}
                    </select>
                </div>
                <div className="form-group">
                    <button type="button" className="btn btn-success" onClick={onAddSubmit} disabled={loading}>
                        {loading ? 'Cargando...' : 'Agregar'}
                    </button>&nbsp;&nbsp;
                    <Link type="button" className="btn btn-danger" to="/personas">
                        {loading ? 'Cancelando...' : 'Cancelar'}
                    </Link>
                </div>
            </form>
        </AppContainer>
    );
};

export default AddPersona;