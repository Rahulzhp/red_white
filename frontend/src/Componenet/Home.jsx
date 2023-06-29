import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../Styles/Home.css"
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
    FormControl,
    FormLabel,
    Input,
    Textarea,
    useToast
} from '@chakra-ui/react'
import Navbar from "./Navbar";
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sort, setSort] = useState("")
    const [totalPages, setTotalPages] = useState(0);
    const toast = useToast()
    const navigate = useNavigate()
    const [currentPostId, setCurrentPostId] = useState("");
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0
    });
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const authrization = localStorage.getItem("token");
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevProject) => ({
            ...prevProject,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (sort !== "") {
            return sortData()
        }
        fetchData()
    }, [search, sort, currentPage]);

    const fetchData = (() => {
        axios.get(`http://localhost:8080/project?search=${search}&page=${currentPage}`, {
            headers: {
                'Authorization': authrization
            }
        })
            .then((res) => {
                console.log(res.data.totalPages)
                setData(res.data)
                setTotalPages(res.data.totalPages);
            })
            .catch((er) => {
                console.log(er)
            })
    })

    const handleedit = () => {
        // console.log("id", currentPostId)
        axios.patch(`http://localhost:8080/project/${currentPostId}`, formData, {
            headers: {
                'Authorization': authrization
            }
        })
            .then((res) => {
                if (res.data == "edited") {
                    toast({
                        title: 'Edited Successfully.',
                        description: "You have Edit your Content",
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                    })
                }
                console.log(res)
                onClose()
            })
            .catch((er) => {
                console.log(er)
            })

        setTimeout(() => {
            fetchData()
        }, 10)

    }
    const handleDelete = (id) => {
        console.log(id)
        axios.delete(`http://localhost:8080/project/${id}`, {
            headers: {
                'Authorization': authrization
            }
        })
            .then((res) => {
                if (res.data == "deleted") {
                    toast({
                        title: 'Deleted Successfully.',
                        description: "You have Deleted your Content",
                        status: 'success',
                        duration: 7000,
                        isClosable: true,
                    })
                }
                fetchData()


            })
            .catch((er) => {
                console.log(er)
            })


    }
    const changetologin = () => {
        navigate("/login")
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const sortData = () => {
        if (sort === "price-high") {
            axios.get(`http://localhost:8080/project/sort/high?search=${search}&page=${currentPage}`, {
                headers: {
                    'Authorization': authrization
                }
            })
                .then((res) => {
                    setData(res.data);
                    setTotalPages(res.data.totalPages);
                })
                .catch((er) => {
                    console.log(er)
                })
        }
        else if (sort === "price-low") {
            axios.get(`http://localhost:8080/project/sort/low?search=${search}&page=${currentPage}`, {
                headers: {
                    'Authorization': authrization
                }
            })
                .then((res) => {
                    setData(res.data);
                    setTotalPages(res.data.totalPages);
                })
                .catch((er) => {
                    console.log(er)
                })
        }
    }

    return (
        <>
            <div className="login-container">
                <div className='search-bar'>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className="sort-bar">
                        <label htmlFor="sort-select">Sort By:</label>
                        <select id="sort-select" onChange={(e) => setSort(e.target.value)}>
                            <option value="">None</option>
                            <option value="price-low">Price Low to High</option>
                            <option value="price-high">Price High to Low</option>
                        </select>
                    </div>
                </div>
                <div>
                    <h1>Red & White Private Limited</h1>
                </div>
                <div>
                    {
                        authrization ?

                            <div>
                                <div className="post-list-container">

                                    {data.data && data.data.map(product => (
                                        <div className="product" key={product._id}>
                                            <h3>{product.name}</h3>
                                            <p>{product.description}</p>
                                            <p className="price">${product.price}</p>
                                            <div className='Functionbtn'>
                                                <button id='utentbtn' onClick={() => {
                                                    onOpen(); setCurrentPostId(product._id)
                                                }}>Edit</button>
                                                <button id='dtentbtn' onClick={() => handleDelete(product._id)}>Delete</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="pagination">
                                    {currentPage > 1 && (
                                        <button onClick={() => handlePageChange(currentPage - 1)}>
                                            Previous
                                        </button>
                                    )}
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <button
                                            key={index + 1}
                                            className={currentPage === index + 1 ? 'active' : ''}
                                            onClick={() => handlePageChange(index + 1)}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                    {currentPage < totalPages && (
                                        <button onClick={() => handlePageChange(currentPage + 1)}>
                                            Next
                                        </button>
                                    )}
                                </div>
                            </div> : <div className='notauth'>
                                <p>To see all product detail</p>
                                <button onClick={changetologin} id="authbtn">Login</button>
                            </div>}
                </div>
                <Modal
                    initialFocusRef={initialRef}
                    finalFocusRef={finalRef}
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Edit Post</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Input ref={initialRef} name="name" value={formData.name} onChange={handleChange} placeholder='Enter Name' />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Description</FormLabel>
                                <Textarea name="description" value={formData.description} onChange={handleChange} placeholder='description' />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Price</FormLabel>
                                <Input name="price" value={formData.price} onChange={handleChange} placeholder='price' />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button onClick={handleedit} colorScheme='blue' mr={3}>
                                Save
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </div>
        </>
    )
}

export default Home