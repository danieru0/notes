import React, { useState } from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';

import Icon from '../Icon/Icon';
import Loader from '../Loader/Loader';

const EditorContainer = styled.div`
    width: 67%;
    height: 100vh;
    background: #21242A;
    position: relative;

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

const EditorNoNote = styled.p`
    width: 100%;
    height: 100%;
    color: #545962;
    font-size: 18px;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'PT Serif', serif;
`

const StyledLoader = styled(Loader)`
    position: absolute
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
`

const Editor = ({activeNote, noteGetting}) => {
    const [isEditorOff, setEditorState] = useState(true);

    const toggleEdit = () => {
        setEditorState(!isEditorOff);
    }

    return (
        <EditorContainer>
            {
                activeNote ? (
                    <>
                        <EditorNav>
                        <EditorTitle>{activeNote.name}</EditorTitle>
                        <EditorButtonsList>
                            <EditorButtonsItem>
                                <EditorButton data-tip={isEditorOff ? "Edit mode" : "Read mode"} onClick={toggleEdit}>
                                    <StyledIcon color="#545962" type="edit" />
                                </EditorButton>
                            </EditorButtonsItem>
                            <EditorButtonsItem>
                                <EditorButton data-tip={activeNote.star ? 'Unstar' : 'Star it!'}>
                                    <StyledIcon color={activeNote.star ? '#F1C200' : "#545962"} type="star" />
                                </EditorButton>
                            </EditorButtonsItem>
                        </EditorButtonsList>
                        </EditorNav>
                        <EditorTextArea editorOff={isEditorOff} spellCheck="false" readOnly={isEditorOff} value={activeNote.value}></EditorTextArea>
                        <EditorWordsLength>{`${activeNote.value.length} words`}</EditorWordsLength>
                        <ReactTooltip type="dark" effect="solid"/>
                    </>

                ) : (
                    noteGetting ? (
                        <StyledLoader />
                    ) : (
                        <EditorNoNote>Nothing here ;(</EditorNoNote>
                    )
                )
            }

        </EditorContainer>
    );
};

const mapStateToProps = state => {
    return {
        activeNote: state.notesReducer.activeNote,
        noteGetting: state.notesReducer.noteGetting
    }
}

export default connect(mapStateToProps, null)(Editor);