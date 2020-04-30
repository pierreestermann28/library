import {gql} from 'apollo-boost'

const READ_AUTHORS = gql`
    {
      authors{
        id
        firstName
        lastName
        email
      }
    }`
    

export {READ_AUTHORS}