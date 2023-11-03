import axios from '../config/axiosConfig';
import React, { useEffect, useState } from 'react';
import NavBar_Admin from '../Home/NavBar_Admin';
import { Link } from 'react-router-dom'


function AllCategory(props) {
    const [cate, setcate] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8070/categories/list').then((data) => {
            setcate(data.data)
        }).catch((err) => {

        })
    }, [cate])
    return (
        <>
            {localStorage.getItem('atoken') ? (
                <>

                    <NavBar_Admin />
                    <section className="hero is-fullheight-with-navbar admin-div-home ">
                        <div className="hero-body">
                            <div className='container is-fluid'>
                                <div className='title is-2 has-text-white has-text-centered'>All Categories</div>
                                <div className='is-flex is-right is-justify-content-end mb-3'>
                                    <Link to="/addcategory"><a className='button is-info'>Add Category<i class="fa fa-video-camera ml-2" aria-hidden="true"></i></a></Link>
                                </div>
                                <div className='columns'>
                                    <div className='column'>
                                        <table className="table is-bordered is-fullwidth">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Name</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cate.map((mov, i) => (
                                                    <tr>
                                                        <th scope="row">{(i + 1)}</th>
                                                        <td>{mov.name}</td>



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

export default AllCategory;