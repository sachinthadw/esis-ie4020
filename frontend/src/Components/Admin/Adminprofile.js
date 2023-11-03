import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../config/axiosConfig';
import NavBar_Admin from '../Home/NavBar_Admin';


function Adminprofile(props) {



    const [currentUser, setcurrentUser] = useState("")

    const token = localStorage.getItem("atoken");
    const users = JSON.parse(localStorage.getItem("admin"));
    console.log(users)
    const userId = users._id;

    useEffect(() => {
        const token = localStorage.getItem("atoken");
        try {
            axios({
                method: "get",
                baseURL: `http://localhost:8070/user/getuser/${userId}`,
                headers: {
                    Authorization: "Bearer " + token
                },
            }).then(res => {
                setcurrentUser(res.data.user)
                console.log(res.data)
            })
        } catch (err) {
            throw err;
        }
    }, [])

    return (
        <>
            {localStorage.getItem('atoken') ? (
                <>
                    <NavBar_Admin />

                    <section className="hero is-fullheight-with-navbar movie-div ">
                        <div className="hero-body" style={{ padding: '3rem 0.5rem' }}>
                            <div className="container is-widescreen">
                                <div className='columns is-justify-content-center'>
                                    <div className='column is-6'>
                                        <div className="card" style={{ backgroundColor: '#fff6', borderRadius: '10px' }}>
                                            <div className='title is-3 has-text-info-dark has-text-centered has-background-info-light pb-3 pt-2' style={{ borderRadius: '10px' }}>
                                                <b>My Profile</b>
                                            </div>
                                            <form >
                                                <div className="field has-addons m-3 pt-3">
                                                    <div className="control is-expanded">
                                                        <div className="is-fullwidth">
                                                            <input type="text" className="input" value={currentUser.name} placeholder="name" disabled />
                                                        </div>
                                                    </div>
                                                    <div className="button control is-static">
                                                        <span className="icon is-left">
                                                            <i className="fa fa-user-circle-o"></i>
                                                        </span>
                                                        <div type="submit" className=" is-primary is-static mr-6 pr-1">Name</div>
                                                    </div>
                                                </div>
                                                <div className="field has-addons m-3 pt-3">
                                                    <div className="control is-expanded">
                                                        <div className="is-fullwidth">
                                                            <input type="email" className="input" value={currentUser.email} placeholder="Email" disabled />
                                                        </div>
                                                    </div>
                                                    <div className="button control is-static">
                                                        <span className="icon is-left">
                                                            <i className="fa fa-envelope"></i>
                                                        </span>
                                                        <div type="submit" className=" is-primary is-static mr-6 pr-2">Email</div>
                                                    </div>
                                                </div>
                                                <div className="field has-addons m-3 pt-3">
                                                    <div className="control is-expanded">
                                                        <div className="is-fullwidth">
                                                            <input type="text" className="input" value={currentUser.userName} placeholder="User Name" disabled />
                                                        </div>
                                                    </div>
                                                    <div className="button control is-static">
                                                        <span className="icon is-left">
                                                            <i className="fa fa-user"></i>
                                                        </span>
                                                        <div type="submit" className=" is-primary is-static mr-3 pr-1">User Name</div>
                                                    </div>
                                                </div>
                                                <div className="field has-addons m-3 pt-3">
                                                    <div className="control is-expanded">
                                                        <div className="is-fullwidth">
                                                            <input type="password" className="input" value={currentUser.password} placeholder="Password" disabled />
                                                        </div>
                                                    </div>
                                                    <div className="button control is-static">
                                                        <span className="icon is-left">
                                                            <i className="fa fa-lock"></i>
                                                        </span>
                                                        <div type="submit" className=" is-primary is-static mr-5 pr-1">Password</div>
                                                    </div>
                                                </div>
                                                <div className=" has-background-info-light pt-1 pb-2">
                                                    <div className=" mt-5 mr-3 ml-3 pb-3 ">
                                                        <Link to='/dashboard'><button className="button is-link is-light is-fullwidth mb-2" type='submit' value="Create" >Back to Dashboard</button></Link>
                                                        <Link to={"/adedit/" + currentUser._id}><button className="button is-info is-fullwidth " type='submit' value="Create" >Edit Profile</button></Link>
                                                    </div>
                                                </div>

                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            ) : (
                window.location = "/"
            )}
        </>
    );
}

export default Adminprofile;