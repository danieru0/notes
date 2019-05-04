import React, { useState } from 'react';
import styled from 'styled-components';

import Logo from './Logo';
import Icon from '../Icon/Icon';
import Circle from '../Circle/Circle';
import Footer from './Footer';

const LeftMenuContainer = styled.div`
    width: 17%;
    height: 100vh;
    background: #21242A;
    position: relative;
    box-shadow: 0px 0px 20px 1px #000000 inset;
    overflow-y: auto;

    @media (max-width: 1110px) {
        width: 250px;
    }

    @media (max-width: 700px) {
        width: 200px;
    }

    @media (max-width: 650px) {
        left: 0;
        overflow-y: auto;
        position: ${({menuActive}) => ( menuActive ? 'absolute' : 'unset' )};
        width: ${({menuActive}) => ( menuActive ? '250px' : '0' )};
    }
`

const LeftMenuList = styled.ul`
    list-style: none;
    width: 100%;
    padding: 0;
    margin: 0;
`

 const LeftMenuItem = styled.li`
    margin: 0;
    padding: 0;
    min-height: 80px;
    max-height: auto;
    color: #8C8E90;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    font-family: 'PT Serif', serif;
    font-size: 20px;
    padding-left: 40px;
    cursor: pointer;
    border-top: 2px solid #333840;
    border-bottom: 2px solid #17181D;
    overflow: hidden;
    position: relative;

    @media (max-width: 1335px) {
        padding-left: 5px;
    }
`

const LeftMenuItemText = styled.p`
    margin-left: 34px;
`

const IconStyled = styled(Icon)`
    margin-left: auto;
    position: relative;
    right: 40px;
    top: 2px;
    transition: transform .3s;
    transform: ${({isDropdownOpen}) => ( isDropdownOpen ? 'auto' : 'rotate(180deg)' )};
`

const LeftMenuItemDropdown = styled.div`
    width: calc(100% + 40px);
    margin-left: -40px;
    transition: height .4s, padding .4s;
    height: ${({isDropdownOpen}) => ( isDropdownOpen ? '300px' : '0' )};
    padding: ${({isDropdownOpen}) => ( isDropdownOpen ? '15px 0' : 'auto' )};
    background: #1F2125;
    cursor: auto;
    box-shadow: 0px 0px 20px 0px #000000 inset
`

const LeftMenuItemDropdownItem = styled.li`
    color: #ffffff;
    font-family: 'PT Serif', serif;
    font-size: 16px;
    display: flex;
    align-items: center;
    padding-left: 44px;
    cursor: pointer;
    height: 63px;

    @media (max-width: 1285px) {
        padding-left: 5px;
    }
`

const LeftMenuItemDropdownNumber = styled.span`
    color: #8C8E90;
    margin-left: auto;
    position: relative;
    right: 40px;

    @media (max-width: 1490px) {
        display: none;
    }
`

const LeftMenuButtonShow = styled.button`
    display: none;

    @media (max-width: 650px) {
        position: absolute;
        z-index: 1;
        background: none;
        border: none;
        outline: none;
        display: block;
        cursor: pointer;
        top: 22px;
    }
`

const StyledIcon = styled(Icon)`
    font-size: 25px;
`

const LeftMenu = () => {
    const [isDropdownShown, setDropdownState] = useState(false);
    const [isMenuActive, setMenuState] = useState(false);

    const toggleDropdownMenu = () => {
        setDropdownState(!isDropdownShown);
    }

    const toggleMenu = () => {
        setMenuState(!isMenuActive);
    }

    const handleClick = (e) => {
        e.stopPropagation();
    }
    return (
        <LeftMenuContainer menuActive={isMenuActive}>
            <Logo />
            <LeftMenuButtonShow onClick={toggleMenu}>
                <StyledIcon color="#545962" type="hamburger" />
            </LeftMenuButtonShow>
            <LeftMenuList>
                <LeftMenuItem>
                    <Icon color="#3599DE" type="notes" />
                    <LeftMenuItemText>All Notes</LeftMenuItemText>
                </LeftMenuItem>
                <LeftMenuItem>
                    <Icon color="#F1C200" type="star" />
                    <LeftMenuItemText>Starred</LeftMenuItemText>
                </LeftMenuItem>
                <LeftMenuItem onClick={toggleDropdownMenu}>
                    <Icon color="#7F8C8D" type="tags" />
                    <LeftMenuItemText>Tags</LeftMenuItemText>
                    <IconStyled isDropdownOpen={isDropdownShown} color="#4D4F54" type="dropdown" />
                    <LeftMenuItemDropdown isDropdownOpen={isDropdownShown}>
                        <LeftMenuList>
                            <LeftMenuItemDropdownItem onClick={handleClick}>
                                <Circle size="big" color="#BB2DE5" />
                                <LeftMenuItemText>To Do's</LeftMenuItemText>
                                <LeftMenuItemDropdownNumber>2</LeftMenuItemDropdownNumber>
                            </LeftMenuItemDropdownItem>
                            <LeftMenuItemDropdownItem onClick={handleClick}>
                                <Circle size="big" color="#BAE77E" />
                                <LeftMenuItemText>Vacation Plans</LeftMenuItemText>
                                <LeftMenuItemDropdownNumber>4</LeftMenuItemDropdownNumber>
                            </LeftMenuItemDropdownItem>
                            <LeftMenuItemDropdownItem onClick={handleClick}>
                                <Circle size="big" color="#FE9600" />
                                <LeftMenuItemText>Project Plans</LeftMenuItemText>
                                <LeftMenuItemDropdownNumber>3</LeftMenuItemDropdownNumber>
                            </LeftMenuItemDropdownItem>
                            <LeftMenuItemDropdownItem onClick={handleClick}>
                                <Circle size="big" color="#FC3150" />
                                <LeftMenuItemText>Articles</LeftMenuItemText>
                                <LeftMenuItemDropdownNumber>2</LeftMenuItemDropdownNumber>
                            </LeftMenuItemDropdownItem>
                        </LeftMenuList>
                    </LeftMenuItemDropdown>
                </LeftMenuItem>
                <LeftMenuItem>
                    <Icon color="#E04E38" type="trash" />
                    <LeftMenuItemText>Trash</LeftMenuItemText>
                </LeftMenuItem>
            </LeftMenuList>
            <Footer menuActive={isMenuActive} dropdownActive={isDropdownShown} />
        </LeftMenuContainer>
    );
};

export default LeftMenu;