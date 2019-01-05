import React from 'react';
import styles from './LoginWrapper.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles)

const LoginWrapper = ({ children }) => (
    <div className={cx('login-wrapper')}>
        {children}
    </div>
)

export default LoginWrapper