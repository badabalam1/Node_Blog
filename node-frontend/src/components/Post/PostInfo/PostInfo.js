import React from 'react';
import styles from './PostInfo.scss';
import classnames from 'classnames/bind';
import moment from 'moment';

const cx = classnames.bind(styles)

const PostInfo = ({ createdAt, title }) => (
    <div className={cx('post-info')}>
        <div className={cx('info')}>
            <h1>{title}</h1>
            <div className={cx('date')}>{moment(createdAt).format('YYYY년MM월DD일')}</div>
        </div>
    </div>
)

export default PostInfo;