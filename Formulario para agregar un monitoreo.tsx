<div className="form-group">
                    <label>Fecha</label>
                    <input type="date" className="form-control" value={fecha} onChange={e => setFecha(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label>Descripcion</label>
                    <textarea className="form-control" value={descripcion} onChange={e => setDescripcion(e.target.value)} ></textarea>
                </div>
                <div className="form-group">
                    <label>Conexion</label>
                    <select onChange={e => setConexione_id(e.target.value)} className="form-control">
                        <option selected>---------</option>
                        {conexiones.map(conexione => 
                            <option key={conexione.id} value={conexione.id}>{conexione.descripcion}</option>
                        )}
                    </select>
                </div>
                <div className="form-group">
                    <label>Estado de la conexión</label>
                    <select onChange={e => setEstado_id(e.target.value)} className="form-control">
                        <option selected>---------</option>
                        {estados.map(estado => 
                            <option key={estado.id} value={estado.id}>{estado.nombre}</option>
                        )}
                    </select>
                </div>
                <div className="form-group">
                    <button type="button" className="btn btn-success" onClick={onAddSubmit} disabled={loading}>
                        {loading ? 'Asignando...' : 'Asignar'}
                    </button>&nbsp;&nbsp;
                    <Link type="button" className="btn btn-danger" to="/monitoreos">
                        {loading ? 'Cancelando...' : 'Cancelar'}
                    </Link>
                </div>