import React, { useState } from 'react';
import styled from 'styled-components';

import Icon from '../Icon/Icon';

const NavContainer = styled.div`
    width: 100%;
    height: 130px;
    border-bottom: 2px solid #17181D;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
`

const NavWrapper = styled.div`
    width: 90%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &:first-of-type {
        margin-top: 4px;
    }
`

const NavTitle = styled.p`
    font-family: 'PT Serif', serif;
    color: #ffffff;
    font-size: 20px;
    cursor: default;
`

const NavNumber = styled.p`
    font-family: 'PT Serif', serif;
    color: #84878C;
    font-size: 20px;
    margin-left: 10px;
    cursor: default;
`

const NavAddButton = styled.button`
    border: none;
    background: none;
    position: absolute;
    right: 0;
    top: 6px;
    cursor: pointer;
    outline: none;
    transform: ${({isAddClicked}) => ( isAddClicked ? 'rotate(45deg)' : 'auto' )};
    transition: transform .3s ease-in-out;

    @media (max-width: 650px) {
        right: auto;
        left: 0;
    }
`

const NavInput = styled.input`
    width: 100%;
    height: 100%;
    background: none;
    border: 3px solid #2B2F37;
    font-family: 'PT Serif', serif;
    border-radius: 8px;
    outline: none;
    text-align: center;
    font-size: 18px;
    color: #ffffff;
    position: absolute;
`

const NavInputSearch = styled(NavInput)`
    transform: ${({isAddClicked}) => ( isAddClicked ? 'translateY(-15px)' : 'auto' )};
    opacity: ${({isAddClicked}) => ( isAddClicked ? '0' : '1' )};
    visibility: ${({isAddClicked}) => ( isAddClicked ? 'hidden' : 'visible' )};
    transition: transform .3s, opacity .3s, visibility .3s;
`

const NavInputAdd = styled(NavInput)`
    transform: ${({isAddClicked}) => ( isAddClicked ? 'auto' : 'translateY(-15px)' )};
    visibility: ${({isAddClicked}) => ( isAddClicked ? 'visible' : 'hidden' )};
    opacity: ${({isAddClicked}) => ( isAddClicked ? '1' : '0' )};
    transition: transform .3s, opacity .3s, visibility .3s;
`

const Nav = () => {
    const [isAddClick, setAddClickState] = useState(false);

    const toggleAddClick = () => {
        setAddClickState(!isAddClick);
    }

    return (
        <NavContainer>
            <NavWrapper>
                <NavTitle>Articles</NavTitle>
                <NavNumber>2</NavNumber>
                <NavAddButton isAddClicked={isAddClick} onClick={toggleAddClick}>
                    <Icon color="#3599DE" type="add" />
                </NavAddButton>
            </NavWrapper>
            <NavWrapper>
                <NavInputSearch isAddClicked={isAddClick} placeholder="Search" />
                <NavInputAdd isAddClicked={isAddClick} placeholder="Note name"/>
            </NavWrapper>
        </NavContainer>
    );
};

export default Nav;