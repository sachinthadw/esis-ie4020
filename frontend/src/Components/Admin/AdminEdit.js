import React, { useEffect, useState } from 'react';
import axios from '../config/axiosConfig';
import { Link, useParams } from 'react-router-dom';
import NavBar_Admin from '../Home/NavBar_Admin';


function AdminEdit(props) {
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [userName, setuserName] = useState("")
    const [password, setpassword] = useState("")
    const [confpassword, setconfpassword] = useState("")
    const params = useParams()
    const token = localStorage.getItem("atoken");
    const user = localStorage.getItem("admin");
    const userId = user._id;
    useEffect(() => {
        getData()
    }, [])
    //get data from profile page
    function getData() {
        axios({
            method: "get",
            baseURL: `http://localhost:8070/user/getuser/${props.match.params.id}`,
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .then((res) => {
                setname(res.data.user.name)
                setemail(res.data.user.email)
                setuserName(res.data.user.userName)
                setpassword(res.data.user.password)
                setconfpassword(res.data.user.password)
            }).catch((err) => {
                alert(err.message);
            })
        console.log(params.id)

    }


    //send to updated data to 
    function sendData(e) {
        e.preventDefault();
        if (confpassword === password) {

        }
        else {
            return (alert("Password Doesn't match"))
        }
        const newUser = {
            name,
            email,
            userName,
            password
        };




        axios({
            method: "put",
            baseURL: `http://localhost:8070/user/update/${props.match.params.id}`,
            data: newUser,
            headers: {
                Authorization: "Bearer " + token
            }
        })

            .then(() => {
                alert('User Updated, Click ok');
                window.location.href = '/aprofile'

            })
            .catch((err) => {
                alert(err);
            });
    }

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
                                            <div className='title is-3 has-text-warning-dark has-text-centered has-background-warning-light pb-3 pt-2' style={{ borderRadius: '10px' }}>
                                                <b>Edit Profile</b>
                                            </div>
                                            <form onSubmit={sendData} >
                                                <div className="field has-addons m-3 pt-3">
                                                    <div className="control is-expanded">
                                                        <div className="is-fullwidth">
                                                            <input type="text" className="input" value={name} placeholder="name" onChange={(e) => { setname(e.target.value) }} />
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
                                                            <input type="email" className="input" value={email} placeholder="Email" onChange={(e) => { setemail(e.target.value) }} />
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
                                                            <input type="text" className="input" value={userName} placeholder="User Name" onChange={(e) => { setuserName(e.target.value) }} />
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
                                                            <input type="password" className="input" value={password} placeholder="Password" onChange={(e) => { setpassword(e.target.value) }} />
                                                        </div>
                                                    </div>
                                                    <div className="button control is-static">
                                                        <span className="icon is-left">
                                                            <i className="fa fa-lock"></i>
                                                        </span>
                                                        <div type="submit" className=" is-primary is-static mr-5 pr-1">Password</div>
                                                    </div>
                                                </div>
                                                <div className="field has-addons m-3 pt-3">
                                                    <div className="control is-expanded">
                                                        <div className="is-fullwidth">
                                                            <input type="password" className="input" value={confpassword} placeholder="Password" onChange={(e) => { setconfpassword(e.target.value) }} />
                                                        </div>
                                                    </div>
                                                    <div className="button control is-static">
                                                        <span className="icon is-left">
                                                            <i className="fa fa-lock"></i>
                                                        </span>
                                                        <div type="submit" className=" is-primary is-static mr-5 pr-1">Confirm Password</div>
                                                    </div>
                                                </div>
                                                <div className=" has-background-info-light pt-1 pb-2">
                                                    <div className=" mt-5 mr-3 ml-3 pb-3 ">
                                                        <Link to='/aprofile'><button className="button is-link is-light is-fullwidth mb-2" type='submit' value="Create" >Back to profile</button></Link>
                                                        <button className="button is-warning is-fullwidth " type='submit' value="Create" >Save Profile</button>
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

export default AdminEdit;