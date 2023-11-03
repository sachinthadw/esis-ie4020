import axios from '../config/axiosConfig';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import cinemahalls from '../../Assets/Images/cinemahalls.jpg';
import movie from '../../Assets/Images/movie.jpg';
import showing from '../../Assets/Images/showing.jpg';
import tickes from '../../Assets/Images/tickes.jpg';
import users from '../../Assets/Images/users.jpg';
import cate from '../../Assets/Images/cate.jpg';
import NavBar_Admin from '../Home/NavBar_Admin';
function AdminDashboard(props) {
    const admin = JSON.parse(localStorage.getItem("admin"))
    const [count, setcount] = useState()

    useEffect(() => {
        axios.get('http://localhost:8070/show/analytic').then((data) => {
            setcount(data.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    return (
        <>
            {localStorage.getItem('atoken') ? (
                <>
                    <NavBar_Admin />

                    <section className="hero is-fullheight-with-navbar admin-div-home ">
                        <div className="hero-body">
                            <div className="container is-fluid">
                                <div className='title is-2 has-text-white has-text-centered'>Admin Dashboard</div>
                                <div className='columns addash is-multiline is-justify-content-center'>
                                    <div class="column is-4">
                                        <div className='card m-5'>
                                            <Link to='/allshow'>
                                                <div class="">
                                                    <div class="p-6 is-flex is-justify-content-space-between">
                                                        <h6 class="m-b-20">Shows Ongoing</h6>
                                                        <p class="m-b-0"><span class="f-right">{count?.scount}</span></p>
                                                        <span><i class="fa fa-ticket f-left"></i></span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <img src={showing}></img>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>


                                    <div class="column is-4" >
                                        <div className='card m-5' style={{ background: 'linear-gradient(45deg, #4099ff, #73b4ff)' }}>
                                            <Link to='/allmovies'>
                                                <div class="" >
                                                    <div class="p-6 is-flex is-justify-content-space-between">
                                                        <h6 class="m-b-20">Movies</h6>
                                                        <p class="m-b-0"><span class="f-right">{count?.mcount}</span></p>
                                                        <span><i class="fa fa-film f-left"></i></span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <img src={movie}></img>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>


                                    <div class="column is-4">
                                        <div className='card m-5' style={{ background: 'linear-gradient(45deg, #2ed8b6, #59e0c5)' }} >
                                            <Link to="/allhalls">
                                                <div class="">
                                                    <div class="p-6 is-flex is-justify-content-space-between">
                                                        <h6 class="m-b-20">Movie Halls</h6>
                                                        <p class="m-b-0"><span class="f-right">{count?.hcount}</span></p>
                                                        <span><i class="fa fa-video-camera f-left"></i></span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <img src={cinemahalls}></img>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>


                                    <div class="column is-4">
                                        <div className='card m-5' style={{ background: 'linear-gradient(45deg, #2ed8b6, #59e0c5)' }} >
                                            <Link to="/allcategory">
                                                <div class="">
                                                    <div class="p-6 is-flex is-justify-content-space-between">
                                                        <h6 class="m-b-20">Categories</h6>
                                                        <p class="m-b-0"><span class="f-right">{count?.ccount}</span></p>
                                                        <span><i class="fa fa-video-camera f-left"></i></span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <img src={cate}></img>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>


                                    {admin.type === "sa" ? <>
                                        <div className='column is-4'>
                                            <div className='card m-5' style={{ background: 'linear-gradient(45deg, #FFB64D, #ffcb80)' }}>
                                                <Link to="/users">
                                                    <div class="">
                                                        <div class="p-6 is-flex is-justify-content-space-between">
                                                            <h6 class="m-b-20">Users</h6>
                                                            <p class="m-b-0"><span class="f-right">{count?.ucount - 1}</span></p>
                                                            <span><i class="fa fa-user f-left"></i></span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <img src={users}></img>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>

                                    </> : <></>}

                                    {admin.type === "sa" ? <>
                                        <div className='column is-4'>
                                            <div className='card m-5' style={{ background: 'linear-gradient(45deg, #FF5370, #ff869a)' }}>
                                                <Link to="/bookings">
                                                    <div class="">
                                                        <div class="p-6 is-flex is-justify-content-space-between">
                                                            <h6 class="m-b-20">Bookings</h6>
                                                            <p class="m-b-0"><span class="f-right">{count?.bcount}</span></p>
                                                            <span><i class="fa fa-cart-arrow-down f-left"></i></span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <img src={tickes}></img>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>

                                    </> : <></>}

                                </div>
                            </div >
                        </div>
                    </section>
                </>
            ) : (
                window.location = "/"
            )}
        </>
    );
}

export default AdminDashboard;