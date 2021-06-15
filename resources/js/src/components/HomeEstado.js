import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppContainer from './AppContainer';
import api from '../api';

const HomeEstado = () => {
    const [estados, setEstados] = useState(null);

    const fetchEstados = () => {
        api.getAllEstados().then(res => {
            const result = res.data;
            setEstados(result.data)
        });
    }

    useEffect(() => {
        fetchEstados();
    }, []);

    const renderEstados = () => {
        if(!estados){
            return (
                <tr>
                    <td colSpan="10">
                        Cargando Estados...
                    </td>
                </tr>
            );
        }
        if(estados.length === 0){
            return (
                <tr>
                    <td colSpan="10">
                        No hay Estados, agrega uno.
                    </td>
                </tr>
            );
        }

        return estados.map((estado, index) => (
            <tr key={index} className="text-center">
                <td>{estado.codigo}</td>
                <td>{estado.nombre}</td>
                <td>
                    <Link className="btn btn-warning" to={`/editest/${estado.id}`}>
                        EDITAR
                    </Link>&nbsp;&nbsp;
                    <button type="button" className="btn btn-danger" onClick={() => {
                        api.deleteEstado(estado.id)
                        .then(fetchEstados)
                        .catch(err => {
                            alert('Fallo al eliminar estado con id :' + ipe.id);
                        });
                    }}>
                        ELIMINAR
                    </button>
                </td>
            </tr>
        ))
    }

    return(
        <AppContainer title="Estados de la conexión">
            <ul class="nav nav-pills card-header-pills">
                <Link to="/addest" className="btn btn-primary nav-link active">Agregar Estado</Link>
                <Link to="/cargos" className="btn btn-secundary nav-link">Cargos</Link>
                <Link to="/conexiones" className="btn btn-secundary nav-link">Conexiones</Link>
                <Link to="/dispositivos" className="btn btn-secundary nav-link">Dispositivos</Link>
                <Link to="/ipes" className="btn btn-secundary nav-link">IP's</Link>
                <Link to="/personas" className="btn btn-secundary nav-link">Personas</Link>
            </ul>
            <div className="table-responsive">
                <table className="table table-hover table-sm table-responsive-sm mt-4">
                    <thead>
                        <tr className="text-center">
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderEstados()}
                    </tbody>
                </table>
            </div>
        </AppContainer>
    );
};

export default HomeEstado;