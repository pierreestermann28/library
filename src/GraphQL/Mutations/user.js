import gql from 'graphql-tag'


const VERYFY_TOKEN = gql`
mutation SignupMutation($email: String!, $password: String!, $name: String!) {
  signup(email: $email, password: $password, name: $name) {
    token
  }
}
`

const CREATE_USER = gql `
mutation( $username: String!, $password: String!, $email:String!) {
  createUser(username:$username, password:$password, email:$email){
    user {
      username
    }
  }
}
`


const GET_TOKEN = gql `
mutation( $username: String!, $password: String!) {
  tokenAuth(username:$username, password:$password){
    token
  }
}
`


const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`


const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`



export {SIGNUP_MUTATION, LOGIN_MUTATION, GET_TOKEN, VERYFY_TOKEN, CREATE_USER}