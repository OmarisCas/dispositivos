import React, { useEffect, useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import AppContainerAdd from './AppContainerAdd';
import api from '../api';

const AddConexione = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [dispositivo_id, setDispositivo_id] = useState('');
    const [ipe_id, setIpe_id] = useState('');
    const [estado_id, setEstado_id] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [dispositivos, setDispositivos] = useState([]);
    const [ipes, setIpes] = useState([]);
    const [estados, setEstados] = useState([]);

    const onAddSubmit = async () => {
        setLoading(true);
        try {
            await api.addConexione({
                dispositivo_id, ipe_id, estado_id, descripcion, 
            })
            history.push('/conexiones');
        } catch {
            alert('Fallo al agregar conexión!');
        } finally {
            setLoading(false);
        }
    };

    const fetchDispositivos = () => {
        api.getAllDispositivos().then(res => {
            const result = res.data;
            setDispositivos(result.data)
        });
    }

    const fetchIpes = () => {
        api.getAllIpesOff().then(res => {
            const result = res.data;
            setIpes(result.data)
        });
    }

    const fetchEstados = () => {
        api.getAllEstados().then(res => {
            const result = res.data;
            setEstados(result.data)
        });
    }

    useEffect(() => {
        fetchDispositivos();
        fetchIpes();
        fetchEstados();
    }, []);

    return(
        <AppContainerAdd title="Agregar Conexión">
            <form>
                <div className="form-group">
                    <label>Dispositivo</label>
                    <select onChange={e => setDispositivo_id(e.target.value)} className="form-control">
                        <option selected>---------</option>
                        {dispositivos.map(dispositivo => 
                            <option key={dispositivo.id} value={dispositivo.id}>{dispositivo.mac}</option>
                        )}
                    </select>
                </div>
                <div className="form-group">
                    <label>Direccion IP</label>
                    <select onChange={e => setIpe_id(e.target.value)} className="form-control">
                        <option selected>---------</option>
                        {ipes.map(ipe => 
                            <option key={ipe.id} value={ipe.id}>{ipe.longitud}</option>
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
                    <label>Descripcion</label>
                    <textarea className="form-control" value={descripcion} onChange={e => setDescripcion(e.target.value)} ></textarea>
                </div>
                <div className="form-group">
                    <button type="button" className="btn btn-success" onClick={onAddSubmit} disabled={loading}>
                        {loading ? 'Asignando...' : 'Asignar'}
                    </button>&nbsp;&nbsp;
                    <Link type="button" className="btn btn-danger" to="/conexiones">
                        {loading ? 'Cancelando...' : 'Cancelar'}
                    </Link>
                </div>
            </form>
        </AppContainerAdd>
    );
};

export default AddConexione;