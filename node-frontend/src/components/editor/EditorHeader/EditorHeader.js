import React from 'react';
import styles from './EditorHeader.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles)

const EditorHeader = ({ onGoBack, onSubmit }) => {
    return (
        <div className={cx('editor-header')}>
            <div className={cx('back')}>
                <button onClick={onGoBack}>뒤로가기</button>
            </div>
            <div className={cx('submit')}>
                <button onClick={onSubmit}>작성하기</button>
            </div>
        </div>
    )
}

export default EditorHeader