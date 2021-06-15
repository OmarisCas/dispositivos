import React from 'react';

const AppContainerAdd = ({title, children}) => {
    return(
        <div className="container">
            <div className="card border-success">
                <h5 className="card-header border-success">{title}</h5>
                <div className="card-body">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AppContainerAdd;