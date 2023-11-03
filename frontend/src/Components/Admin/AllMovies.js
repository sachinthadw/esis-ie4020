import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { getmovies } from '../../Actions/MovieActions';
import axios from '../config/axiosConfig';
import NavBar_Admin from '../Home/NavBar_Admin';

function AllMovies(props) {
    const { movies } = useSelector(state => state.movies);
    const dispatch = useDispatch()
    useEffect(() => {

        dispatch(getmovies())
    }, [movies])


    const deleteconfirm = (id) => {

        const confirmBox = window.confirm(
            "All The bookings and shows related to that movie will be Deleted"
        )
        if (confirmBox === true) {
            deletefunction(id)
        }
    }

    const deletefunction = (id) => {
        axios.delete(`http://localhost:8070/movies/delete/${id}`).then((dat) => {

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
                            <div className='container is-fluid'>
                                <div className='title is-2 has-text-white has-text-centered'>All Movies</div>
                                <div className='is-flex is-right is-justify-content-end mb-3'>
                                    <Link to="/addmovie"><a className='button is-info'>Add Movies<i class="fa fa-film ml-2" aria-hidden="true"></i></a></Link>
                                </div>
                                <div className='columns'>
                                    <div className='column'>
                                        <table className="table is-bordered is-fullwidth">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col" style={{ width: '100px' }} >Image</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Description</th>
                                                    <th scope="col">Rate</th>
                                                    <th style={{ width: '10%' }}>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {movies.map((mov, i) => (
                                                    <tr>
                                                        <th scope="row">{(i + 1)}</th>
                                                        <td> <img src={"http://localhost:8070/" + mov.image} alt="movie poster" className="pro_user" style={{ height: '100px' }} /></td>
                                                        <td>{mov.name}</td>
                                                        <td>{mov.description}</td>
                                                        <td>{mov.rate}</td>

                                                        <td><Link to={'/updatemovie/' + mov._id}><a className='button is-warning mr-2'><i class="fa fa-pencil" aria-hidden="true"></i></a></Link>
                                                            <a className='button is-danger' onClick={(e) => { deleteconfirm(mov._id) }}><i class="fa fa-trash-o" aria-hidden="true"></i></a></td>

                                                    </tr>
                                                ))}
                                            </tbody>
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

export default AllMovies;