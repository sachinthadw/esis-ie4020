import React, { useEffect, useState } from 'react';
import axios from '../config/axiosConfig';
import NavBar_Admin from '../Home/NavBar_Admin';
import { Link } from 'react-router-dom';

function EditHall(props) {

    const [name, setname] = useState()
    const [rows, setrows] = useState()
    const [rate, setrate] = useState()
    const [cols, setcols] = useState()
    useEffect(() => {
        axios.get(`http://localhost:8070/hall/getone/${props.match.params.id}`).then((data) => {
            setname(data.data.name)
            setrows(data.data.rows)
            setrate(data.data.rate)
            setcols(data.data.cols)

        }).catch((err) => {
            console.log(err)
            alert("Hall Updated")
            window.location.href = "/allhalls"
        })
    }, [])

    const updateHall = (e) => {
        e.preventDefault()

        const mov = {
            rate,
            name
        }

        axios.put(`http://localhost:8070/hall/update/${props.match.params.id}`, mov).then((da) => {
            alert("Hall Upadated")
            window.location.href = "/allhalls"

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
                                                <b>Edit Halls</b>
                                            </div>
                                            <form onSubmit={updateHall}>
                                                <div className="field has-addons m-3 pt-3">
                                                    <div className="control is-expanded">
                                                        <div className="is-fullwidth">
                                                            <input type="text" className="input" value={name} onChange={(e) => { setname(e.target.value) }} placeholder="name" required />
                                                        </div>
                                                    </div>
                                                    <div className="button control is-static">
                                                        <span className="icon is-left">
                                                            <i className="fa fa-film"></i>
                                                        </span>
                                                        <div type="submit" className=" is-primary is-static mr-6 pr-3">Name</div>
                                                    </div>
                                                </div>
                                                <div className="field has-addons m-3 pt-3">
                                                    <div className="control is-expanded">
                                                        <div className="is-fullwidth">
                                                            <input type="text" className="input" value={rows} readOnly disabled onChange={(e) => { setrows(e.target.value) }} placeholder="name" aria-label="Username" />
                                                        </div>
                                                    </div>
                                                    <div className="button control is-static">
                                                        <span className="icon is-left">
                                                            <i className="fa fa-film"></i>
                                                        </span>
                                                        <div type="submit" className=" is-primary is-static mr-5 pr-3">Seat rows</div>
                                                    </div>
                                                </div>

                                                <div className="field has-addons m-3 pt-3">
                                                    <div className="control is-expanded">
                                                        <div className="is-fullwidth">
                                                            <input type="number" className="input" value={cols} readOnly disabled onChange={(e) => { setcols(e.target.value) }} placeholder="name" aria-label="Username" />
                                                        </div>
                                                    </div>
                                                    <div className="button control is-static">
                                                        <span className="icon is-left">
                                                            <i className="fa fa-film"></i>
                                                        </span>
                                                        <div type="submit" className=" is-primary is-static">Seats for a row</div>
                                                    </div>
                                                </div>
                                                <div className="field has-addons m-3 pt-3">
                                                    <div className="control is-expanded">
                                                        <div className="is-fullwidth">
                                                            <input type="number" className="input" value={rate} onChange={(e) => { setrate(e.target.value) }} placeholder="Rate" required />
                                                        </div>
                                                    </div>
                                                    <div className="button control is-static">
                                                        <span className="icon is-left">
                                                            <i className="fa fa-film"></i>
                                                        </span>
                                                        <div type="submit" className=" is-primary is-static mr-6 pr-5">Rate</div>
                                                    </div>
                                                </div>

                                                <div className=" has-background-danger-light pt-1 pb-2">
                                                    <div className=" mt-5 mr-3 ml-3 pb-3 ">
                                                        <Link to='/allhalls'><button className="button is-link is-fullwidth mb-2" type='submit' value="Create" >Back to Shows</button></Link>
                                                        <button className="button is-danger is-fullwidth " type="submit" value="create" >Create</button>
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

export default EditHall;