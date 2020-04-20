import React, { useState } from 'react'
import '../Styles/createauthor.css'
import {useMutation} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'
import { AvForm, AvField } from 'availity-reactstrap-validation'
import {Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input} from 'reactstrap'

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

const READ_AUTHORS = gql`
    {
      authors{
        id
        firstName
        lastName
        email
      }
    }`
    


function CreateAuthor() {

    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    const[firstName,setFirstname] = useState("")
    const[lastName,setLastName] = useState("")
    const[email,setEmail] = useState("")
    const [addAuthor, {data}] = useMutation(CREATE_AUTHOR)

    const handleChange = (event:any) => {
        const {name, value} = event.target
        if(name==="firstName"){
            setFirstname(value)
        }
        else if(name==="lastName"){
            setLastName(value)
        }
        else {
            setEmail(value)
        }
    }

    const handleClick = () => {
        addAuthor({
            variables : {
                firstName: firstName,
                lastName: lastName,
                email:email
            },
            refetchQueries: [{query:READ_AUTHORS}]
        })
        toggle()
    }

    const handleInvalidSubmit = () => console.log('erreur dans le formulaire')

    return (
        <Container className="create">
            <Row>
                <Col>
                    <Button color="secondary" className="button" onClick={toggle}>Add Record</Button>
                </Col>
            </Row>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Creation of new author</ModalHeader>
                <ModalBody>
                    <AvForm onValidSubmit={handleClick} onInvalidSubmit={handleInvalidSubmit}>
                        <FormGroup>
                            <Label for="firstName">First Name</Label>
                            <Input
                            name="firstName"
                            id="firstName"
                            placeholder="first name"
                            value={firstName}
                            onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="lastName">Last Name</Label>
                            <Input
                            name="lastName"
                            id="lastName"
                            placeholder="last name"
                            value={lastName}
                            onChange={handleChange}
                            />
                        </FormGroup>

                      
                        <AvField 
                        label="Email"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="email"
                        value={email}
                        onChange={handleChange}
                        />
                        
                        <Button color="primary" >Create</Button>{' '}
                        
                    </AvForm>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>

            </Modal>
          
        </Container>
    )
}

export default CreateAuthor
