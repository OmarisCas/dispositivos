import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppContainer from './AppContainer';
import api from '../api';
import _ from "lodash";

const pageSize = 10;

const HomeIpe = () => {
    const [ipes, setIpes] = useState(null);
    const [estados, setEstados] = useState([]);
    const [paginatedIpes, setpaginatedIpes] = useState();
    const [currentPage, setcurrentPage] = useState(1);

    const fetchIpes = () => {
        api.getAllIpes().then(res => {
            const result = res.data;
            setIpes(result.data);
            setpaginatedIpes(_(result.data).slice(0).take(pageSize).value());
        });
    }

    const fetchEstados = () => {
        api.getAllEstados().then(res => {
            const result = res.data;
            setEstados(result.data)
        });
    }

    useEffect(() => {
        fetchIpes();
        fetchEstados();
    }, []);

    //probando
    const pageCount = ipes? Math.ceil(ipes.length/pageSize) :0;
    if(pageCount === 1) return null;
    const pages = _.range(1, pageCount+1);
    const pagination = (pageNo) => {
        setcurrentPage(pageNo);
        const startIndex = (pageNo - 1) * pageSize;
        const paginatedIpe = _(ipes).slice(startIndex).take(pageSize).value();
        setpaginatedIpes(paginatedIpe);
    }
    //findeprobando

    const renderIpes = () => {
        if(!paginatedIpes){
            return (
                <tr>
                    <td colSpan="10">
                        Cargando IP'S...
                    </td>
                </tr>
            );
        }
        if(paginatedIpes.length === 0){
            return (
                <tr>
                    <td colSpan="10">
                        No hay IP'S, agrega una.
                    </td>
                </tr>
            );
        }

        return paginatedIpes.map((ipe, index) => (
            <tr key={index} className="text-center">
                <td>{ipe.id}</td>
                <td>{ipe.longitud}</td>
                
                {estados.map((estado, index) => {
                    if( ipe.estado_id === estado.id ){
                        if (ipe.estado_id === 1) {
                            return <td key={index}>
                            <button className="btn btn-danger">
                                {estado.nombre}
                            </button> </td>
                        }else{
                            return <td key={index}>
                            <button className="btn btn-success">
                                {estado.nombre}
                            </button> </td>
                        }
                    }}
                )}

                <td>
                    <Link className="btn btn-warning" to={`/editipe/${ipe.id}`}>
                        EDITAR
                    </Link>&nbsp;&nbsp;
                    <button type="button" className="btn btn-danger" onClick={() => {
                        api.deleteIpe(ipe.id)
                        .then(fetchIpes)
                        .catch(err => {
                            alert('Fallo al eliminar IP con id :' + ipe.id);
                        });
                    }}>
                        ELIMINAR
                    </button>
                </td>
            </tr>
        ))
    }

    return(
        <AppContainer title="Direcciones IP'S">
            <ul class="nav nav-pills card-header-pills">
                <Link to="/addipe" className="btn btn-primary nav-link active">Agregar IP</Link>
                <Link to="/cargos" className="btn btn-secundary nav-link">Cargos</Link>
                <Link to="/conexiones" className="btn btn-secundary nav-link">Conexiones</Link>
                <Link to="/dispositivos" className="btn btn-secundary nav-link">Dispositivos</Link>
                <Link to="/estados" className="btn btn-secundary nav-link">Estados</Link>
                <Link to="/personas" className="btn btn-secundary nav-link">Personas</Link>
            </ul>
            <div className="table-responsive">
                <table className="table table-hover table-sm table-responsive-sm mt-4">
                    <thead>
                        <tr className="text-center">
                            <th>ID</th>
                            <th>Longitud</th>
                            <th>Estado</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderIpes()}
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

export default HomeIpe;