import React, { useState } from "react";
import axios from '../config/axiosConfig';
import { Link } from "react-router-dom";


const AdminLogin = () => {




    const [userName, setuserName] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [test, setTest] = useState(false)
    const [type, settype] = useState('')
    const [userId, setUserId] = useState('')


    function sendData(e) {
        e.preventDefault();
        const newUser = {
            //userName:userName,
            email: email,
            password,
            type

        };

        axios
            .post('http://localhost:8070/user/login', newUser)
            .then((res) => {
                if (res.status !== 200) {
                    console.log(res)

                }
                localStorage.setItem("admin", JSON.stringify(res.data.user))
                localStorage.setItem("atoken", res.data.token)

                console.log(res.data.token)
                setUserId(res.data.user._id)
                console.log(userId)
                setTest(!test)

                window.location.href = '/dashboard'

            })
            .catch((err) => {
                alert("Email or Password is worng");
                console.log(err)
            });
    }





    return (
        <>
            <div className='home-div'> </div>

            <section className="hero is-fullheight-with-navbar all-home-flexs">

                <div className="hero-body" style={{ padding: '3rem 0.5rem' }}>
                    <div className="container is-widescreen">
                        <div className='content'>
                            <div className="columns is-justify-content-center">
                                <div className="column is-3">
                                    <h2 className="subtitle is-2 is-semibold has-text-white has-text-centered">Admin Login</h2>
                                    <form onSubmit={sendData}>
                                        <div className="control has-text-white has-text-centered mb-4">
                                            <label className="radio" >
                                                <input type="radio" required value="ma" name="rad" onChange={(e) => { settype(e.target.value) }} />
                                                Movie Admin
                                            </label>
                                            <label className="radio">
                                                <input type="radio" required value="sa" name="rad" onChange={(e) => { settype(e.target.value) }} />
                                                System Admin
                                            </label>
                                        </div>
                                        <div className="mb-3">
                                            <input type="email" className="input is-primary" placeholder="Email Address" onChange={(e) => { setemail(e.target.value) }} aria-label="Username" aria-describedby="basic-addon1" required />
                                        </div>
                                        <div className="mb-3">
                                            <input type="password" className="input is-primary" placeholder="Password" onChange={(e) => { setpassword(e.target.value) }} aria-label="Password" aria-describedby="basic-addon1" required />
                                        </div>
                                        <div className="">
                                            <button type="submit" className="button is-link is-fullwidth">Login</button>
                                            <Link to='/'> <button type="submit" className="button is-success is-fullwidth mt-2">Back to Home Page</button></Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default AdminLogin;
