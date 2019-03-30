import React, { Component } from 'react';
import styles from './PostBody.scss';
import classnames from 'classnames/bind';
import MarkdownRender from '../../common/MarkdownRender';
import { Link } from 'react-router-dom';

const cx = classnames.bind(styles)



class PostBody extends Component {

    handleDelete = () => {
        const { PostActions, id } = this.props
        console.log(1)
        PostActions.deletePost(id)
    }

    handleClick = () => {
        this.setState({ boolean: !this.state.boolean })
    }

    state = {
        boolean: false
    }


    render() {
        const { content, id, postLike } = this.props
        const { handleClick, handleDelete } = this

        return (
            <div className={cx('post-body')}>
                <div className={cx('paper')}>
                    <MarkdownRender markdown={content} />
                    <p className={cx('menu1')} onClick={handleClick}></p>
                    {this.state.boolean ? <div className={cx('menu')}>
                        <div className={cx('delete')} onClick={handleDelete}>삭제하기</div>
                        <div className={cx('update')}><Link to={`/editor/` + id}>수정하기</Link></div>
                    </div> : null}
                    {postLike}
                </div>
            </div>
        )
    }
}

export default PostBody