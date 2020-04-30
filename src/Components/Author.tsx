import React, {useState} from 'react'
import '../Styles/author.css'
import {Button,Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input} from 'reactstrap'
import { AvForm, AvField } from 'availity-reactstrap-validation'
import {useMutation} from '@apollo/react-hooks'
import {REMOVE_AUTHOR, UPDATE_AUTHOR} from '../GraphQL/Mutations/author'
import {READ_AUTHORS} from '../GraphQL/Queries/author'




interface AuthorProps {
    key: string,
    firstname: string,
    lastname?: string,
    email?: string,
    id: number,
    num:number,
}

function Author(props : AuthorProps) {
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    const[firstName,setFirstname] = useState(props.firstname)
    const[lastName,setLastName] = useState(props.lastname)
    const[email,setEmail] = useState(props.email)
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

    const [removeAuthor] = useMutation(REMOVE_AUTHOR)
    const [updateAuthor] = useMutation(UPDATE_AUTHOR)

    const handleDelete = (event:any) => {
        removeAuthor({
            variables: {
                id: props.id
            },
            refetchQueries: [{query: READ_AUTHORS}]
        })
    }

    const handleClick = () => {
        updateAuthor({
            variables : {
                id: props.id,
                firstName: firstName,
                lastName: lastName,
                email:email
            },
            refetchQueries: [{query:READ_AUTHORS}]
        })
        toggle()
    }

    const handleEdit = () => {
        toggle()
    }

    const handleInvalidSubmit = () => {
        console.log('erreur dans le formulaire')
    }
    

    return (
        <tr>
            <th scope="row">{props.num}</th>
            <td>{props.firstname}</td>
            <td>{props.lastname}</td>
            <td>{props.email}</td>
            <td>
                <Button color="success" onClick={handleEdit}>Edit</Button>
            </td>
            <td>
                <Button color="warning" onClick={handleDelete}>Delete</Button>
            </td>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Edit author number : {props.id}</ModalHeader>
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
        </tr>
        
    )
}

export default Author
