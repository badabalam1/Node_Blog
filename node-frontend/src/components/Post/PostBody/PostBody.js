import React from 'react';
import styles from './PostBody.scss';
import classnames from 'classnames/bind';
import MarkdownRender from '../../common/MarkdownRender';

const cx = classnames.bind(styles)

const PostBody = ({ content }) => (
    <div className={cx('post-body')}>
        <div className={cx('paper')}>
            <MarkdownRender markdown={content} />
            <div className={cx('hert')}>
                <button>o</button>
                1
            </div>
        </div>
    </div>
)

export default PostBody