import React, { Component } from 'react';
import styles from './LoginPane.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles)


class LoginPane extends Component {

    state = {
        login: true,
        id: this.props.id,
        password: this.props.password
    }

    componentDidMount() {
        const { path } = this.props
        console.log(path)
        if (path === '/Register') {
            this.setState({ login: false })
        }
    }

    handleFormChange = () => {
        this.setState({ login: !this.state.login })
    }

    handleKeyPass = (e) => {
        const { handleLoginSubmit, handleRegisterSubmit } = this
        if (e.key === 'Enter') {
            if (this.state.login) {
                handleLoginSubmit()
            } else {
                handleRegisterSubmit()
            }
        }
    }

    componentDidUpdate(nextProps, nextState) {
        if (nextProps.id !== this.props.id || nextProps.password !== this.props.password) {
            this.render()
        }
    }

    handleChange = (e) => {
        const { onChangeInput } = this.props
        const { value, name } = e.target
        onChangeInput({ name, value })
    }

    handleLoginSubmit = async () => {
        const { onLoginSubmit } = this.props
        onLoginSubmit()
    }

    handleRegisterSubmit = async () => {
        const { onRegisterSubmit } = this.props
        onRegisterSubmit()
    }

    render() {
        const { handleChange, handleKeyPass, handleFormChange, handleLoginSubmit, handleRegisterSubmit } = this

        return (
            <div className={cx('login-pane')}>
                <h1>{this.state.login || window.location.pathname === '/Login' ? '로그인' : '회원가입'}</h1>
                {this.props.id ? <p className={cx('idText')}>아이디를 4~12글자로 입력해주세요</p> : null}
                <input className={cx('id')} name='id' onChange={handleChange} placeholder='아이디' onKeyPress={handleKeyPass} />
                {this.props.password ? <p className={cx('passwordText')}>비밀번호를 8~16글자로 입력해주세요</p> : null}
                <input className={cx('password')} type='password' name='password' onChange={handleChange} placeholder='비밀번호 ' onKeyPress={handleKeyPass} />
                {this.state.login || window.location.pathname === '/Login' ? <input className={cx('button')} type='button' value='로그인' onClick={handleLoginSubmit} /> : <input className={cx('button')} type='button' value='회원가입' onClick={handleRegisterSubmit} />}
            </div>
        );
    }
}

export default LoginPane;