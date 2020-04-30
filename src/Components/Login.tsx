import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'
import {Button} from 'reactstrap'
import { Mutation } from 'react-apollo'
import {GET_TOKEN, CREATE_USER} from '../GraphQL/Mutations/user'

class Login extends Component {
  state = {
    login: true, // switch between Login and SignUp
    username: '',
    password: '',
    email: '',
    error: false,
  }

  render() {
    const { login, username, password, email } = this.state
    return (
      <div>
        <h4 className="mv3">{login ? 'Login' : 'Sign Up'}</h4>
        <div className="flex flex-column">
          {!login && (
            <input
              value={email}
              onChange={e => this.setState({ email: e.target.value })}
              type="text"
              placeholder="Your email"
            />
          )}
          <input
            value={username}
            onChange={e => this.setState({ username: e.target.value })}
            type="text"
            placeholder="Your username address"
          />
          <input
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            type="password"
            placeholder="Choose a safe password"
          />
        </div>
        {this.state.error? <p>Mauvais Mot de passe ou username</p>:null}
        <div className="flex mt3">
            <Mutation
                mutation={login ?  GET_TOKEN: CREATE_USER}
                variables={login ? { username, password } : { username, password, email }}
                onError={()=> this._handleLoginError()}
                onCompleted={login? (data:any) => this._confirmLogIn(data): () => this._confirmSignIn() }
            >
                {(mutation:any) => (
                <Button className="pointer mr2 button" onClick={mutation}>
                    {login ? 'login' : 'create account'}
                </Button>
                )}

            </Mutation>

            {/* <Mutation
                mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
                variables={{ username, password, email }}
                onCompleted={(data:any) => this._confirm(data)}
            >
                {(mutation:any) => (
                <Button className="pointer mr2 button" onClick={mutation}>
                    {login ? 'login' : 'create account'}
                </Button>
                )}
            </Mutation> */}
            <Button
                className="pointer button"
                onClick={() => this.setState({ login: !login })}
            >
                {login ? 'need to create an account?' : 'already have an account?'}
            </Button>
        </div>
      </div>
    )
  }

  _handleLoginError = () => {
      console.log('error')
      this.setState(prevState => ({...prevState, error:true }))
  }

  _confirmSignIn = () => {
      console.log('You just signed In')
  }

  _confirmLogIn =  async (data:any) => {
    console.log(data.tokenAuth.token)
    const { token } = data.tokenAuth.token
    this._saveUserData(token)
    // this.props.history.push(`/`)
  }

  _saveUserData = (token:any) => {
    localStorage.setItem(AUTH_TOKEN, token)
  }
}

export default Login