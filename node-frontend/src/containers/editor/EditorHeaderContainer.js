import React, { Component } from 'react';
import EditorHeader from '../../components/editor/EditorHeader'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import * as editorActions from '../../store/modules/editor'

class EditorHeaderContainer extends Component {
    componentDidMount() {
        const { EditorActions } = this.props
        EditorActions.initialize()
    }

    handleGoBack = () => {
        const { history } = this.props
        history.goBack();
    }

    handleSubmit = async () => {
        const { title, markdown, EditorActions, history } = this.props
        const post = {
            title,
            content: markdown
        }
        try {
            await EditorActions.writePost(post)
            const { postId } = this.props
            if (postId) {
                history.push(`/post/${this.props.postId}`)
            } else {

            }
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        const { handleGoBack, handleSubmit } = this

        return (
            <EditorHeader
                onGoBack={handleGoBack}
                onSubmit={handleSubmit}
            />
        );
    }
}

export default connect(
    (state) => ({
        title: state.editor.get('title'),
        markdown: state.editor.get('markdown'),
        postId: state.editor.get('postId')
    }),
    (dispatch) => ({
        EditorActions: bindActionCreators(editorActions, dispatch)
    })
)(withRouter(EditorHeaderContainer));