import React, { useEffect, useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import AppContainerAdd from './AppContainerAdd';
import api from '../api';

const AddDispositivo = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [mac, setMac] = useState('');
    const [nombre, setNombre] = useState('');
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [persona_id, setPersona_id] = useState('');
    const [personas, setPersonas] = useState([]);

    const onAddSubmit = async () => {
        setLoading(true);
        try {
            await api.addDispositivo({
                mac, nombre, marca, modelo, persona_id,
            })
            history.push('/dispositivos');
        } catch {
            alert('Fallo al agregar dispositivo!');
        } finally {
            setLoading(false);
        }
    };

    const fetchPersonas = () => {
        api.getAllPersonas().then(res => {
            const result = res.data;
            setPersonas(result.data)
        });
    }

    useEffect(() => {
        fetchPersonas();
    }, []);

    return(
        <AppContainerAdd title="Agregar Dispositivo">
            <form>
                <div className="form-group">
                    <label>MAC</label>
                    <input className="form-control" type="text" value={mac} onChange={e => setMac(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Nombre</label>
                    <textarea className="form-control" value={nombre} onChange={e => setNombre(e.target.value)} ></textarea>
                </div>
                <div className="form-group">
                    <label>Marca</label>
                    <input className="form-control" type="text" value={marca} onChange={e => setMarca(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Modelo</label>
                    <input className="form-control" type="text" value={modelo} onChange={e => setModelo(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Dueño</label>
                    <select onChange={e => setPersona_id(e.target.value)} className="form-control">
                        <option selected>---------</option>
                        {personas.map(persona => 
                            <option key={persona.id} value={persona.id}>{persona.nombre+" "+persona.apellido}</option>
                        )}
                    </select>
                </div>
                <div className="form-group">
                    <button type="button" className="btn btn-success" onClick={onAddSubmit} disabled={loading}>
                        {loading ? 'Cargando...' : 'Agregar'}
                    </button>&nbsp;&nbsp;
                    <Link type="button" className="btn btn-danger" to="/dispositivos">
                        {loading ? 'Cancelando...' : 'Cancelar'}
                    </Link>
                </div>
            </form>
        </AppContainerAdd>
    );
};

export default AddDispositivo;