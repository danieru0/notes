import React from 'react';
import styled from 'styled-components';

import ModalTag from './ModalTag';

const ModalContainer = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    background: rgba(0,0,0,0.3);
    z-index: 99;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Modal = ({type}) => {
    if (!type ) {
        return null;
    }
    return (
        <ModalContainer>
            {
                type === 'tag' ? (
                    <ModalTag />
                ) : (
                    ''
                )
            }
        </ModalContainer>
    );
};

export default Modal;