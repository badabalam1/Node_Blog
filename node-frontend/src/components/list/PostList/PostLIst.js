import React from 'react';
import styles from './PostList.scss';
import classnames from 'classnames/bind';
import { Link } from 'react-router-dom';
import moment from 'moment';

const cx = classnames.bind(styles)

const PostItem = ({ _id, id, title, createdAt, content }) => {
    return (
        <div className={cx('post-item')}>
            <h2><Link to={`/post/${_id}`}>{title}</Link></h2>
            <div className={cx('date')}>{moment(createdAt).format('YYYY년MM월DD일')}</div>
            <p>{content}</p>
        </div>
    )
}

const PostList = ({ posts, user }) => {
    const postList = posts.map(
        (posts) => {
            const { _id, title, createdAt, content } = posts.toJS()
            return (
                <PostItem key={_id} _id={_id} title={title} createdAt={createdAt} content={content} />
            )
        }
    )
    return (
        <div className={cx('post-list')}>
            {user.admin ? <Link to={`/editor`}><button>글쓰기</button></Link> : null}
            {postList}
        </div>
    )
}

export default PostList