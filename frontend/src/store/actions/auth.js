import AuthService from '../../services/AuthService';
import { setCurrentUser, registerSuccess, logoutUser, getErrors } from "./actionCreators";

/**
 * Login user action
 */
export const loginUser = (state, history) => dispatch => {
  AuthService.login(this.state.email, this.state.password).then(resp => {
    if (resp.data.success) {
      console.log(' response data token:' + resp.data.profile);
      dispatch(setCurrentUser(resp.data.profile));
      console.log('user set')
      AuthService.saveToken(resp.data.token);
      history.push('/');
    }
  }).catch(error => {
      dispatch(getErrors({
        loginError: error
      }));
  });
}

/**
 * Logout action
 */
export const logout = (history) => dispatch => {
  AuthService.logout();
  dispatch(logoutUser());
  history.push('/')
  window.location.reload();
}

/**
 * Register user action
 */
export const registerUser = (user, history) => dispatch => {
  AuthService.signup(user).then(resp => {
    console.log('the user is:' + resp)
    if (resp.data.success) {
      dispatch(registerSuccess());
      history.push('/api/users/login');
    }
  }).catch(error => {
    if (error.response.data) {
      dispatch(getErrors({
        registerError: error.response.data.error
      }));
    }
  });
}
