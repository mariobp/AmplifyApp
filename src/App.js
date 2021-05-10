import './App.css';
import { useState, useEffect } from 'react';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import Note from './Components/Note/Note';
import { Auth, Hub } from 'aws-amplify';
import SignIn from './Containers/SignIn/SignIn';
import SignUp from './Containers/SignUp/SignUp';
import ConfirmSignUp from './Containers/ConfirmSignUp/ConfirmSignUp';
import Header from './Components/Header/Header';
import { Alert } from 'antd';
import Loader from './Components/Loader/Loader';

const initialState = {
  contentType: 'signIn',
  user: '',
  error: {
    type: '',
    error: null
  },
  isAuthenticated: false
};

function App() {

  const [authState, setAuthState] = useState(initialState);
  const [userAuth, updateUserAuth] = useState(null);
  const [loading, setLoading] = useState(false);
  const { contentType, user, error } = authState;

  useEffect(() => {
    setAuthListener();
    checkUser();
  }, []);

  async function setAuthListener() {
    Hub.listen('auth', (data) => {
      switch (data.payload.event) {
        case 'signIn':
          console.log('user signed in');
          break;
        case 'signUp':
          console.log('user signed up');
          break;
        case 'signOut':
          setAuthState(() => ({...authState, contentType: 'signIn', isAuthenticated: false}));
          break;
        case 'signIn_failure':
          console.log('user sign in failed');
          break;
        default:
          break;
      }
    });
  }

  async function checkUser() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      console.log('user', user);
      updateUserAuth(user);
      setAuthState(() => ({...authState, contentType: 'note', isAuthenticated: true}));
    } catch (error) {
      reset();
    }
  }

  const reset = () => {
    updateUserAuth(null);
    setAuthState(() => ({...authState, contentType: 'signIn', isAuthenticated: false}));
  }

  const onSuccess = (type, data) => {
    switch (type) {
      case 'signUp':
        setLoading(false);
        setAuthState(() => ({...authState, contentType: 'confirmSignUp', user: data, error: {
          type: '',
          error: null
        }}));
        break;
      case 'conformSignUp':
        setLoading(false);
        setAuthState(() => ({...authState, contentType: 'signIn', error: {
          type: '',
          error: null
        }}));
        break;
      case 'signIn':
        setLoading(false);
        updateUserAuth(data);
        setAuthState(() => ({...authState, contentType: 'note', isAuthenticated: true, error: {
          type: '',
          error: null
        }}));
        break;
      default:
        break;
    }
  }

  const onFail = (type, error) => {
    console.log('error', error);
    setAuthState(() => ({...authState, error: { type, error }}));
    setLoading(false);
  }

  const renderForm = () => {
    switch (contentType) {
      case 'signUp':
        return (
          <SignUp
            onSignUp={e => onSuccess('signUp', e)}
            onSignUpError={e => onFail('signUp', e)}
            onSubmit={onLoading}
            onNavigation={navigation}/>
          );
      case 'confirmSignUp':
        return (
          <ConfirmSignUp
            username={user}
            onSubmit={onLoading}
            onConfirmSignUp={e => onSuccess('conformSignUp', e)}
            onConfirmSignUpError={e => onFail('conformSignUp', e)}/>
          );
      case 'note':
        return <Note />;
      default:
        return (
          <SignIn
            onSignIn={e => onSuccess('signIn', e)}
            onSubmit={onLoading}
            onSignInError={e => onFail('signIn', e)}
            onNavigation={navigation}/>
          );
    }
  }

  const navigation = contentType => {
    setAuthState(() => ({...authState, contentType }));
  }

  const onLoading = () => {
    setLoading(true);
  }

  return (
    <div className="App">
      <Header title="My Notes" user={userAuth} onSignOut={checkUser} onNavigation={navigation}/>
      {renderForm()}
      {
        error.error
        ? <Alert message={error.error.message} type="error" />
        : null
      }
      <Loader show={loading}/>
      
    </div>
  );
}

export default App;
