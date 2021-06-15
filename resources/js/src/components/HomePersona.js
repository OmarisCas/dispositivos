import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppContainer from './AppContainer';
import api from '../api';
import _ from "lodash";

const pageSize = 10;

const HomePersona = () => {
    const [personas, setPersonas] = useState(null);
    const [cargos, setCargos] = useState([]);
    const [paginatedPersonas, setpaginatedPersonas] = useState();
    const [currentPage, setcurrentPage] = useState(1);

    const fetchPersonas = () => {
        api.getAllPersonas().then(res => {
            const result = res.data;
            setPersonas(result.data);
            setpaginatedPersonas(_(result.data).slice(0).take(pageSize).value());
        });
    }

    const fetchCargos = () => {
        api.getAllCargos().then(res => {
            const result = res.data;
            setCargos(result.data)
        });
    }

    useEffect(() => {
        fetchPersonas();
        fetchCargos();
    }, []);

    //probando
    const pageCount = personas? Math.ceil(personas.length/pageSize) :0;
    if(pageCount === 1) return null;
    const pages = _.range(1, pageCount+1);
    const pagination = (pageNo) => {
        setcurrentPage(pageNo);
        const startIndex = (pageNo - 1) * pageSize;
        const paginatedPersona = _(personas).slice(startIndex).take(pageSize).value();
        setpaginatedPersonas(paginatedPersona);
    }
    //findeprobando

    const renderPersonas = () => {
        if(!paginatedPersonas){
            return (
                <tr>
                    <td colSpan="10">
                        Cargando personas...
                    </td>
                </tr>
            );
        }
        if(paginatedPersonas.length === 0){
            return (
                <tr>
                    <td colSpan="10">
                        No hay personas, agrega una.
                    </td>
                </tr>
            );
        }

        return paginatedPersonas.map((persona, index) => (
            <tr key={index} className="text-center">
                <td>{persona.id}</td>
                <td>{persona.nombre}</td>
                <td>{persona.apellido}</td>
                
                {cargos.map((cargo, index) => {
                    if( persona.cargo_id === cargo.id ){
                        return <td key={index}>{cargo.nombre}</td>
                    }}
                )}
                
                <td>
                    <Link className="btn btn-warning" to={`/editpers/${persona.id}`}>
                        EDITAR
                    </Link>&nbsp;&nbsp;
                    <button type="button" className="btn btn-danger" onClick={() => {
                        api.deletePersona(persona.id)
                        .then(fetchPersonas)
                        .catch(err => {
                            alert('Fallo al eliminar persona con id :' + persona.id);
                        });
                    }}>
                        ELIMINAR
                    </button>
                </td>
            </tr>
        ))
    }

    return(
        <AppContainer
            classcard="card border-primary" classheader="card-header border-primary" title="Personas">
            <ul class="nav nav-pills card-header-pills">
                <Link to="/addpersona" className="btn btn-primary nav-link active">Agregar Persona</Link>
                <Link to="/cargos" className="btn btn-secundary nav-link">Cargos</Link>
                <Link to="/conexiones" className="btn btn-secundary nav-link">Conexiones</Link>
                <Link to="/dispositivos" className="btn btn-secundary nav-link">Dispositivos</Link>
                <Link to="/estados" className="btn btn-secundary nav-link">Estados</Link>
                <Link to="/filtros" className="btn btn-secundary nav-link">Filtros</Link>
                <Link to="/ipes" className="btn btn-secundary nav-link">IP's</Link>
            </ul>
            <div className="table-responsive">
                <table className="table table-hover table-sm table-responsive-sm mt-4">
                    <thead>
                        <tr className="text-center">
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Cargo</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderPersonas()}
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

export default HomePersona;