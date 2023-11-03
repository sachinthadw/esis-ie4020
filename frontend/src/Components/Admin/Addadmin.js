import axios from '../config/axiosConfig';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function Addadmin(props) {
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [userName, setuserName] = useState("")
    const [password, setpassword] = useState("")
    const [confpassword, setconfpassword] = useState("")
    const [users, setUsers] = useState([])
    useEffect(() => {

    }, [])




    function sendData(e) {
        e.preventDefault();

        if (confpassword === password) {

        }
        else {
            return (alert("Password Doesn't match"))
        }
        const type = "ma";
        const newUser = {
            name,
            email,
            userName,
            password,
            type
        };

        axios
            .post('http://localhost:8070/user/signup', newUser)
            .then(() => {
                alert('admin Create Successfully ');
                setemail('');
                setname('');
                setuserName('');
                setpassword('');
                setconfpassword('');
                window.location.href = '/users'
            })
            .catch((err) => {
                alert("Email Already Exists");
                console.log(err)
            });
    }

    return (
        <>
            <div className='home-div'> </div>

            <section className="hero is-fullheight-with-navbar all-home-flexs">

                <div className="hero-body" style={{ padding: '3rem 0.5rem' }}>
                    <div className="container is-widescreen">
                        <div className='content '>
                            <div className='columns is-justify-content-center'>
                                <div className='column is-3'>
                                    <h2 className="subtitle is-2 is-semibold has-text-white has-text-centered">Create Movie Admin</h2>
                                    <form onSubmit={sendData}>
                                        <div className="mb-3">
                                            <input type="text" className="input is-primary" placeholder="Full Name" onChange={(e) => { setname(e.target.value) }} aria-describedby="basic-addon1" required />
                                        </div>
                                        <div className="mb-3">
                                            <input type="email" className="input is-primary" placeholder="Email" onChange={(e) => { setemail(e.target.value) }} aria-describedby="basic-addon1" required />
                                        </div>
                                        <div className="mb-3">
                                            <input type="text" className="input is-primary" placeholder="Username" onChange={(e) => { setuserName(e.target.value) }} aria-describedby="basic-addon1" required />
                                        </div>
                                        <div className="mb-3">
                                            <input type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" className="input is-primary" placeholder="Password" onChange={(e) => { setpassword(e.target.value) }} aria-describedby="basic-addon1" required />
                                        </div>
                                        <div className="mb-3">
                                            <input type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" className="input is-primary" placeholder="Confirm Password" onChange={(e) => { setconfpassword(e.target.value) }} aria-describedby="basic-addon1" required />
                                        </div>
                                        {/* <PasswordChecklist
          rules={["minLength", "specialChar", "number", "capital", "match"]}
          minLength={5}
          value={password}
          valueAgain={confpassword}
          onChange={(isValid) => { }}
        /> */}



                                        <div>
                                            <input type="submit" value="Create Admin" className="button is-link is-fullwidth" />

                                            <Link to='/users'> <button type="submit" className="button is-success is-fullwidth mt-2">Back to List</button></Link>
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

export default Addadmin;