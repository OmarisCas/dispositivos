import React, { useEffect, useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import AppContainer from './AppContainer';
import api from '../api';

const AddMonitoreo = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [fecha, setFecha] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [conexione_id, setConexione_id] = useState('');
    const [estado_id, setEstado_id] = useState('');
    const [conexiones, setConexiones] = useState([]);
    const [estados, setEstados] = useState([]);

    const onAddSubmit = async () => {
        setLoading(true);
        try {
            await api.addMonitoreo({
                fecha, descripcion, conexione_id, estado_id, 
            })
            history.push('/monitoreos');
        } catch {
            alert('Fallo al agregar monitoreo!');
        } finally {
            setLoading(false);
        }
    };

    const fetchMonitoreos = () => {
        api.getAllMonitoreos().then(res => {
            const result = res.data;
            setMonitoreos(result.data)
        });
    }

    const fetchConexiones = () => {
        api.getAllConexiones().then(res => {
            const result = res.data;
            setConexiones(result.data)
        });
    }

    const fetchEstados = () => {
        api.getAllEstados().then(res => {
            const result = res.data;
            setEstados(result.data)
        });
    }

    useEffect(() => {
        fetchMonitoreos();
        fetchConexiones();
        fetchEstados();
    }, []);

    return(
        <AppContainer
            classcard="card border-success" classheader="card-header border-success" title="Agregar Monitoreo">
            <form>
                <div className="form-group">
                    <label>Fecha</label>
                    <input type="date" className="form-control" value={fecha} onChange={e => setFecha(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label>Descripcion</label>
                    <textarea className="form-control" value={descripcion} onChange={e => setDescripcion(e.target.value)} ></textarea>
                </div>
                <div className="form-group">
                    <label>Conexion</label>
                    <select onChange={e => setConexione_id(e.target.value)} className="form-control">
                        <option selected>---------</option>
                        {conexiones.map(conexione => 
                            <option key={conexione.id} value={conexione.id}>{conexione.descripcion}</option>
                        )}
                    </select>
                </div>
                <div className="form-group">
                    <label>Estado de la conexión</label>
                    <select onChange={e => setEstado_id(e.target.value)} className="form-control">
                        <option selected>---------</option>
                        {estados.map(estado => 
                            <option key={estado.id} value={estado.id}>{estado.nombre}</option>
                        )}
                    </select>
                </div>
                <div className="form-group">
                    <button type="button" className="btn btn-success" onClick={onAddSubmit} disabled={loading}>
                        {loading ? 'Asignando...' : 'Asignar'}
                    </button>&nbsp;&nbsp;
                    <Link type="button" className="btn btn-danger" to="/monitoreos">
                        {loading ? 'Cancelando...' : 'Cancelar'}
                    </Link>
                </div>
            </form>
        </AppContainer>
    );
};

export default AddMonitoreo;