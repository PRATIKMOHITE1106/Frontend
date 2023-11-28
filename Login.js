import axios from 'axios'
import React, { useContext, useState } from 'react'
import { LoginContext } from './user/LoginContext'
import { useHistory } from 'react-router-dom'
import CommonHeader from './CommonHeader'


const Login = () => {

    const {
        setLoggedIn, setEmail, setVerified,
        setName, setLastN, setMob, setId,
        setPass, setAddr, setPinC,
        setuserImg, SignupMsg } = useContext(LoginContext);

    let history = useHistory();

    const [Msg, setMsg] = useState();

    //form handler
    const [eId, setEId] = useState();
    const [passw, setPassw] = useState();
    const [data, setdata] = useState({});
    const handleForm = (e) => {
        getdatatoServer()
        e.preventDefault();
    }

    //post data to server
    const getdatatoServer = () => {
        axios.get(`http://localhost:7076/login/${eId}/${passw}`).then(
            (Response) => {

                setLoggedIn(true);
                setEmail(Response.data.email);
                setName(Response.data.firstName);
                setPass(Response.data.password);
                setLastN(Response.data.lastName);
                setId(Response.data.id);
                setAddr(Response.data.address);
                setMob(Response.data.mobileNo);
                setVerified(Response.data.verified);
                setdata(Response.data);
                if (Response.data.userImg != null) {
                    setuserImg(Response.data.userImg);
                }
                if (Response.data.pinCode !=0 0) {
                    setPinC(Response.data.pinCode);
                }
                if (Response.data.role === "cust") {
                    history.push("/admincustomer");
                } else if (Response.data.role === "cust") {
                    history.push("/userprofile");
                } else {
                    setMsg({ ...Msg, msg: "Invalid Email Or Password", type: "alert alert-danger text-center" });
                }
            }, (error) => {
                setMsg({ ...Msg, msg: "Something went wrong, Try Again. ", type: "alert alert-danger text-center" });
            }
        );
    }

    // const [Terms, setTerms] = useState(false);
    // const DisplayTerms = Terms ? "DisplayTerms" : 'display_Go';

    return (
        <>

            <CommonHeader /><br /><br />

            <div className="justify-content-center align-items-center p-5">

                <div id="login-row"
                    className="row justify-content-center align-items-center">
                    <div id="login-column" className="col-md-10 pt-5">
                        <div id="login-box" className="col-md-12 p-4"><br />
                            {Msg != null ? (<div class={Msg.type}>{Msg.msg} </div>) : ''}
                            {SignupMsg != null ? (<div class={SignupMsg.type}>{SignupMsg.msg} </div>) : ''}
                            <br /><br />

                            <div className="row ">
                                <div className="col ">
                                    <div className="row ">
                                        <img src='./uploads/default-img/LoginPage.png' alt="" className='Login_Page_Img' />
                                    </div>
                                </div>
                                <div className="col ">
                                    <div className="row ">
                                        <form id="login-form" className="form p-5" onSubmit={handleForm}>

                                            <h3 className="text-center text-info">Login</h3>

                                            <div className="form-group">
                                                <label for="username" className="text-info">User Email:</label><br />
                                                <input type="email" id="username"
                                                    className="form-control"
                                                    name="email"
                                                    onChange={(e) => { setEId(e.target.value) }} required />
                                            </div>
                                            <br />
                                            <div className="form-group">
                                                <label for="password" className="text-info">Password:</label><br />
                                                <input type="password" name="password" id="password"
                                                    className="form-control"
                                                    onChange={(e) => { setPassw(e.target.value) }} required />
                                            </div>

                                            <br />
                                            {/* <div className="form-group">
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
                                                </div> */}
                                                <br /> <input type="submit"
                                                    name="submit" className="btn btn-info btn-md" value="LOGIN" />
                                            {/* </div> */}
                                            <div id="register-link" className="text-right m-2">
                                                <a href="/signup" className="text-info">Signup here</a>
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

export default Login