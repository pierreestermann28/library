import React from 'react'
import {useQuery} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'
import {Spinner, Button} from 'reactstrap'
import Author from './Author'
import {Table, Container, Row, Col} from 'reactstrap'
import '../Styles/displayauthor.css'


const READ_AUTHORS = gql`
{
  authors{
    id
    firstName
    lastName
    email
  }
}`

function DisplayAuthor() {

    const {loading, error, data} = useQuery(READ_AUTHORS)
    if (loading) return (<div className="spinner"><Spinner color="primary" /></div>
                            )
    if (error) return <p>Error :(</p>

    const authors_data = data.authors
    const displayAuthors = authors_data.map((item : any, index:any) => <Author key={item.id.toString()} id={item.id} firstname={item.firstName} lastname={item.lastName} email={item.email} num={index+1}/>)
    return (
        <Container fluid="sm" className="table">
            <Table striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {displayAuthors}
                </tbody>

                
                
            </Table>
            
        </Container>
    )
}

export default DisplayAuthor


