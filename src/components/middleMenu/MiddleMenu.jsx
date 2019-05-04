import React from 'react';
import styled from 'styled-components';

import Nav from './Nav';
import Note from './Note';

const MiddleMenuContainer = styled.div`
    width: 16%;
    height: 100vh;
    background: #333840;
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

const MiddleMenu = () => {
    return (
        <MiddleMenuContainer>
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