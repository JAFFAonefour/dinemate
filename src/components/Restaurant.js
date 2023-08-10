import React, { useState } from 'react';
import { Button, Modal, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Restaurant({ restaurant }) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className='row bs '>
            <div className="col-md-4">
                <img src={restaurant.imageurls[0]} className='smallimg' />
            </div>
            <div className="col-md-7 text-left">

                <h4 style={{ fontSize: '30px', textTransform: 'uppercase' }}>{restaurant.name}</h4>
                
                    <p>category: {restaurant.category}</p>
                    <p>phone number: {restaurant.phonenumber}</p>
                    <p>description: {restaurant.description}</p>
                

                <div style={{ float: 'right' }}>


                    <Link to={`/book/${restaurant._id}`}>
                        <Button className='btn btn-primary m-2'>Book Now</Button>
                    </Link>


                    <button className='btn btn-primary' onClick={handleShow}>View Details</button>
                </div>
            </div>



            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header>
                    <Modal.Title>{restaurant.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Carousel prevLabel='' nextLabel=''>

                        {restaurant.imageurls.map(url => {

                            return <Carousel.Item>
                                <img
                                    className="d-block w-100 bigimg"
                                    src={url}
                                />
                            </Carousel.Item>

                        })}

                    </Carousel>

                    <div className='mt-4'>
                        <p><b>Category: </b>{restaurant.category}</p>
                        <p><b>Phone Number: </b>{restaurant.phonenumber}</p>
                        <p><b>Description: </b>{restaurant.description}</p>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default Restaurant