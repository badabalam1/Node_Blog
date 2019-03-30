import React from 'react';
import styles from './Header.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const handleClick = () => {
    alert('로그아웃되었습니다.');
    localStorage.removeItem('Token')
    localStorage.removeItem('ID')
    window.location.replace('/')
}

const Header = () => (
    <header className={cx('header')}>
        <div className={cx('header-content')}>
            <div className={cx('brand')}>
                <Link to='/'>ReactBlog</Link>
            </div>
            <div className={cx('right')}>
                <Link className={cx('list')} to='/'>글목록</Link>
                {localStorage.getItem('Token') ? <div className={cx('logout')} onClick={handleClick}>로그아웃</div> : <Link className={cx('list')} to='/Login'>로그인</Link>}
                {localStorage.getItem('Token') ? null : <Link to='/Register'>회원가입</Link>}
            </div>
        </div>
    </header>
)

export default Header