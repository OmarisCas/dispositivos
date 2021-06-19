import React, { useEffect, useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import AppContainer from './AppContainer';
import api from '../api';

const AddMonitoreo = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [fecha, setFecha] = useState({});
    const [descripcion, setDescripcion] = useState([]);
    const [conexione_id, setConexione_id] = useState([]);
    const [estado_id, setEstado_id] = useState([]);
    const [conexiones, setConexiones] = useState([]);
    const [estados, setEstados] = useState([]);
    const [ipes, setIpes] = useState([]);

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

    const fetchIpes = () => {
        api.getAllIpes().then(res => {
            const result = res.data;
            setIpes(result.data)
        });
    }

    const separator='-';
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    const mostrar = `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`;

    useEffect(() => {
        fetchConexiones();
        fetchEstados();
        fetchIpes();
    }, []);

    return(
        <AppContainer
            classcard="card border-success" classheader="card-header border-success" title="Agregar Monitoreo">
            <form>
                <table>
                    <thead>
                        <tr className="text-center">
                            <th>Fecha</th>
                            <th>Descripcion</th>
                            <th>Conexion</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    {conexiones.map((conexione, index) =>
                        <tbody>
                            <tr key={index}>
                                <td>
                                    <input name="fecha[]" type="date" className="form-control" value={mostrar}
                                    onChange={e => { fecha = e.target["value"]; setFecha(e.target["value"]); } }/>
                                </td>
                                <td>
                                    <textarea name="descripcion[]" className="form-control" value={descripcion}
                                    onChange={e => { descripcion = e.target["value"]; setDescripcion(e.target["value"]); } } ></textarea>
                                </td>
                                <td>
                                    <input name="conexione_id[]" type="number" key={conexione.id} value={conexione.id}
                                    onChange={e => { conexione_id = e.target["value"]; setConexione_id(e.target["value"]); } }/>
                                    {ipes.map(ipe => {
                                        if( conexione.ipe_id === ipe.id ){
                                            return ipe.longitud
                                        }}
                                    )}
                                </td>
                                <td>
                                    <select name="estado_id[]" className="form-control"
                                    onChange={e => { estado_id = e.target["value"]; setEstado_id(e.target["value"]); } }>
                                        <option selected>---------</option>
                                        {estados.map(estado => 
                                            <option value={estado.id}>{estado.nombre}</option>
                                        )}
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
                <div className="form-group">
                    <button type="button" className="btn btn-success" onClick={onAddSubmit} disabled={loading}>
                        {loading ? 'Cargando...' : 'Agregar'}
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