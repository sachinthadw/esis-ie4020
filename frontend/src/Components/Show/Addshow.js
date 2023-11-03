import axios from '../config/axiosConfig';
import React, { useEffect, useState } from 'react';
//import { message } from 'antd'
import { getHalls } from '../../Actions/Hall';
import { getmovies } from '../../Actions/MovieActions';
import { useSelector, useDispatch } from 'react-redux'
import NavBar_Admin from '../Home/NavBar_Admin';
import { Link } from 'react-router-dom';
function Addshow(props) {
    const [mid, setmid] = useState("")
    const [hid, sethid] = useState("")
    const [date, setdate] = useState("")
    const [time, settime] = useState("")
    const [price, setprice] = useState()
    const { halls } = useSelector(state => state.halls);
    const { movies } = useSelector(state => state.movies);

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getHalls())
        dispatch(getmovies())
    }, [])

    const createshow = (e) => {
        e.preventDefault()

        const show = {
            hid,
            mid,
            date,
            time,
            price
        }
        console.log(show)

        axios.post('http://localhost:8070/show', show).then((data) => {
            console.log("created")
            alert("show added");
            window.location = "/allshow"
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
                                                <b>Adding Shows</b>
                                            </div>
                                            <form onSubmit={createshow}>

                                                <div className="field has-addons m-3 pt-3">
                                                    <div className="control is-expanded">
                                                        <div className="select is-fullwidth">
                                                            <select onChange={(e) => { setmid(e.target.value) }} >
                                                                <option>Select Movie</option>
                                                                {movies.map(m => (
                                                                    <option value={m._id}>{m.name}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="button control is-static">
                                                        <span className="icon is-left">
                                                            <i className="fa fa-film"></i>
                                                        </span>
                                                        <div type="submit" className=" is-primary is-static mr-5 pr-2">Select Movie</div>
                                                    </div>
                                                </div>
                                                <div className="field has-addons m-3 pt-3">
                                                    <div className="control is-expanded">
                                                        <div className="select is-fullwidth">
                                                            <select onChange={(e) => { sethid(e.target.value) }}>
                                                                <option>Select Hall</option>
                                                                {halls.map(m => (
                                                                    <option value={m._id}>{m.name}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="button control is-static">
                                                        <span className="icon is-left">
                                                            <i className="fa fa-building"></i>
                                                        </span>
                                                        <div type="submit" className=" is-primary is-static mr-6">Select Hall</div>
                                                    </div>
                                                </div>
                                                <div className="field has-addons m-3 pt-3">
                                                    <div className="control is-expanded">
                                                        <div className="is-fullwidth">
                                                            <input type="date" className="input" onChange={(e) => { setdate(e.target.value) }} required />
                                                        </div>
                                                    </div>
                                                    <div className="button control is-static">
                                                        <span className="icon is-left">
                                                            <i className="fa fa-calendar"></i>
                                                        </span>
                                                        <div type="submit" className=" is-primary is-static mr-3 pr-1">Select the date</div>
                                                    </div>
                                                </div>
                                                <div className="field has-addons m-3 pt-3">
                                                    <div className="control is-expanded">
                                                        <div className=" is-fullwidth">
                                                            <input min='0' type='number' className="input" onChange={(e) => { setprice(e.target.value) }} placeholder="Ticket Price" required />
                                                        </div>
                                                    </div>
                                                    <div className="button control is-static">
                                                        <span className="icon is-left">
                                                            <i className="fa fa-ticket"></i>
                                                        </span>
                                                        <div type="submit" className="is-primary is-static ">Enter Ticket price</div>
                                                    </div>
                                                </div>
                                                <div className="field has-addons m-3 pt-3">
                                                    <div className="control is-expanded">
                                                        <div className="select is-fullwidth">
                                                            <select onChange={(e) => { settime(e.target.value) }}>
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
                                                <div className=" has-background-danger-light pt-1 pb-2">
                                                    <div className=" mt-5 mr-3 ml-3 pb-3 ">
                                                        <Link to='/allshow'><button className="button is-link is-fullwidth mb-2" type='submit' value="Create" >Back to Shows</button></Link>
                                                        <button className="button is-danger is-fullwidth " type="submit" value="create" >Create</button>
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

export default Addshow;