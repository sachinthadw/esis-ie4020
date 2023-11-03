import React, { useEffect, useState } from 'react';
import axios from '../config/axiosConfig';
import NavBar_Admin from '../Home/NavBar_Admin';
import { Link } from 'react-router-dom';
function Allusers(props) {
    const [nusers, setnusers] = useState([])
    const [ausers, setausers] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8070/user/all').then((data) => {
            setnusers(data.data.nusers)
            setausers(data.data.ausers)
        }).catch((err) => {

        })
    }, [nusers, ausers])

    const deleteconfirm = (id) => {

        const confirmBox = window.confirm(
            "All The bookings related to that User will be Deleted"
        )
        if (confirmBox === true) {
            deletefunction(id)
        }
    }
    const deleteconfirmadmin = (id) => {

        const confirmBox = window.confirm(
            "Are you sure"
        )
        if (confirmBox === true) {
            deletefunction(id)
        }
    }



    const deletefunction = (id) => {
        axios.delete(`http://localhost:8070/user/delete/${id}`).then((dat) => {

        })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <>
            {localStorage.getItem('atoken') ? (
                <>

                    <NavBar_Admin />
                    <section className="hero is-fullheight-with-navbar admin-div-home ">
                        <div className="hero-body">
                            <div className='container is-fluid'>
                                <div className='title is-2 has-text-white has-text-centered'>All Users</div><br />

                                <div className=''>
                                    <div className=''>
                                        <h2 className='title is-4 has-text-centered'>Customers</h2>
                                        <div className='is-flex is-right is-justify-content-end mb-3'>
                                            <Link to="/adduser"><a className='button is-danger'>Add User<i class="fa fa-user ml-2" aria-hidden="true"></i></a></Link>
                                        </div>
                                        <table className="table is-bordered is-fullwidth">
                                            <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>UserName</th>
                                                <th style={{ width: '05%' }}>Action</th>

                                            </tr>

                                            {nusers?.map((us, i) => (
                                                <tr>
                                                    <td>{us.name}</td>
                                                    <td>{us.email}</td>
                                                    <td>{us.userName}</td>
                                                    <th><a className='button is-danger' onClick={(e) => { deleteconfirm(us._id) }}><i class="fa fa-trash-o" aria-hidden="true"></i></a></th>

                                                </tr>
                                            ))}
                                        </table>


                                        <h2 className='title is-4 has-text-centered'>Movie Admins</h2>

                                        <div className='is-flex is-right is-justify-content-end mb-3'>
                                            <Link to="/addadmin"><a className='button is-danger'>Add Movie Admin<i class="fa fa-user ml-2" aria-hidden="true"></i></a></Link>
                                        </div>

                                        <table className="table is-bordered is-fullwidth">
                                            <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>UserName</th>
                                                <th style={{ width: '05%' }}>Action</th>
                                            </tr>

                                            {ausers?.map((us, i) => (
                                                <tr>
                                                    <td>{us.name}</td>
                                                    <td>{us.email}</td>
                                                    <td>{us.userName}</td>
                                                    <th><a className='button is-danger' onClick={(e) => { deleteconfirmadmin(us._id) }}><i class="fa fa-trash-o" aria-hidden="true"></i></a></th>
                                                </tr>
                                            ))}
                                        </table>
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

export default Allusers;