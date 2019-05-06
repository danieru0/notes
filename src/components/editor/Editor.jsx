import React, { Component } from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';

import { updateNote } from '../../actions/notesActions';

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

class Editor extends Component {
    constructor() {
        super();
        this.state ={
            isEditorOff: true,
            editorValue: '',
            editorStar: null,
            texting: false
        }
    }

    componentDidMount() {
        if (this.editor) {
            this.editor.addEventListener('keydown', this.keyShortcut)
        }
    }

    componentWillUnmount() {
        this.editor.removeEventListener(this.keyShortcut);
    }

    componentDidUpdate(prevProps) {
        if (this.props.activeNote) {
            if (prevProps.activeNote !== this.props.activeNote) {
                this.setState({ editorValue: this.props.activeNote.value, editorStar: this.props.activeNote.star });
            }
        }
    }

    toggleEdit = () => {
        this.setState({ isEditorOff: !this.state.isEditorOff });
    }

    toggleStar = () => {
        if (!this.props.process) {
            this.setState({
                editorStar: !this.state.editorStar
            }, () => {
                this.props.updateNote(this.props.activeNote.id, 'star', this.state.editorStar, this.props.activeRoute);
            })
        }
    }

    handleEditorText = e => {
        this.setState({ editorValue: e.target.value, texting: true });
    }

    saveButton = () => {
        this.props.updateNote(this.props.activeNote.id, 'text', this.state.editorValue, this.props.activeRoute);
        this.setState({ texting: false });
    }

    keyShortcut = e => {
        if ((e.key === 's' || e.key === 'S') && (e.ctrlKey || e.metaKey)) {
            if (!this.state.isEditorOff) {
                e.preventDefault();
                this.props.updateNote(this.props.activeNote.id, 'text', this.state.editorValue, this.props.activeRoute);
                this.setState({ texting: false });
            }
        }
        if (e.keyCode === 112) {
            e.preventDefault();
            this.setState({ isEditorOff: !this.state.isEditorOff });
        }
    }

    render() {
        const { activeNote, noteGetting } = this.props;
        const { isEditorOff, editorValue, editorStar, texting } = this.state;

        return (
            <EditorContainer ref={r => this.editor = r}>
                {
                    activeNote ? (
                        <>
                            <EditorNav>
                            <EditorTitle>{activeNote.name}</EditorTitle>
                            <EditorButtonsList  >
                                <EditorButtonsItem>
                                    <EditorButton data-tip={isEditorOff ? "Edit mode (F1)" : "Read mode (F1)"} onClick={this.toggleEdit}>
                                        <StyledIcon color={isEditorOff ? "#545962" : "#767984"} type="edit" />
                                    </EditorButton>
                                </EditorButtonsItem>
                                <EditorButtonsItem>
                                    <EditorButton data-tip={editorStar ? 'Unstar' : 'Star it!'} onClick={this.toggleStar}>
                                        <StyledIcon color={editorStar ? '#F1C200' : "#545962"} type="star" />
                                    </EditorButton>
                                </EditorButtonsItem>
                                <EditorButtonsItem>
                                    <EditorButton data-tip="Save (CTRL + S)" onClick={this.saveButton}>
                                        <StyledIcon color={texting ? "#3599DE" : "#545962"} type="save" />
                                    </EditorButton>
                                </EditorButtonsItem>
                            </EditorButtonsList>
                            </EditorNav>
                            <EditorTextArea onChange={this.handleEditorText} editorOff={isEditorOff} spellCheck="false" readOnly={isEditorOff} value={editorValue}></EditorTextArea>
                            <EditorWordsLength>{`${editorValue.length} words`}</EditorWordsLength>
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
        )
    }
}

const mapStateToProps = state => {
    return {
        activeNote: state.notesReducer.activeNote,
        noteGetting: state.notesReducer.noteGetting,
        activeRoute: state.routesReducer.activeRoute,
        process: state.notesReducer.process
    }
}

export default connect(mapStateToProps, { updateNote })(Editor);