import React, { useEffect, useState } from 'react';
import axios from '../config/axiosConfig';
import NavBar_Admin from '../Home/NavBar_Admin';
import { Link } from 'react-router-dom';
function EditMovie(props) {
    const [name, setname] = useState()
    const [description, setdescription] = useState()
    const [rate, setrate] = useState()
    const [image, setimage] = useState()
    useEffect(() => {
        axios.get(`http://localhost:8070/movies/getone/${props.match.params.id}`).then((data) => {
            setname(data.data.name)
            setdescription(data.data.description)
            setrate(data.data.rate)
            setimage(data.data.image)

        }).catch((err) => {
            console.log(err)
        })
    }, [])

    const updatemovie = (e) => {
        e.preventDefault()

        const mov = {
            rate,
            description
        }

        axios.put(`http://localhost:8070/movies/update/${props.match.params.id}`, mov).then((da) => {
            alert("Movie Updated")
            window.location.href = "/allmovies"

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
                                                <b>Edit Movies</b>
                                            </div>
                                            <form onSubmit={updatemovie}>
                                                <div className=" is-flex is-justify-content-center">

                                                    <div className="card has-text-centered" style={{ width: "215px" }}>
                                                        <img style={{ width: "200px" }} src={"http://localhost:8070/" + image} alt="movie poster" className="mt-1" /><br></br>
                                                    </div>
                                                </div>

                                                <div className="field has-addons m-3 pt-3">
                                                    <div className="control is-expanded">
                                                        <div className="is-fullwidth">
                                                            <input type="text" className="input" value={name} readOnly disabled onChange={(e) => { setname(e.target.value) }} placeholder="name" aria-label="Username" />
                                                        </div>
                                                    </div>
                                                    <div className="button control is-static">
                                                        <span className="icon is-left">
                                                            <i className="fa fa-film"></i>
                                                        </span>
                                                        <div type="submit" className=" is-primary is-static mr-3 pr-1">Movie Name</div>
                                                    </div>
                                                </div>

                                                <div className="field has-addons m-3 pt-3">
                                                    <div className="control is-expanded">
                                                        <div className="button control is-static is-fullwidth">
                                                            <span className="icon is-left">
                                                                <i className="fa fa-pencil-square-o"></i>
                                                            </span>
                                                            <div type="submit" className=" is-primary is-static mr-3 pr-1">Movie Description</div>
                                                        </div>
                                                        <div className="is-fullwidth">
                                                            <textarea class="textarea" value={description} onChange={(e) => { setdescription(e.target.value) }} placeholder="Textarea" required></textarea>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="field has-addons m-3 pt-3">
                                                    <div className="control is-expanded">
                                                        <div className="is-fullwidth">
                                                            <input type="number" className="input" value={rate} onChange={(e) => { setrate(e.target.value) }} placeholder="Movie Rate" min="0" max="5" required />
                                                        </div>
                                                    </div>
                                                    <div className="button control is-static">
                                                        <span className="icon is-left">
                                                            <i className="fa fa-star"></i>
                                                        </span>
                                                        <div type="submit" className=" is-primary is-static mr-3 pr-1">Ratings</div>
                                                    </div>
                                                </div>
                                                <div className=" has-background-danger-light pt-1 pb-2">
                                                    <div className=" mt-5 mr-3 ml-3 pb-3 ">
                                                        <Link to='/allmovies'><button className="button is-link is-fullwidth mb-2" type='submit' value="Create" >Back to Movies</button></Link>
                                                        <button className="button is-danger is-fullwidth " type='submit' value="save" >Save</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                </div >

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

export default EditMovie;