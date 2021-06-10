import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import AppContainer from './AppContainer';
import api from '../api';

const AddIpe = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [longitud, setLongitud] = useState('');

    const onAddSubmit = async () => {
        setLoading(true);
        try {
            await api.addIpe({
                longitud,
            })
            history.push('/ipes');
        } catch {
            alert('Fallo al agregar IP!');
        } finally {
            setLoading(false);
        }
    };

    return(
        <AppContainer title="Agregar IP">
            <form>
                <div className="form-group">
                    <label>Longitud</label>
                    <textarea className="form-control" value={longitud} onChange={e => setLongitud(e.target.value)} ></textarea>
                </div>
                <div className="form-group">
                    <button type="button" className="btn btn-success" onClick={onAddSubmit} disabled={loading}>
                        {loading ? 'Cargando...' : 'Agregar'}
                    </button>
                </div>
            </form>
        </AppContainer>
    );
};

export default AddIpe;