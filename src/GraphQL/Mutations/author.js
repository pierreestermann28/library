
import {gql} from 'apollo-boost'

const CREATE_AUTHOR = gql`
    mutation ($firstName: String!, $lastName: String!, $email: String!){
        createAuthor(firstName: $firstName, lastName: $lastName, email: $email) {
            author {
                id
                lastName
            }
        }
    }
    `
const REMOVE_AUTHOR = gql`
    mutation ($id:Int!){
        deleteAuthor(id: $id){
        ok
        }
    }
`
const UPDATE_AUTHOR = gql`
mutation ($id:Int!, $email:String, $lastName:String, $firstName:String){
    updateAuthor (id: $id, email: $email, lastName: $lastName, firstName: $firstName) {
          author {
        email
        lastName
        firstName
      }    
    }
  }`
export {CREATE_AUTHOR, REMOVE_AUTHOR, UPDATE_AUTHOR}