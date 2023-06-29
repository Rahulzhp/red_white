import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/CreatePost.css'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Text,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    useToast
} from '@chakra-ui/react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const CreatePost = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: ""
    });


    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        setFormData((prevProject) => ({
            ...prevProject,
            [name]: value,
        }));
    };
    const authrization = localStorage.getItem("token");
    useEffect(() => {
        if (!authrization) {
            onOpen()
        }
    })
    const handleSubmit = async e => {
        e.preventDefault();
        axios.post('http://localhost:8080/project/', formData, {
            headers: {
                'Authorization': authrization
            }
        })
            .then((res) => {
                console.log(res)
                setFormData({
                    name: '',
                    description: '',
                    price: ""
                });
                if (res.data == "posted") {
                    toast({
                        title: 'Posted Successfully.',
                        description: "You have Posted your Content",
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                    })
                }
            })
            .catch((er) => {
                console.log(er);
            })
    }
    const handlelogin = () => {
        navigate("/login")
    }


    return (
        <>

            <div className='container'>
                {
                    authrization ?
                        <div className="create-post-container">
                            <h4>Create Post</h4>

                            <div className='form-container'>
                                <form onSubmit={handleSubmit}>
                                    <label>Name</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
                                    <label>Description</label>
                                    <textarea name="description" value={formData.description} onChange={handleChange} placeholder="description" required />
                                    <label>Price</label>
                                    <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />
                                    <button type="submit">Create Post</button>
                                </form>
                            </div>
                        </div> : <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Need To Login First</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody pb={6}>
                                    <Text>You are not Authorized to explore This page</Text>
                                </ModalBody>

                                <ModalFooter>
                                    <Button onClick={handlelogin} colorScheme='blue' mr={3}>
                                        Login
                                    </Button>
                                    <Button onClick={onClose}>Cancel</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>}
            </div>
        </>
    );
}

export default CreatePost;
