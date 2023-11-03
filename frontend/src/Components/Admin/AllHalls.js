import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { getHalls } from '../../Actions/Hall';
import axios from '../config/axiosConfig';
import NavBar_Admin from '../Home/NavBar_Admin';
function AllHalls(props) {
    const { halls } = useSelector(state => state.halls);
    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(getHalls())
    }, [halls])

    const deleteconfirm = (id) => {

        const confirmBox = window.confirm(
            "All The  shows related to that Hall will be Deleted"
        )
        if (confirmBox === true) {
            deletefunction(id)
        }
    }

    const deletefunction = (id) => {
        axios.delete(`http://localhost:8070/hall/delete/${id}`).then((dat) => {

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
                                <div className='title is-2 has-text-white has-text-centered'>All Halls</div>
                                <div className='is-flex is-right is-justify-content-end mb-3'>
                                    <Link to="/addhall"><a className='button is-info'>Add Halls<i class="fa fa-video-camera ml-2" aria-hidden="true"></i></a></Link>
                                </div>
                                <div className='columns'>
                                    <div className='column'>
                                        <table className="table is-bordered is-fullwidth">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Seat Rows</th>
                                                    <th scope="col">Seats for one column</th>
                                                    <th scope="col">Rate</th>
                                                    <th style={{ width: '10%' }}>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {halls.map((mov, i) => (
                                                    <tr>
                                                        <th scope="row">{(i + 1)}</th>
                                                        <td>{mov.name}</td>
                                                        <td>{mov.rows}</td>
                                                        <td>{mov.cols}</td>
                                                        <td>{mov.rate}</td>

                                                        <td><Link to={'/updatehall/' + mov._id}><a className='button is-warning mr-2'><i class="fa fa-pencil " aria-hidden="true"></i></a></Link>
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

export default AllHalls;