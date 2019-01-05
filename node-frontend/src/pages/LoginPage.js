import React from 'react';
import PageTemplate from '../components/common/PageTemplate';
import LoginWrapper from '../components/Login/LoginWrapper';
import LoginContainer from '../containers/login/LoginContainer';

const LoginPage = () => {
    return (
        <PageTemplate>
            <LoginWrapper>
                {localStorage.getItem('Token') ? window.location.replace('/') : <LoginContainer />}
            </LoginWrapper>
        </PageTemplate>
    )
}

export default LoginPage