import axios from '../config/axiosConfig';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar_Admin from '../Home/NavBar_Admin';

function EditShow(props) {

    const [date, setdate] = useState('')
    const [time, settime] = useState('')
    const [price, setprice] = useState('')
    const [hall, sethall] = useState('')
    const [mov, setmov] = useState('')

    useEffect(() => {
        axios.get(`http://localhost:8070/show/getone/${props.match.params.id}`).then((data) => {
            setmov(data.data.mid.name)
            sethall(data.data.hid.name)
            settime(data.data.time)
            setprice(data.data.price)
            setdate(data.data.date)

        }).catch((err) => {
            console.log(err)
        })
    }, [])

    const updateshow = (e) => {
        e.preventDefault()
        const show = {
            date,
            time,
            price
        }
        axios.put(`http://localhost:8070/show/updateone/${props.match.params.id}`, show).then((da) => {
            alert("Show Updated")
            window.location.href = "/allshow"

        }).catch((err) => {
            console.log(err)
        })

    }

    return (
        <>
            {localStorage.getItem('atoken') ? (
                <>
                    <NavBar_Admin />

                    <section className="hero is-fullheight-with-navbar admin-div">
                        <div className="hero-body" style={{ padding: '3rem 0.5rem' }}>
                            <div className="container is-widescreen">
                                <div className='columns is-justify-content-center'>
                                    <div className='column is-6'>
                                        <div className="card" style={{ backgroundColor: '#fff6' }}>
                                            <div className='title is-2 has-text-danger-dark has-text-centered has-background-danger-light pb-3 pt-2'>
                                                <b>Edit Shows</b>
                                            </div>
                                            <form onSubmit={updateshow}>

                                                <div className="field has-addons m-3 pt-3">
                                                    <div className="control is-expanded">
                                                        <div className="select is-fullwidth">
                                                            <input type='text' className="input" value={mov} readOnly disabled onChange={(e) => { setmov(e.target.value) }} />

                                                        </div>
                                                    </div>
                                                    <div className="button control is-static">
                                                        <span className="icon is-left">
                                                            <i className="fa fa-film"></i>
                                                        </span>
                                                        <div type="submit" className=" is-primary is-static mr-5 pr-2">Movie Name</div>
                                                    </div>
                                                </div>

                                                <div className="field has-addons m-3 pt-3">
                                                    <div className="control is-expanded">
                                                        <div className="select is-fullwidth">
                                                            <input type='text' className="input" value={hall} readOnly disabled onChange={(e) => { sethall(e.target.value) }} />
                                                        </div>
                                                    </div>
                                                    <div className="button control is-static">
                                                        <span className="icon is-left">
                                                            <i className="fa fa-building"></i>
                                                        </span>
                                                        <div type="submit" className=" is-primary is-static mr-6">Hall Name</div>
                                                    </div>
                                                </div>

                                                <div className="field has-addons m-3 pt-3">
                                                    <div className="control is-expanded">
                                                        <div className="is-fullwidth">
                                                            <input type="date" className="input" value={date} onChange={(e) => { setdate(e.target.value) }} placeholder="Date" required />
                                                        </div>
                                                    </div>
                                                    <div className="button control is-static">
                                                        <span className="icon is-left">
                                                            <i className="fa fa-calendar"></i>
                                                        </span>
                                                        <div type="submit" className=" is-primary is-static mr-6">Show date</div>
                                                    </div>
                                                </div>
                                                <div className="field has-addons m-3 pt-3">
                                                    <div className="control is-expanded">
                                                        <div className="select is-fullwidth">
                                                            <select onChange={(e) => { settime(e.target.value) }} value={time}>
                                                                <option>Select Time slot</option>
                                                                <option value="1">10.00am - 1.00 pm</option>
                                                                <option value="2">1.00pm - 4.00 pm</option>
                                                                <option value="3">4.00pm - 7.00 pm</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="button control is-static">
                                                        <span className="icon is-left">
                                                            <i className="fa fa-clock-o"></i>
                                                        </span>
                                                        <div type="submit" className=" is-primary is-static mr-3">Select Time slot</div>
                                                    </div>
                                                </div>

                                                <div className="field has-addons m-3 pt-3">
                                                    <div className="control is-expanded">
                                                        <div className=" is-fullwidth">
                                                            <input min='0' type='number' className="input" value={price} onChange={(e) => { setprice(e.target.value) }} required />
                                                        </div>
                                                    </div>
                                                    <div className="button control is-static">
                                                        <span className="icon is-left">
                                                            <i className="fa fa-ticket"></i>
                                                        </span>
                                                        <div type="submit" className="is-primary is-static ">Ticket Show Price</div>
                                                    </div>
                                                </div>
                                                <div className=" has-background-danger-light pt-1 pb-2">
                                                    <div className=" mt-5 mr-3 ml-3 pb-3 ">
                                                        <Link to='/allshow'><button className="button is-link is-fullwidth mb-2" type='submit' value="Create" >Back to Shows</button></Link>
                                                        <button className="button is-danger is-fullwidth " type='submit' value="save" >Save</button>
                                                    </div>
                                                </div>
                                            </form>

                                        </div>
                                    </div>

                                </div >
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

export default EditShow;