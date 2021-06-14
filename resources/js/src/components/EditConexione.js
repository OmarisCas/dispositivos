import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import AppContainer from './AppContainer';
import api from '../api';

const EditConexione = () => {
    const { id } = useParams();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [dispositivo_id, setDispositivo_id] = useState('');
    const [ipe_id, setIpe_id] = useState('');
    const [estado_id, setEstado_id] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [dispositivos, setDispositivos] = useState([]);
    const [ipes, setIpes] = useState([]);
    const [estados, setEstados] = useState([]);

    const onEditSubmit = async () => {
        setLoading(true);
        try {
            await api.updateConexione({
                dispositivo_id, ipe_id, estado_id, descripcion
            }, id);
            history.push('/conexiones');
        } catch {
            alert('Fallo al editar conexion!');
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
        api.getAllIpes().then(res => {
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
        api.getOneConexione(id).then(res => {
            const result = res.data;
            const conexione = result.data;
            setDispositivo_id(conexione.dispositivo_id);
            setIpe_id(conexione.ipe_id);
            setEstado_id(conexione.estado_id);
            setDescripcion(conexione.descripcion);
            fetchDispositivos();
            fetchIpes();
            fetchEstados();
        })
    }, []);

    return(
        <AppContainer title="Editar Conexion">
            <form>
                <div className="form-group">
                    <label>Dispositivo</label>
                    <select onChange={e => setDispositivo_id(e.target.value)} className="form-control">
                        {dispositivos.map(dispositivo =>
                            <option selected={dispositivo_id == dispositivo.id} key={dispositivo.id} value={dispositivo.id}>{dispositivo.mac}</option>
                        )}
                    </select>
                </div>
                <div className="form-group">
                    <label>Direccion IP</label>
                    <select onChange={e => setIpe_id(e.target.value)} className="form-control">
                        {ipes.map(ipe =>
                            <option selected={ipe_id == ipe.id} key={ipe.id} value={ipe.id}>{ipe.longitud}</option>
                        )}
                    </select>
                </div>
                <div className="form-group">
                    <label>Estado</label>
                    <select onChange={e => setEstado_id(e.target.value)} className="form-control">
                        {estados.map(estado =>
                            <option selected={estado_id == estado.id} key={estado.id} value={estado.id}>{estado.nombre}</option>
                        )}
                    </select>
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

export default EditConexione;