import React, { Component } from 'react';
import LoginPane from '../../components/Login/LoginPane';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as loginActions from '../../store/modules/Login';


class LoginPaneContainer extends Component {

    handleChangeInput = ({ name, value }) => {
        const { LoginActions } = this.props;
        LoginActions.changeInput({ name, value })
    }

    handleSubmit = async () => {
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

    render() {
        const { handleChangeInput, handleSubmit } = this
        return (
            <LoginPane
                onChangeInput={handleChangeInput}
                onSubmit={handleSubmit}
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