import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import AppContainer from './AppContainer';
import api from '../api';

const EditIpe = () => {
    const { id } = useParams();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [longitud, setLongitud] = useState('');

    const onEditSubmit = async () => {
        setLoading(true);
        try {
            await api.updateIpe({
                longitud
            }, id);
            history.push('/ipes');
        } catch {
            alert('Fallo al editar IP!');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        api.getOneIpe(id).then(res => {
            const result = res.data;
            const ipe = result.data;
            setLongitud(ipe.longitud);
        })
    }, []);

    return(
        <AppContainer title="Editar IP">
            <form>
                <div className="form-group">
                    <label>Longitud</label>
                    <textarea className="form-control" value={longitud} onChange={e => setLongitud(e.target.value)} ></textarea>
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