import React, { Component } from 'react';
import styles from './LoginPane.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles)


class LoginPane extends Component {

    handleChange = (e) => {
        const { onChangeInput } = this.props
        const { value, name } = e.target
        onChangeInput({ name, value })
    }

    render() {
        const { handleChange } = this
        const { onSubmit } = this.props
        return (
            <div className={cx('login-pane')}>
                <form>
                    <input name='id' onChange={handleChange} />
                    <input type='password' name='password' onChange={handleChange} />
                    <input type='button' value='로그인' onClick={onSubmit} />
                </form>
            </div>
        );
    }
}

export default LoginPane;