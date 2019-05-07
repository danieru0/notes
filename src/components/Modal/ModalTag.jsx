import React, {useState, useRef} from 'react';
import styled from 'styled-components';

import Circle from '../Circle/Circle';

const Modal = styled.form`
    width: 500px;
    height: 200px;
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
`

const ModalTag = () => {
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
            alert(tagName);
        }
    }

    return (
        <Modal>
            <ModalColorInput onChange={handleCircleChange} ref={colorInputEl} type="color" />
            <ModalWrapper>
                <ModalInput onChange={handleNameChange} placeholder="Tag name" required/>
                <StyledCircle onClick={handleCircleClick} color={currentColor} size="big" />
            </ModalWrapper>
            <ModalButton onClick={createTag}>Create tag</ModalButton>
        </Modal>
    );
};

export default ModalTag;