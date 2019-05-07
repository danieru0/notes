import React, {useState, useRef} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { createNewTag } from '../../actions/notesActions';
import { showModal } from '../../actions/modalActions';

import Circle from '../Circle/Circle';
import Icon from '../Icon/Icon';

const Modal = styled.form`
    width: 500px;
    height: 250px;
    background: #333840;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;

    &:before {
        content: 'New tag';
        position: absolute;
        top: -45px;
        color: #ffffff;
        font-size: 26px;
        font-family: 'PT Serif', serif;
    }
`

const ModalWrapper = styled.div`
    display: flex;
    align-items: center;
`

const ModalInput = styled.input`
    width: 300px;
    height: 40px;
    background: #21242A;
    border: none;
    outline: none;
    color: #fff;
    padding: 0px 10px;
    font-size: 18px;
    font-family: 'PT Serif', serif;
    border: 1px solid transparent;

    &:focus {
        border: 1px solid #aaa;
    }
`

const StyledCircle = styled(Circle)`
    cursor: pointer;
    margin-left: 20px;
`

const ModalColorInput = styled.input`
    display: none;
    visibility: hidden;
`

const ModalButton = styled.button`
    width: 120px;
    height: 40px;
    background: #21242A;
    color: #ffffff;
    font-family: 'PT Serif', serif;
    font-size: 18px;
    border: none;
    margin-top: 30px;
    cursor: pointer;
    outline: none;
    position: relative;

    &:after {
        content: '';
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        left: 0;
        top: 0;
        position: absolute;
        cursor: default;
        display: ${({disabled}) => (disabled ? 'block' : 'none')};
    }
`

const ModalClose = styled.button`
    position: absolute;
    left: -10px;
    top: -10px;
    border: none;
    background: none;
    cursor: pointer;
    outline: none;
`

const ModalError = styled.p`
    position: absolute;
    top: 0;
    color: red;
    font-size: 16px;
    font-family: 'PT Serif', serif;
`

const ModalTag = ({process, modalErrorMessage, createNewTag, showModal}) => {
    const [currentColor, setCurrentColor] = useState('red');
    const [tagName, setTagName] = useState(null);
    const colorInputEl = useRef(null);

    const handleCircleClick = () => {
        colorInputEl.current.click();
    }

    const handleCircleChange = e => {
        setCurrentColor(e.target.value);
    }

    const handleNameChange = e => {
        setTagName(e.target.value);
    }

    const createTag = e => {
        if (tagName) {
            e.preventDefault();
            if (tagName.length < 15) {
                createNewTag(currentColor, tagName);
            }
        }
    }

    const closeModal = e => {
        e.preventDefault();
        showModal(null);
    }

    return (
        <Modal onSubmit={createTag}>
            <ModalClose type="button" onClick={closeModal}>
                <Icon type="close" color="#bbb" />
            </ModalClose>
            <ModalError>{modalErrorMessage}</ModalError>
            <ModalColorInput onChange={handleCircleChange} ref={colorInputEl} type="color" />
            <ModalWrapper>
                <ModalInput onChange={handleNameChange} placeholder="Tag name" required/>
                <StyledCircle onClick={handleCircleClick} color={currentColor} size="big" />
            </ModalWrapper>
            <ModalButton disabled={process}>Create tag</ModalButton>
        </Modal>
    );
};

const mapStateToProps = state => {
    return {
        modalErrorMessage: state.modalReducer.modalErrorMessage,
        process: state.notesReducer.process
    }
}

export default connect(mapStateToProps, { createNewTag, showModal })(ModalTag);