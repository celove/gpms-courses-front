import { Auth } from 'aws-amplify';

const startLoading = {
  isLoading: true,
};

const stopLoading = {
  isLoading: false,
};

const loginSuccess = (user) => {
  console.log('user', user);
};

const handleSubmit = event => (dispatch, getState) => {
  console.log('STATE', getState());
  dispatch('OI');
  event.preventDefault();
  // return async (dispatch, getState) => {
    console.log('DISPATCH')
  //   const { form } = getState();
  //   try {
  //     dispatch(startLoading);
  //     const user = await Auth.signIn(form.login.email, form.login.password);
  //     dispatch(loginSuccess(user));
  //     // this.props.history.push('/');
  //   } catch (e) {
  //     alert(e.message);
  //     this.setState({ isLoading: false });
  //   }
  //   dispatch(stopLoading);
  // }
};

export default {
  handleSubmit,
};
