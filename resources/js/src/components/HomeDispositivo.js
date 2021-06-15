import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppContainer from './AppContainer';
import api from '../api';
import _ from "lodash";

const pageSize = 1;

const HomeDispositivo = () => {
    const [dispositivos, setDispositivos] = useState(null);
    const [personas, setPersonas] = useState([]);
    const [paginatedDispositivos, setpaginatedDispositivos] = useState();
    const [currentPage, setcurrentPage] = useState(1);

    const fetchDispositivos = () => {
        api.getAllDispositivos().then(res => {
            const result = res.data;
            setDispositivos(result.data);
            setpaginatedDispositivos(_(result.data).slice(0).take(pageSize).value());
        });
    }

    const fetchPersonas = () => {
        api.getAllPersonas().then(res => {
            const result = res.data;
            setPersonas(result.data)
        });
    }

    useEffect(() => {
        fetchDispositivos();
        fetchPersonas();
    }, []);

    //probando
    const pageCount = dispositivos? Math.ceil(dispositivos.length/pageSize) :0;
    if(pageCount === 1) return null;
    const pages = _.range(1, pageCount+1);
    const pagination = (pageNo) => {
        setcurrentPage(pageNo);
        const startIndex = (pageNo - 1) * pageSize;
        const paginatedDispositivo = _(dispositivos).slice(startIndex).take(pageSize).value();
        setpaginatedDispositivos(paginatedDispositivo);
    }
    //findeprobando

    const renderDispositivos = () => {
        if(!paginatedDispositivos){
            return (
                <tr>
                    <td colSpan="10">
                        Cargando dispositivos...
                    </td>
                </tr>
            );
        }
        if(paginatedDispositivos.length === 0){
            return (
                <tr>
                    <td colSpan="10">
                        No hay dispositivos, agrega uno.
                    </td>
                </tr>
            );
        }

        return paginatedDispositivos.map((dispositivo, index) => (
            <tr key={index} className="text-center">
                <td>{dispositivo.id}</td>
                <td>{dispositivo.mac}</td>
                <td>{dispositivo.nombre}</td>
                <td>{dispositivo.marca}</td>
                <td>{dispositivo.modelo}</td>

                {personas.map((persona, index) => {
                    if( dispositivo.persona_id === persona.id ){
                        return <td key={index}>{persona.nombre+" "+persona.apellido}</td>
                    }}
                )}

                <td>
                    <Link className="btn btn-warning" to={`/editdisp/${dispositivo.id}`}>
                        EDITAR
                    </Link>&nbsp;&nbsp;
                    <button type="button" className="btn btn-danger" onClick={() => {
                        api.deleteDispositivo(dispositivo.id)
                        .then(fetchDispositivos)
                        .catch(err => {
                            alert('Fallo al eliminar dispositivo con id :' + dispositivo.id);
                        });
                    }}>
                        ELIMINAR
                    </button>
                </td>
            </tr>
        ))
    }

    return(
        <AppContainer title="Dispositivos">
            <ul class="nav nav-pills card-header-pills">
                <Link to="/adddispositivo" className="btn btn-primary nav-link active">Agregar Dispositivo</Link>
                <Link to="/cargos" className="btn btn-secundary nav-link">Cargos</Link>
                <Link to="/conexiones" className="btn btn-secundary nav-link">Conexiones</Link>
                <Link to="/estados" className="btn btn-secundary nav-link">Estados</Link>
                <Link to="/ipes" className="btn btn-secundary nav-link">IP's</Link>
                <Link to="/personas" className="btn btn-secundary nav-link">Personas</Link>
            </ul>
            <div className="table-responsive">
                <table className="table table-hover table-sm table-responsive-sm mt-4">
                    <thead>
                        <tr className="text-center">
                            <th>ID</th>
                            <th>MAC</th>
                            <th>Nombre</th>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Dueño</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderDispositivos()}
                    </tbody>
                </table>
                <nav className="d-flex justify-content-center">
                    <ul className="pagination">
                        {
                            pages.map((page, index) => (
                                <li key={index} className={page === currentPage? "page-item active":"page-item"}>
                                    <p className="page-link" onClick={() => pagination(page)}>{page}</p>
                                </li>
                            ))
                        }
                    </ul>
                </nav>
            </div>
        </AppContainer>
    );
};

export default HomeDispositivo;