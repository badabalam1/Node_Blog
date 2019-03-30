import React, { Component } from 'react';
import LoginPane from '../../components/Login/LoginPane';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as loginActions from '../../store/modules/Login';


class LoginPaneContainer extends Component {

    state = {
        id: false,
        password: false
    }

    handleChangeInput = ({ name, value }) => {
        const { LoginActions } = this.props;
        LoginActions.changeInput({ name, value })
    }

    componentDidUpdate(nextProps, nextState) {
        if (nextProps.members !== this.props.members) {
            this.render()
        }
    }

    handleLoginSubmit = async () => {
        const { id, password, LoginActions } = this.props
        try {
            await LoginActions.loginPost(id, password)
            const { members } = this.props
            const { token, message } = members.toJS()
            if (token) {
                localStorage.setItem('Token', token)
                localStorage.setItem('ID', id)
                alert('로그인 되었습니다.')
                window.location.replace('/')
            } else {
                alert(message)
            }
        } catch (e) {
            console.log(e)
        }
    }

    handleRegisterSubmit = async () => {
        const { id, password, LoginActions } = this.props
        try {
            await LoginActions.RegisterPost(id, password)
            const { message } = this.props.members
            if (message === 'Success') {
                alert('회원가입에 성공했습니다.')
                await LoginActions.loginPost(id, password)
                const { members } = this.props
                const { token } = members.toJS()
                console.log(token)
                localStorage.setItem('Token', token)
                localStorage.setItem('ID', id)
                window.location.replace('/')
            } else {
                if (/INVALID_ID/.exec(message)) {
                    alert('아이디를 알맞게 입력해주세요.')
                    this.setState({ id: true, password: false })
                } else if (/INVALID_PASSWORD/.exec(message)) {
                    alert('비밀번호를 알맞게 입력해주세요.')
                    this.setState({ id: false, password: true })
                } else {
                    alert(message)
                    this.setState({ id: false, password: false })
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        const { handleChangeInput, handleLoginSubmit, handleRegisterSubmit } = this
        return (
            <LoginPane
                onChangeInput={handleChangeInput}
                onLoginSubmit={handleLoginSubmit}
                onRegisterSubmit={handleRegisterSubmit}
                id={this.state.id}
                password={this.state.password}
                path={this.props.path}
            />
        );
    }
}

export default connect(
    (state) => ({
        id: state.login.get('id'),
        password: state.login.get('password'),
        members: state.login.get('members')
    }),
    (dispatch) => ({
        LoginActions: bindActionCreators(loginActions, dispatch)
    })
)(LoginPaneContainer)