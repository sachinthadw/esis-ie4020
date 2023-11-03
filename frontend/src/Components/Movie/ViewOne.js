import axios from '../config/axiosConfig';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { getShows } from '../../Actions/ShowActions';
import NavBar_Home from '../../Components/Home/NavBar_Home';

function ViewOne(props) {
    const [movie, setmovie] = useState({});
    const [area, setarea] = useState([]);
    const { shows } = useSelector(state => state.shows);

    const dispatch = useDispatch()


    useEffect(() => {

        axios.get(`http://localhost:8070/movies/getone/${props.match.params.id}`).then((data) => {

            setmovie(data.data)
            setarea(data.data.area)

        }).catch((err) => {
            console.log(err)
        })

        // Get all "navbar-burger" elements
        const $navbarBurgers = document.querySelectorAll('.navbar-burger')

        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {

                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');

            });
        });

    }, [])

    useEffect(() => {
        dispatch(getShows(props.match.params.id))
    }, [])
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
    return (
        <>
            <NavBar_Home />
            <section className="hero is-fullheight-with-navbar movie-div all-home-flexs">

                <div className="hero-body">
                    <div className="container is-fluid">

                        <div className="">
                            <div className="" >
                                <div className="columns one-movie"  >
                                    <div className="column" style={{ backgroundColor: 'rgb(255 255 255 / 70%)', borderRadius: '20px' }}>
                                        <div className='columns' >
                                            <div className='column is-2'>
                                                <a href="#"><img src={"http://localhost:8070/" + movie?.image} alt="cover" style={{ height: '290px', borderRadius: '20px' }} /></a>
                                                <div>
                                                    {area.map(s => (
                                                        <span className="tag ml-1">{s.name}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className='column'>
                                                <div className="title is-2 has-text-danger-dark " >{movie?.name}</div>
                                            </div>
                                        </div>
                                        <div className='columns'>
                                            <div className='column'>
                                                <div className="description">
                                                    <div className="column2">
                                                        <div className='title is-5 has-text-justified'>{movie.description}</div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {shows.length > 0 ? <>

                                    <div className='columns'>
                                        <div className='column'>
                                            <div className='container'>
                                                <table className='table is-hoverable is-fullwidth'>
                                                    <tr>
                                                        <th>No</th>
                                                        <th>Hall Name</th>
                                                        <th>Date</th>
                                                        <th>Time</th>
                                                        <th style={{ width: '120px' }}>Action</th>
                                                    </tr>
                                                    {shows.map((s, i) => (
                                                        <tr key={i}>
                                                            <td>{(i + 1)}</td>
                                                            <td>{s.hid.name}</td>
                                                            <td>{s.date}</td>
                                                            {getTime(s.time)}
                                                            <td>{range}</td>
                                                            {(localStorage.getItem('token')) || (localStorage.getItem('atoken')) ? (
                                                                <td><Link to={`/booking/${s._id}`}><button className='button is-success is-fullwidth' >Book</button></Link></td>
                                                            ) : (
                                                                <td ><Link to={`/login`}><button className='button is-success is-fullwidth' disabled={localStorage.getItem('token') || localStorage.getItem('atoken')}>Please Login to Book</button></Link></td>

                                                            )}
                                                        </tr>
                                                    ))}

                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </> : <>
                                    <div className='columns'>
                                        <div className='column'>
                                            <div className="container">
                                                <div className="card">
                                                    <article className="message is-success">
                                                        <div className="message-body">
                                                            <strong>There are No shows Allocated Yet !!!</strong>
                                                        </div>
                                                    </article>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>}


                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ViewOne;