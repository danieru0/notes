import React from 'react';
import styled from 'styled-components';

const LogoContainer = styled.div`
    width: 100%;
    height: 130px;
    border-bottom: 2px solid #17181D;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const LogoIcon = styled.div`
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #343944;
    color: #ffffff;
    font-family: 'PT Serif', serif;
    font-size: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: default;
`

const Logo = () => {
    return (
        <LogoContainer>
            <LogoIcon>N</LogoIcon>
        </LogoContainer>
    );
};

export default Logo;