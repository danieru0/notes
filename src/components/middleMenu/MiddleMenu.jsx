import React, {useState} from 'react';
import styled from 'styled-components';

import Icon from '../Icon/Icon';
import Nav from './Nav';
import Note from './Note';

const MiddleMenuContainer = styled.div`
    width: 16%;
    height: 100vh;
    background: #333840;

    @media (max-width: 1300px) {
        width: 220px;
    }

    @media (max-width: 1110px) {
        overflow-y: auto;
        z-index: 1;
        left: 250px;
        width: ${({menuActive}) => ( menuActive ? '250px' : '0' )};
        position: ${({menuActive}) => ( menuActive ? 'absolute' : 'none' )};   
    }

    @media (max-width: 700px) {
        left: 200px;
    }

    @media (max-width: 650px) {
        left: auto;
        right: 0;
    }
`

const MiddleMenuList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
`

const MiddleMenuItem = styled.li`
    width: 100%;
`

const MiddleMenuShowButton = styled.button`
    display: none;

    @media (max-width: 1110px) {
        z-index: 1;
        position: absolute;
        color: #fff;
        display: block;
        background: none;
        border: none;
        cursor: pointer;
        outline: none;
        top: 21px;
    }

    @media (max-width: 650px) {
        right: 0;
        top: 22px;
    }
`

const StyledIcon = styled(Icon)`
    font-size: 25px;
`

const MiddleMenu = () => {
    const [isMenuActive, setMenuState] = useState(false);

    const toggleMenu = () => {
        setMenuState(!isMenuActive);
    }
    return (
        <MiddleMenuContainer menuActive={isMenuActive}>
            <MiddleMenuShowButton onClick={toggleMenu}>
                <StyledIcon color="#545962" type="hamburger" />
            </MiddleMenuShowButton>
            <Nav />
            <MiddleMenuList>
                <MiddleMenuItem>
                    <Note title="Article No. 2" description="Vestibulum rutrum quam vitae fringilla tincidunt. Suspendisse nec tortor urna. Ut laoreet sodales nisi, quis iaculis nulla iacullis vitae..." date="Aug. 24" />
                </MiddleMenuItem>
                <MiddleMenuItem>
                    <Note title="Article No. 5" description="Vestibulum rutrum quam vitae fringilla tincidunt. Suspendisse nec tortor urna. Ut laoreet sodales nisi, quis iaculis nulla iacullis vitae..." date="Aug. 27" />
                </MiddleMenuItem>
            </MiddleMenuList>
        </MiddleMenuContainer>
    );
};

export default MiddleMenu;