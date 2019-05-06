import React, { useState } from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';

import { createNewNote } from '../../actions/notesActions';  

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
    min-width: 10px;
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

const Nav = ({activeRoute, number, tag, createNewNote}) => {
    const [isAddClick, setAddClickState] = useState(false);
    const [newNoteName, setNewNote] = useState(null);

    const toggleAddClick = () => {
        setAddClickState(!isAddClick);
    }

    const handleNewNote = e => {
        setNewNote(e.target.value);
    }

    const createNote = e => {
        if (e.key === 'Enter') {
            if (newNoteName) {
                e.target.value = '';
                if (tag) {
                    createNewNote(activeRoute, tag.color, newNoteName, activeRoute);   
                } else {
                    createNewNote('freedom', '#000000', newNoteName, activeRoute);
                }
            }
        }
    }

    return (
        <NavContainer>
            <NavWrapper>
                <NavTitle>{activeRoute}</NavTitle>
                <NavNumber>{number}</NavNumber>
                <NavAddButton data-tip="Add note" isAddClicked={isAddClick} onClick={toggleAddClick}>
                    <Icon color="#3599DE" type="add" />
                </NavAddButton>
            </NavWrapper>
            <NavWrapper>
                <NavInputSearch isAddClicked={isAddClick} placeholder="Search" />
                <NavInputAdd onKeyPress={createNote} onChange={handleNewNote} isAddClicked={isAddClick} placeholder="Note name"/>
            </NavWrapper>
            <ReactTooltip type="dark" effect="solid"/>
        </NavContainer>
    );
};

export default connect(null, { createNewNote })(Nav);