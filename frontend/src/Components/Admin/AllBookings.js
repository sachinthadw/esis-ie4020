import React, { useEffect, useState } from 'react';
import axios from '../config/axiosConfig';
import NavBar_Admin from '../Home/NavBar_Admin';

function AllBookings(props) {
    const [bookings, setbookings] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8070/booking/all').then((data) => {
            setbookings(data.data)

        }).catch((err) => {

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
                                <div className='title is-2 has-text-white has-text-centered'>All Bookings</div><br />


                                <table className='table is-bordered is-fullwidth '>
                                    <tr>
                                        <th>user name</th>
                                        <th>Movie name</th>
                                        <th>#Tickets</th>
                                        <th>Ticket Price</th>
                                        <th>Total</th>
                                    </tr>

                                    {bookings?.map((bo, i) => (
                                        <tr>
                                            <td>{bo.uid.name}</td>
                                            <td>{bo.mid.name}</td>
                                            <td>{bo.tickets}</td>
                                            <td>{bo.price}</td>
                                            <td>{(bo.tickets * bo.price)}</td>
                                        </tr>
                                    ))}
                                </table>
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

export default AllBookings;