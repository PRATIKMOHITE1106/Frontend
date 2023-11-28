import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import CommonHeader from './CommonHeader';
import { LoginContext } from './user/LoginContext';

const Signup = () => {
    const { SignupMsg, setSignupMsg } = useContext(LoginContext);

    //form handler
    const [data, setdata] = useState({});
    const handleForm = (e) => {
        postdatatoServer(data)
        e.preventDefault();
    }

    let history = useHistory();

    //post data to server
    const postdatatoServer = (data) => {
        axios.post(`http://localhost:7076/signup`, data).then(
            (Response) => {
                setdata(Response.data)
                if (Response.data === "Registration Done") {
                    setSignupMsg({ ...SignupMsg, msg: "Registration Successfull.", type: "alert alert-success text-center" });
                    history.push("/login");
                }
            }, (error) => {
                console.log(error);
                alert("Something went wrong")
            }
        );
    }
    const [Terms, setTerms] = useState(false);
    const DisplayTerms = Terms ? "DisplayTerms" : 'display_Go';

    return (
        <>
            <CommonHeader /><br /><br />
            <div className=" p-5">
                <div id="login-row"
                    className="row justify-content-center align-items-center">
                    <div id="login-column" className="col-md-12 pt-5">
                        <div id="login-box" className="col-md-12 p-4">
                            <br /><br />

                            <div className="row ">
                                <div className="col ">
                                    <div className="row ">
                                        <img src='./uploads/default-img/SignUpPage.png' alt="" className='' />

                                    </div>
                                </div>
                                <div className="col ">
                                    <div className="row ">
                                        <form className="bg-white p-4 form" onSubmit={handleForm}>

                                            <h3 className="text-center text-info">Signup</h3>

                                            <div className="row ">

                                                <FloatingLabel label="First Name" className='text-info p-2 col-md-6'>
                                                    <Form.Control input type="text" placeholder="First Name"
                                                        name="firstName"
                                                        onChange={(e) => { setdata({ ...data, firstName: e.target.value }) }} required />
                                                </FloatingLabel>

                                                <FloatingLabel label="Last Name" className='text-info p-2 col-md-6'>
                                                    <Form.Control input type="text" placeholder="Last Name"
                                                        name="lastName"
                                                        onChange={(e) => { setdata({ ...data, lastName: e.target.value }) }} required />

                                                </FloatingLabel>
                                            </div>
                                            <br />

                                            <FloatingLabel label="Phone" className='text-info'>
                                                <Form.Control input type="phone" placeholder="Phone"
                                                    name="mobileNo"
                                                    onChange={(e) => { setdata({ ...data, mobileNo: e.target.value }) }} required />
                                            </FloatingLabel>
                                            <br />

                                            <FloatingLabel label="Email" className='text-info'>
                                                <Form.Control input type="email" placeholder="Email"
                                                    name="email"
                                                    onChange={(e) => { setdata({ ...data, email: e.target.value }) }} required />
                                            </FloatingLabel>
                                            <br />

                                            <FloatingLabel label="Password" className='text-info'>
                                                <Form.Control input type="password" placeholder="Password"
                                                    name="password"
                                                    onChange={(e) => { setdata({ ...data, password: e.target.value, role: "admin" }) }} required />
                                            </FloatingLabel>
                                            <br />

                                            <div className="form-group">
                                                <label for="remember-me" className="text-info"><span><input id="remember-me" name="remember-me"
                                                    type="checkbox" required /></span>
                                                    <span> I Agree to <span onClick={() => { setTerms(!Terms) }} className='cursorPtr'><u>terms and condition</u></span></span>
                                                </label><br /><br />
                                                <div className={DisplayTerms} >
                                                    <div className='text-right pb-2'>
                                                        <button className="btn btn-danger" onClick={() => { setTerms(!Terms) }}>X</button>
                                                    </div>
                                                    <div className='DisplayTermsAndCond'>
                                                        <p>These E-commerce terms of service (this "Agreement") are entered into by E-commerce and
                                                            the entity or person agreeing to this Agreement ("you” or “your”) and govern your access
                                                            to and use of our products. "E-commerce" has the meaning given here and “we” or “us” means
                                                            E-commerce. This Agreement is effective when you click to accept it (the "Effective Date").
                                                            If you are accepting on behalf of a website, you represent and warrant that (i) you have full
                                                            legal authority to bind that website to this Agreement; (ii) you have read and understand
                                                            this Agreement; and (iii) you agree, on behalf of that website, to this Agreement. Definitions
                                                            of capitalised terms are in Schedule 1.</p>

                                                        <p> We take our responsibilities and obligations in respect of your data extremely seriously, and
                                                            you can find out more information about our approach to privacy and data protection when you are
                                                            using our website here and when you purchase and use our Products in our Data Processing Agreement
                                                            here which is updated periodically and which is incorporated into this Agreement by reference.
                                                            If you purchase any products from us then additional terms apply, which can be found here .</p>

                                                        <p>REGISTRATION AND PLACING ORDER</p>
                                                        <p>1) In order to access and use the App you shall be required to purchase a Subscription by submitting
                                                            an Order to us (via the Website or by email). By submitting your Order, you consent to us conducting
                                                            verification and security procedures in respect of the information provided in the Order.</p>
                                                        <p>2) Upon the submission of the Order you will have the option to (i) Account Verification in account section
                                                             and (ii) Home section of website where you find all our products</p>
                                                        <p>3) On adding products to cart you are placing an order if your account is verified then only you will 
                                                            eligible for placing order.
                                                        </p>
                                                    </div>
                                                    </div>
                                                </div>
                                             <br />
                                            <div className="container text-center">
                                                <Button type="Reset" name="Reset" className="btn btn-warning btn-md m-2"> Reset </Button>
                                                <Button input type="Submit" name="Submit" className="btn btn-info btn-md m-2" > Submit </Button>

                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup