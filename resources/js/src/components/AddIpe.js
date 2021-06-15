import React, { useEffect, useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import AppContainer from './AppContainer';
import api from '../api';

const AddIpe = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [longitud, setLongitud] = useState('');
    const [estado_id, setEstado_id] = useState('');
    const [estados, setEstados] = useState([]);

    const onAddSubmit = async () => {
        setLoading(true);
        try {
            await api.addIpe({
                longitud, estado_id,
            })
            history.push('/ipes');
        } catch {
            alert('Fallo al agregar Direccón IP!');
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
        fetchEstados();
    }, []);

    return(
        <AppContainer
            classcard="card border-success" classheader="card-header border-success" title="Agregar IP">
            <form>
                <div className="form-group">
                    <label>Longitud</label>
                    <textarea className="form-control" value={longitud} onChange={e => setLongitud(e.target.value)} ></textarea>
                </div>
                <div className="form-group">
                    <label>Estado</label>
                    <select onChange={e => setCargo_id(e.target.value)} className="form-control">
                        <option selected>---------</option>
                        {estados.map(estado => 
                            <option key={estado.id} value={estado.id}>{estado.nombre}</option>
                        )}
                    </select>
                </div>
                <div className="form-group">
                    <button type="button" className="btn btn-success" onClick={onAddSubmit} disabled={loading}>
                        {loading ? 'Cargando...' : 'Agregar'}
                    </button>&nbsp;&nbsp;
                    <Link type="button" className="btn btn-danger" to="/ipes">
                        {loading ? 'Cancelando...' : 'Cancelar'}
                    </Link>
                </div>
            </form>
        </AppContainer>
    );
};

export default AddIpe;