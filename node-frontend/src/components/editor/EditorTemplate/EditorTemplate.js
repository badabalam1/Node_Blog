import React, { Component } from 'react';
import styles from './EditorTemplate.scss';
import classnames from 'classnames/bind';
import * as editorActions from '../../../store/modules/editor';
import * as postActions from '../../../store/modules/post';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const cx = classnames.bind(styles)

class EditorTemplate extends Component {
    state = {
        leftPercentage: 0.5
    }

    componentDidMount() {
        const { EditorActinos, PostActions, id } = this.props
        if (id) {
            PostActions.getPost(id)
        } else {
            EditorActinos.user()
        }
    }


    componentDidUpdate(nextProps, nextState) {
        if ((!this.props.admin) && !(this.props.user.admin)) {
            alert('권한이 없습니다.')
            window.location.replace('/')
        }
        return true
    }


    handleMouseMove = (e) => {
        this.setState({
            leftPercentage: e.clientX / window.innerWidth
        })
    }

    handleMouseUp = (e) => {
        document.body.removeEventListener('mousemove', this.handleMouseMove)
        window.removeEventListener('mouseup', this.handleMouseUp);
    }

    handleSeparatorMouseDown = (e) => {
        document.body.addEventListener('mousemove', this.handleMouseMove)
        window.addEventListener('mouseup', this.handleMouseUp)
    }

    render() {
        const { header, editor, preview, PostActions } = this.props
        const { leftPercentage } = this.state
        const { handleSeparatorMouseDown } = this
        const leftStyle = {
            flex: leftPercentage
        }

        const rightStyle = {
            flex: 1 - leftPercentage
        }

        const separatorStyle = {
            left: `${leftPercentage * 100}%`
        }

        return (
            <div className={cx('editor-template')}>
                {header}
                <div className={cx('panes')}>
                    <div className={cx('pane', 'editor')} style={leftStyle} PostActions={PostActions}>
                        {editor}
                    </div>
                    <div className={cx('pane', 'preview')} style={rightStyle} >
                        {preview}
                    </div>
                    <div className={cx('separator')} style={separatorStyle} onMouseDown={handleSeparatorMouseDown} />
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        user: state.editor.get('user'),
        admin: state.post.get('admin'),
        post: state.post.get('post')
    }),
    (dispatch) => ({
        EditorActinos: bindActionCreators(editorActions, dispatch),
        PostActions: bindActionCreators(postActions, dispatch)
    })
)(EditorTemplate);