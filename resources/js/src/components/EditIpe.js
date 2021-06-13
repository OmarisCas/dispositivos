import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import AppContainer from './AppContainer';
import api from '../api';

const EditIpe = () => {
    const { id } = useParams();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [longitud, setLongitud] = useState('');
    const [estado_id, setEstado_id] = useState('');
    const [estados, setEstados] = useState([]);

    const onEditSubmit = async () => {
        setLoading(true);
        try {
            await api.updateIpe({
                longitud, estado_id,
            }, id);
            history.push('/ipes');
        } catch {
            alert('Fallo al editar Dirección IP!');
        } finally {
            setLoading(false);
        }
    };

    const fetchEstados = () => {
        api.getAllEstados().then(res => {
            const result = res.data;
            setEstados(result.data)
        });
    }

    useEffect(() => {
        api.getOneIpe(id).then(res => {
            const result = res.data;
            const ipe = result.data;
            setLongitud(ipe.longitud);
            setEstado_id(ipe.estado_id);
        })
        fetchEstados();
    }, []);

    return(
        <AppContainer title="Editar IP">
            <form>
                <div className="form-group">
                    <label>Longitud</label>
                    <textarea className="form-control" value={longitud} onChange={e => setLongitud(e.target.value)} ></textarea>
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
                    <button type="button" className="btn btn-success" onClick={onEditSubmit} disabled={loading}>
                        {loading ? 'Cargando...' : 'Editar'}
                    </button>
                </div>
            </form>
        </AppContainer>
    );
};

export default EditIpe;