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

    handleUpdate = async () => {
        const { title, EditorActions, id } = this.props
        const { markdown: content } = this.props
        try {
            await EditorActions.writePut(title, content, id)
            const { post, history } = this.props
            if (post === 'Success') {
                alert('수정되었습니다.')
                history.goBack()
            } else {
                alert('권한이 없습니다.')
            }
        } catch (e) {
            console.log(e)
        }
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
            }
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        const { handleGoBack, handleSubmit, handleUpdate } = this
        return (
            <EditorHeader
                onGoBack={handleGoBack}
                onSubmit={handleSubmit}
                onUpdate={handleUpdate}
                id={this.props.id}
            />
        );
    }
}

export default connect(
    (state) => ({
        title: state.editor.get('title'),
        markdown: state.editor.get('markdown'),
        postId: state.editor.get('postId'),
        post: state.editor.get('post')
    }),
    (dispatch) => ({
        EditorActions: bindActionCreators(editorActions, dispatch)
    })
)(withRouter(EditorHeaderContainer));