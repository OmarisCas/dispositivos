import React from 'react';

const AppContainer = ({classcard, classheader, title, children}) => {
    return(
        <div className="container">
            <div className={classcard}>
                <h5 className={classheader}>{title}</h5>
                <div className="card-body">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AppContainer;