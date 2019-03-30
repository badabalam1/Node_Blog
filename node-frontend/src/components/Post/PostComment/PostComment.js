import React, { Component, Fragment } from 'react';
import styles from './PostComment.scss';
import classnames from 'classnames/bind';
import moment from 'moment';

const cx = classnames.bind(styles)

// const CommentItem = ({ _id, comment, id, createdAt, handleDelete, }) => (
//     <div className={cx('comment')}>
//         <b key={_id}>{id}</b>
//         {localStorage.getItem('ID') === id ? <button className={cx('delete')} onClick={handleDelete} name={_id}>삭제</button> : null}
//         {localStorage.getItem('ID') === id ? <button className={cx('update')} >수정</button> : null}
//         <p className={cx('date')}>{moment(createdAt).fromNow() === "a day ago" ? moment(createdAt).startOf('day').fromNow() : moment(createdAt).fromNow()}</p>
//         <p>{comment}</p>
//     </div>
// )

class PostComment extends Component {

    handleChange = (e) => {
        const { onChangeInput } = this.props
        this.setState({ text: e.target.value })
        const { name, value } = e.target
        onChangeInput({ name, value })
    }

    handleSubmit = () => {
        const { onSubmit } = this.props
        this.setState({ text: '' })
        onSubmit()
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleSubmit()
        }
    }

    state = {
        text: ''
    }

    render() {
        const { handleChange, handleSubmit, handleKeyPress } = this
        const { comments, handleDelete, handleUpdate } = this.props
        const commentList = comments.map(
            (commentss) => {
                const { _id, comment, id, createdAt } = commentss.toJS()
                return (
                    <CommentItem key={_id} id={id.id} comment={comment} _id={_id} createdAt={createdAt} handleDelete={handleDelete} handleUpdate={handleUpdate} />
                )
            }
        )
        return (
            <div className={cx('post-comment')}>
                <div className={cx('comment')}>
                    <input className={cx('commentInput')} name='comment' placeholder='댓글을 입력하세요' value={this.state.text} onChange={handleChange} onKeyPress={handleKeyPress} />
                    <button onClick={handleSubmit}>댓글 적기</button>
                </div>
                {commentList}
            </div>
        )
    }
}

class CommentItem extends PostComment {

    state = {
        boolean: true,
        text: ''
    }

    handleChange = (e) => {
        this.setState({ text: e.target.value })
        console.log(e.target.value)
    }

    handleDelete = (e) => {
        const { handleDelete } = this.props
        handleDelete(this.props._id)
    }

    handleBoolean = () => {
        this.setState({
            boolean: !this.state.boolean,
            text: this.props.comment
        })
    }


    handleUpdate = (e) => {
        const { handleUpdate } = this.props
        handleUpdate(this.props._id, this.state.text)
        this.setState({ boolean: !this.state.boolean })
    }

    render() {
        const { handleDelete, handleBoolean, handleUpdate, handleChange } = this
        const { _id, comment, id, createdAt } = this.props
        return (
            <div className={cx('comment')} key={_id}>
                <b>{id}</b>
                {this.state.boolean ? (
                    <Fragment>
                        {localStorage.getItem('ID') === id ? <button className={cx('delete')} onClick={handleDelete}>삭제</button> : null}
                        {localStorage.getItem('ID') === id ? <button className={cx('update')} onClick={handleBoolean}>수정</button> : null}
                        <p className={cx('date')}>{moment(createdAt).fromNow() === "a day ago" ? moment(createdAt).startOf('day').fromNow() : moment(createdAt).fromNow()}</p>
                        <p>{comment}</p>
                    </Fragment>
                ) : (
                        <Fragment>
                            <button className={cx('delete')} onClick={handleBoolean}>취소</button>
                            <button className={cx('update')} onClick={handleUpdate}>수정</button>
                            <p className={cx('date')}>{moment(createdAt).fromNow() === "a day ago" ? moment(createdAt).startOf('day').fromNow() : moment(createdAt).fromNow()}</p>
                            <input name='updateInput' ref={ref => { this.input = ref }} onChange={handleChange} value={this.state.text} />
                        </Fragment>
                    )}
            </div>
        )
    }
}

export default PostComment