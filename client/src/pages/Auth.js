import React, { useState, useContext } from 'react';

import AuthService from '../services/AuthService';
import { AuthContext } from '../context/AuthContext';

const Auth = props => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [isLogin, setIsLogin] = useState(true);

  const authContext = useContext(AuthContext);

  const switchModeHandler = () => {
    setIsLogin(!isLogin);
  }

  const submitHandler = async e => {
    e.preventDefault();

    try {
      //Send request to backend
      if (isLogin) {
        const result = await AuthService.login(user);

        if (result) {
          const { token, userId, tokenExpiration } = result;
          authContext.login(token, userId, tokenExpiration);
        }


      } else {
        await AuthService.signup(user);
      }
    } catch (error) {
      throw error;
    }
  }

  const onChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  }

  const renderTitle = () => {
    let text = (isLogin) ? 'Login' : 'Signup';

    return (<h1>{text}</h1>);
  }

  const renderSwitchButton = () => {
    //let text = (isLogin) ? 'Signup' : 'Login';

    return (<button type="button" onClick={switchModeHandler} className="btn" id="switch">Switch</button>);
  }

  const renderNameInput = show => {
    return (
      <div className="form-control">
        <label htmlFor="name">Username</label>
        <input type="string" name="name" onChange={onChange} required />
      </div>
    )
  }

  return (
    <form className="auth-form" onSubmit={submitHandler}>
      {renderTitle()}

      {isLogin ? null : renderNameInput()}

      <div className="form-control">
        <label htmlFor="email">E-Mail</label>
        <input type="email" name="email" onChange={onChange} required />
      </div>

      <div className="form-control">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" onChange={onChange} required />
      </div>

      <div className="form-actions">
        <button type="submit" id="submit" className="btn">Submit</button>
        {renderSwitchButton()}
      </div>
    </form>
  );
}

export default Auth;