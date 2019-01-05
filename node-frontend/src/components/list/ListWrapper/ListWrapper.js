import React from 'react';
import styles from './ListWrapper.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles)

const ListWrapper = ({ children }) => (
    < div className={cx('list-wrapper')} >
        {children}
    </div >
)

export default ListWrapper