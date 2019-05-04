import React from 'react';
import styled from 'styled-components';

import Nav from './Nav';

const MiddleMenuContainer = styled.div`
    width: 16%;
    height: 100vh;
    background: #333840;
`

const MiddleMenu = () => {
    return (
        <MiddleMenuContainer>
            <Nav></Nav>
        </MiddleMenuContainer>
    );
};

export default MiddleMenu;