import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { updateRoute } from '../../actions/routesActions';
import { removeTag } from '../../actions/notesActions';

import Logo from './Logo';
import Icon from '../Icon/Icon';
import Circle from '../Circle/Circle';
import Footer from './Footer';

const LeftMenuContainer = styled.div`
    width: 17%;
    height: 100vh;
    background: #21242A;
    position: relative;
    overflow-y: auto;
    z-index: 1;

    @media (max-width: 1110px) {
        width: 250px;
    }

    @media (max-width: 700px) {
        width: 200px;
    }

    @media (max-width: 650px) {
        left: 0;
        overflow-y: auto;
        position: ${({menuActive}) => ( menuActive ? 'absolute' : 'initial' )};
        width: ${({menuActive}) => ( menuActive ? '250px' : '0' )};
        box-shadow: ${({menuActive}) => ( menuActive ? '2px 0px 20px -5px #000000' : 'initial' )};
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
    user-select: none;

    background: ${({type, activeRoute}) => ( type === activeRoute && type ? '#32353B;' : 'unset' )};

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
    box-shadow: 0px 0px 20px 0px #000000 inset;
    overflow-y: ${({isDropdownOpen}) => ( isDropdownOpen ? 'auto' : 'none' )};
`

const LeftMenuItemDropdownItem = styled.li`
    color: ${({type, activeRoute}) => ( type === activeRoute && type ? '#3F4347;' : '#ffffff' )};
    font-family: 'PT Serif', serif;
    font-size: 16px;
    display: flex;
    align-items: center;
    padding-left: 44px;
    cursor: pointer;
    height: 63px;
    user-select: none;

    @media (max-width: 1285px) {
        padding-left: 5px;
    }
`

const LeftMenuItemDropdownDeleteButton = styled.button`
    margin-left: auto;
    position: relative;
    right: 40px;
    border: none;
    background: none;
    cursor: pointer;
    outline: none;

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

const LeftMenu = ({profile, activeRoute, activeNote, updateRoute, removeTag}) => {
    const [isDropdownShown, setDropdownState] = useState(false);
    const [isMenuActive, setMenuState] = useState(false);

    const toggleDropdownMenu = () => {
        setDropdownState(!isDropdownShown);
    }

    const toggleMenu = () => {
        setMenuState(!isMenuActive);
    }

    const handleMenuClick = (e, route) => {
        e.stopPropagation();
        if (activeRoute !== route) {
            updateRoute(route);
        }
    }

    const handleRemoveTag = (e, activeRoute) => {
        e.stopPropagation();
        removeTag(activeRoute, activeNote);
    }

    return (
        <LeftMenuContainer menuActive={isMenuActive}>
            <Logo />
            <LeftMenuButtonShow onClick={toggleMenu}>
                <StyledIcon color="#545962" type="hamburger" />
            </LeftMenuButtonShow>
            <LeftMenuList>
                <LeftMenuItem type="all" activeRoute={activeRoute} onClick={(e) => handleMenuClick(e, 'all')}>
                    <Icon color="#3599DE" type="notes" />
                    <LeftMenuItemText>All Notes</LeftMenuItemText>
                </LeftMenuItem>
                <LeftMenuItem type="star" activeRoute={activeRoute} onClick={(e) => handleMenuClick(e, 'star')}>
                    <Icon color="#F1C200" type="star" />
                    <LeftMenuItemText>Starred</LeftMenuItemText>
                </LeftMenuItem>
                <LeftMenuItem onClick={toggleDropdownMenu}>
                    <Icon color="#7F8C8D" type="tags" />
                    <LeftMenuItemText>Tags</LeftMenuItemText>
                    <IconStyled isDropdownOpen={isDropdownShown} color="#4D4F54" type="dropdown" />
                    <LeftMenuItemDropdown isDropdownOpen={isDropdownShown}>
                        <LeftMenuList>
                            {
                                profile.isLoaded ? (
                                    Object.keys(profile.tags).map((item, index) => {
                                        let tagProperties = profile.tags[item];
                                        return (
                                            <LeftMenuItemDropdownItem type={item} activeRoute={activeRoute} key={index} onClick={(e) => handleMenuClick(e, item)}>
                                                <Circle size="big" color={tagProperties.color} />
                                                <LeftMenuItemText>{item}</LeftMenuItemText>
                                                <LeftMenuItemDropdownDeleteButton onClick={(e) => handleRemoveTag(e, item)}>
                                                    <Icon color="#333840" type="trash" />
                                                </LeftMenuItemDropdownDeleteButton>
                                            </LeftMenuItemDropdownItem>
                                        )
                                    })
                                ) : (
                                    ''
                                )
                            }
                        </LeftMenuList>
                    </LeftMenuItemDropdown>
                </LeftMenuItem>
                <LeftMenuItem type="trash" activeRoute={activeRoute} onClick={(e) => handleMenuClick(e, 'trash')}>
                    <Icon color="#E04E38" type="trash" />
                    <LeftMenuItemText>Trash</LeftMenuItemText>
                </LeftMenuItem>
            </LeftMenuList>
            <Footer nick={profile.nick} avatar={profile.avatar} email={profile.email} menuActive={isMenuActive} dropdownActive={isDropdownShown} />
        </LeftMenuContainer>
    );
};

const mapStateToProps = state => {
    return {
        profile: state.firebase.profile,
        activeRoute: state.routesReducer.activeRoute,
        activeNote: state.notesReducer.activeNote
    }
}

export default connect(mapStateToProps, { updateRoute, removeTag })(LeftMenu);