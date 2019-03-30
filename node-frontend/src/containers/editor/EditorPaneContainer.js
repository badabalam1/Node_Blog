import React, { Component } from 'react';
import EditorPane from '../../components/editor/EditorPane';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as editorActions from '../../store/modules/editor';
import * as postActions from '../../store/modules/post';


class EditorPaneContainer extends Component {

    handleChangeInput = ({ name, value }) => {
        const { EditorActions } = this.props;
        EditorActions.changeInput({ name, value })
    }

    render() {
        const { title, markdown } = this.props
        const { handleChangeInput } = this
        return (
            <EditorPane
                title={title}
                markdown={markdown}
                onChangeInput={handleChangeInput}
            />
        );
    }
}

export default connect(
    (state) => ({
        title: state.editor.get('title'),
        markdown: state.editor.get('markdown'),
        posts: state.editor.get('post'),
        post: state.post.get('post')
    }),
    (dispatch) => ({
        EditorActions: bindActionCreators(editorActions, dispatch),
        PostActions: bindActionCreators(postActions, dispatch)
    })
)(EditorPaneContainer)