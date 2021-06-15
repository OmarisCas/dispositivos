import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppContainer from './AppContainer';
import api from '../api';
import _ from "lodash";

const pageSize = 5;

const HomeCargo = () => {
    const [cargos, setCargos] = useState(null);
    const [paginatedCargos, setpaginatedCargos] = useState();
    const [currentPage, setcurrentPage] = useState(1);

    const fetchCargos = () => {
        api.getAllCargos().then(res => {
            const result = res.data;
            setCargos(result.data);
            setpaginatedCargos(_(result.data).slice(0).take(pageSize).value());
        });
    }

    useEffect(() => {
        fetchCargos();
    }, []);

    //probando
    const pageCount = cargos? Math.ceil(cargos.length/pageSize) :0;
    if(pageCount === 1) return null;
    const pages = _.range(1, pageCount+1);
    const pagination = (pageNo) => {
        setcurrentPage(pageNo);
        const startIndex = (pageNo - 1) * pageSize;
        const paginatedCargo = _(cargos).slice(startIndex).take(pageSize).value();
        setpaginatedCargos(paginatedCargo);
    }
    //findeprobando

    const renderCargos = () => {
        if(!paginatedCargos){
            return (
                <tr>
                    <td colSpan="10">
                        Cargando cargos...
                    </td>
                </tr>
            );
        }
        if(paginatedCargos.length === 0){
            return (
                <tr>
                    <td colSpan="10">
                        No hay cargos, agrega uno.
                    </td>
                </tr>
            );
        }

        return paginatedCargos.map((cargo, index) => (
            <tr key={index} className="text-center">
                <td>{cargo.id}</td>
                <td>{cargo.nombre}</td>
                <td>{cargo.descripcion}</td>
                <td>
                    <Link className="btn btn-warning" to={`/editcar/${cargo.id}`}>
                        EDITAR
                    </Link>&nbsp;&nbsp;
                    <button type="button" className="btn btn-danger" onClick={ () => {
                        api.deleteCargo(cargo.id)
                        .then(fetchCargos)
                        .catch(err => {
                            alert('Fallo al eliminar cargo con id :' + cargo.id);
                        });
                    }}>
                        ELIMINAR
                    </button>
                </td>
            </tr>
        ))
    }

    return(
        <AppContainer title="Cargos">
            <ul class="nav nav-pills card-header-pills">
                <Link to="/addcargo" className="btn btn-primary nav-link active">Agregar Cargo</Link>
                <Link to="/conexiones" className="btn btn-secundary nav-link">Conexiones</Link>
                <Link to="/dispositivos" className="btn btn-secundary nav-link">Dispositivos</Link>
                <Link to="/estados" className="btn btn-secundary nav-link">Estados</Link>
                <Link to="/ipes" className="btn btn-secundary nav-link">IP's</Link>
                <Link to="/personas" className="btn btn-secundary nav-link">Personas</Link>
            </ul>
            <div className="table-responsive">
                <table className="table table-hover table-sm table-responsive-sm mt-4">
                    <thead>
                        <tr className="text-center">
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripcion</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderCargos()}
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

export default HomeCargo;