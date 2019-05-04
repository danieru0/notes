import React, { useState } from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

import Icon from '../Icon/Icon';

const EditorContainer = styled.div`
    width: 67%;
    height: 100vh;
    background: #21242A;

    @media (max-width: 1110px) {
        width: calc(100% - 250px);
        margin-left: auto;
    }

    @media (max-width: 700px) {
        width: calc(100% - 200px);
    }

    @media (max-width: 650px) {
        width: 100%;
    }
`

const EditorNav = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 50px;
`

const EditorTitle = styled.p`
    font-family: 'PT Serif', serif;
    color: #ffffff;
    font-size: 26px;
    letter-spacing: 1px;
    cursor: default;
`

const EditorButtonsList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
`

const EditorButtonsItem = styled.li`
    margin-left: 10px;
`

const EditorButton = styled.button`
    border: none;
    background: none;
    cursor: pointer;
    outline: none;
`

const StyledIcon = styled(Icon)`
    font-size: 26px;
`

const EditorTextArea = styled.textarea`
    margin: 25px 50px;
    resize: none;
    width: calc(100% - 100px);
    height: calc(100% - 150px);
    background: none;
    border: none;
    outline: none;
    color: #ffffff;
    font-family: 'PT Serif', serif;
    font-size: 16px;
    box-shadow: ${({editorOff}) => ( editorOff ? 'auto' : '0px 0px 15px 0px #000000' )};
    cursor: ${({editorOff}) => ( editorOff ? 'default' : 'auto' )};
`

const EditorWordsLength = styled.p`
    color: #8D8E91;
    font-family: 'PT Serif', serif;
    font-style: italic;
    position: absolute;
    bottom: 10px;
    right: 40px;
    font-size: 14px;
    cursor: default;
`

const Editor = () => {
    const [isEditorOff, setEditorState] = useState(true);

    const toggleEdit = () => {
        setEditorState(!isEditorOff);
    }

    return (
        <EditorContainer>
            <EditorNav>
                <EditorTitle>Yes you can!</EditorTitle>
                <EditorButtonsList>
                    <EditorButtonsItem>
                        <EditorButton data-tip={isEditorOff ? "Edit mode" : "Read mode"} onClick={toggleEdit}>
                            <StyledIcon color="#545962" type="edit" />
                        </EditorButton>
                    </EditorButtonsItem>
                    <EditorButtonsItem>
                        <EditorButton data-tip="Star it!">
                            <StyledIcon color="#545962" type="star" />
                        </EditorButton>
                    </EditorButtonsItem>
                </EditorButtonsList>
            </EditorNav>
            <EditorTextArea editorOff={isEditorOff} spellCheck="false" readOnly={isEditorOff} defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis dignissimos dolorem corrupti explicabo esse enim, deleniti eligendi sequi in fugiat possimus quam voluptatibus vero quidem dolorum amet doloremque, at laboriosam."></EditorTextArea>
            <EditorWordsLength>1000 words</EditorWordsLength>
            <ReactTooltip type="dark" effect="solid"/>
        </EditorContainer>
    );
};

export default Editor;