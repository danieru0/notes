import React from 'react';

import './ProcessLoader.css';

const ProcessLoader = ({className}) => {
    return (
        <div className={"sk-folding-cube " + className}>
            <div className="sk-cube1 sk-cube"></div>
            <div className="sk-cube2 sk-cube"></div>
            <div className="sk-cube4 sk-cube"></div>
            <div className="sk-cube3 sk-cube"></div>
        </div>
    );
};

export default ProcessLoader;