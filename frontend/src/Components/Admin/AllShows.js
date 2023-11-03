import axios from '../config/axiosConfig';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar_Admin from '../Home/NavBar_Admin';

function AllShows(props) {

    const [shows, setshows] = useState([])

    const gettime = (id) => {
        if (id === 1) {
            return "10.00am - 1.00pm"
        }
        else if (id === 2) {
            return "1.00pm - 4.00pm"
        }
        else {
            return "4.00pm - 7.00pm"
        }
    }

    useEffect(() => {
        axios.get('http://localhost:8070/show/all').then((data) => {
            setshows(data.data)
        }).catch((err) => {

        })
    }, [shows])

    const deleteconfirm = (id) => {

        const confirmBox = window.confirm(
            "All The bookings related to that show will be Deleted"
        )
        if (confirmBox === true) {
            deletefunction(id)
        }
    }


    const deletefunction = (id) => {
        axios.delete(`http://localhost:8070/show/delete/${id}`).then((dat) => {

        }).
            catch((err) => {
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
                            <div className="container is-fluid">
                                <div className='title is-2 has-text-white has-text-centered'>All Shows Outgoing</div>
                                <div className='is-flex is-right is-justify-content-end mb-3'>
                                    <Link to="/addshow"><a className='button is-info'>Add Shows<i class="fa fa-ticket ml-2" aria-hidden="true"></i></a></Link>
                                </div>
                                <div className='columns'>
                                    <div className='column'>

                                        <table className='table is-bordered is-fullwidth '>
                                            <tr>
                                                <th>Movie Name</th>
                                                <th>Hall Name</th>
                                                <th>Date</th>
                                                <th>Time</th>
                                                <th>Ticket Price</th>
                                                <th style={{ width: '10%' }}>Action</th>
                                            </tr>
                                            {shows?.map((m, i) => (
                                                <tr>
                                                    <td>{m.mid.name}</td>
                                                    <td>{m.hid.name}</td>
                                                    <td>{m.date}</td>
                                                    <td>{gettime(m.time)}</td>
                                                    <td>{m.price}</td>
                                                    <td><Link to={'/updateshow/' + m._id}><a className='button is-warning mr-2'><i class="fa fa-pencil " aria-hidden="true"></i></a></Link>
                                                        <a className='button is-danger' onClick={(e) => { deleteconfirm(m._id) }}><i class="fa fa-trash-o" aria-hidden="true"></i></a>
                                                    </td>
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

export default AllShows;