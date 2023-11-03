import axios from '../config/axiosConfig';
import React, { useEffect, useState } from 'react';
import moment from 'moment'
import QRCode from 'qrcode';
import NavBar_Home from '../Home/NavBar_Home';
function Mybookings(props) {
    const [imageUrl, setImageUrl] = useState('');
    const [items, setitems] = useState([])
    const [check, setcheck] = useState(false)
    var user = JSON.parse(localStorage.getItem("user"))
    useEffect(() => {
        axios.get(`http://localhost:8070/booking/getbooking/${user._id}`).then((data) => {
            setitems(data.data)


        }).catch((err) => {
            console.log(err)
        })
    }, [items])


    const generateQrCode = async (book) => {
        try {
            //create object and passing into data

            const ob = {
                name: book.mid.name,
                image: book.mid.image,
                seats: book.seats,
                date: book.sid.date,
                time: book.sid.time,
                price: book.sid.price,

            }
            const response = await QRCode.toDataURL(JSON.stringify(ob));
            //set image url in to setImageUrl
            setImageUrl(response);
        } catch (error) {
            console.log(error);
        }
    }

    const checkavilable = (dat) => {
        var d1 = moment(dat, "YYYY MM DD")
        var current = moment().startOf('day');
        var dif = moment.duration(current.diff(d1)).asDays()

        if (dif > 1) {
            return false
        } else {
            return true
        }
    }
    let range
    const getTime = (ind) => {

        if (ind === 1) {
            range = "10.00am - 1.00pm"
        } else if (ind === 2) {
            range = "1.00pm - 4.00pm"
        } else if (ind === 3) {
            range = "4.00pm - 7.00pm"
        }
    }

    const delbooking = (id) => {
        axios.delete(`http://localhost:8070/booking/${id}`).then((dat) => {

        }).catch((er) => {
            console.log(er)
        })
    }
    return (

        <>
            {localStorage.getItem('token') ? (
                <>
                    <NavBar_Home />

                    <section className="hero is-fullheight-with-navbar movie-div all-home-flexs">

                        <div className="hero-body">
                            <div className="container is-fluid">
                                <div className=''>
                                    <h2 className=''>My Bookings</h2>
                                </div>
                                <div className='columns is-justify-content-center'>
                                    <div className='column is-10'>
                                        <div className="">
                                            <table className="table is-striped is-narrow is-hoverable is-fullwidth ">
                                                <thead className="text-muted">
                                                    <tr className="small text-uppercase">
                                                        <th scope="col">Movie</th>
                                                        <th scope='col'>Book On</th>
                                                        <th scope="col">Show Date</th>
                                                        <th scope="col">Time</th>
                                                        <th scope="col" >#Tickets</th>
                                                        <th scope="col" >Price</th>
                                                        <th scope="col"></th>
                                                        <th scope="col"></th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {items?.map((m, i) => (

                                                        <tr className='table_row' key={i}>

                                                            <td>
                                                                <figure className="itemside align-items-center">
                                                                    <div className="aside"><img src={"http://localhost:8070/" + m.mid?.image} style={{ height: '120px' }} /></div>
                                                                    <figcaption className="info">
                                                                        <h3 className='txt'>{m.mid.name}</h3>
                                                                        <p className="text-muted small txt2"><br /></p>
                                                                    </figcaption>
                                                                </figure>
                                                            </td>
                                                            <td>{moment(m.createdAt).format("YYYY-MM-DD")}</td>
                                                            <td>{m.sid?.date}</td>
                                                            {getTime(m.sid?.time)}
                                                            <td>{range}</td>
                                                            <td>{m?.tickets} </td>
                                                            <td>
                                                                <div className="price-wrap"> <var className="price">${m.sid?.price * m?.tickets}</var> <small className="text-muted"> ${m.sid?.price} </small> </div>
                                                            </td>

                                                            <td className="text-right d-md-block">   {checkavilable(m.createdAt) ? <a href className="btn btn-light" data-abc="true" onClick={(e) => { delbooking(m._id) }} ><i className="fa fa-trash" /></a> : <></>} </td>
                                                            <td><a onClick={(e) => { generateQrCode(m) }} className="btn btn-light"><i className="fa fa-qrcode" aria-hidden="true"></i></a></td>

                                                        </tr>
                                                    ))}

                                                </tbody>
                                            </table>

                                        </div>

                                    </div>
                                    <div className='column is-2'  >
                                        <div className=' justify-content-center'>
                                            <div className=' qr p-3'>
                                                <h3 className='text-center'>QR Code </h3>
                                                {imageUrl ? (<a href={imageUrl} download> <img src={imageUrl} alt="img" /><br /><h4 className='text-center'>Click to Download</h4></a>) : null}
                                            </div>
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

export default Mybookings;