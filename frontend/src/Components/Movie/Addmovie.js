import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
//import { Card } from 'antd';
import { getcategories } from '../../Actions/CategoryActions';
import Checkbox from './Checkbox';
import { getHalls } from '../../Actions/Hall';
import NavBar_Admin from '../Home/NavBar_Admin';
import { Link } from 'react-router-dom';
//const { Meta } = Card;
function Addmovie(props) {

    const [name, setName] = useState("");
    const [description, setdescription] = useState("");
    const [to, setto] = useState("");
    const [from, setfrom] = useState("");
    const [rates, setrate] = useState("");
    const [formdata, setformdata] = useState(null);
    const [ida, setida] = useState([])

    let arry = []
    let data = new FormData();

    const { categories } = useSelector(state => state.categories);
    const { halls } = useSelector(state => state.halls);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getcategories())
        dispatch(getHalls())


    }, [])


    const upload = ({ target: { files } }) => {

        data.append("studentImage", files[0]);

        data.append("imgname", files[0].name);


    }
    data.append("studentImage", formdata);
    data.append("name", name);

    data.append("description", description);
    data.append("to", to);
    data.append("from", from);
    //data.append("rates", rates);

    function sendData(e) {


        data.append("arr", JSON.stringify(ida))
        data.append("rates", rates);

        console.log(ida)
        e.preventDefault();


        console.log(data.name)

        axios.post("http://localhost:8070/movies/add", data).then(() => {
            alert("movie added");
            window.location = "/allmovies"


        }).catch((err) => {
            alert(err);
        })
    }
    const handleFilters = (id) => {

        arry = id;
        setida(arry)
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
                                                <b>Adding Movies</b>
                                            </div>
                                            <form onSubmit={sendData}>
                                                <div className="field has-addons m-3 pt-3">
                                                    <div className="control is-expanded">
                                                        <div className="is-fullwidth">
                                                            <input type="text" className="input" onChange={(e) => { setName(e.target.value) }} placeholder="name" required />
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
                                                            <textarea class="textarea" onChange={(e) => { setdescription(e.target.value) }} placeholder="Textarea" required></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="field has-addons m-3 pt-3">
                                                    <div className="control is-expanded">
                                                        <div className="is-fullwidth">
                                                            <input type="date" className="input" onChange={(e) => { setfrom(e.target.value) }} placeholder="name" required />
                                                        </div>
                                                    </div>
                                                    <div className="button control is-static">
                                                        <span className="icon is-left">
                                                            <i className="fa fa-calendar"></i>
                                                        </span>
                                                        <div type="submit" className=" is-primary is-static mr-3 ">Movie Start Date</div>
                                                    </div>
                                                </div>
                                                <div className="field has-addons m-3 pt-3">
                                                    <div className="control is-expanded">
                                                        <div className="is-fullwidth">
                                                            <input type="date" className="input" onChange={(e) => { setto(e.target.value) }} placeholder="name" required />
                                                        </div>
                                                    </div>
                                                    <div className="button control is-static">
                                                        <span className="icon is-left">
                                                            <i className="fa fa-calendar"></i>
                                                        </span>
                                                        <div type="submit" className=" is-primary is-static mr-3 pr-1">Movie End Date</div>
                                                    </div>
                                                </div>

                                                <div className="field has-addons m-3 pt-3">
                                                    <div className="control is-expanded">
                                                        <div className="button control is-static is-fullwidth">
                                                            <span className="icon is-left">
                                                                <i className="fa fa-check"></i>
                                                            </span>
                                                            <div type="submit" className=" is-primary is-static mr-3 pr-1">Movie Catagory</div>
                                                        </div>
                                                        <div className="" style={{ display: 'contents !important' }}>
                                                            <Checkbox className="" areas={categories}
                                                                handleFilters={filters => handleFilters(filters, 'area')} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="field has-addons m-3 pt-3">
                                                    <div className="control is-expanded">
                                                        <div className="is-fullwidth">
                                                            <input type="number" className="input" onChange={(e) => { setrate(e.target.value) }} placeholder="Movie Rate" min="0" max="5" aria-label="Username" />
                                                        </div>
                                                    </div>
                                                    <div className="button control is-static">
                                                        <span className="icon is-left">
                                                            <i className="fa fa fa-star"></i>
                                                        </span>
                                                        <div type="submit" className=" is-primary is-static mr-5 pr-4">Movie Rate</div>
                                                    </div>
                                                </div>

                                                <div className="field has-addons m-3 pt-3">
                                                    <div className="control is-expanded">
                                                        <div className="is-fullwidth">
                                                            <input className="input" type="file" name="resume" onClick={(e) => { console.log(ida) }} onChange={upload} id="inputGroupFile04" required />
                                                        </div>
                                                    </div>
                                                    <div className="button control is-static">
                                                        <span className="icon is-left">
                                                            <i className="fas fa-upload"></i>
                                                        </span>
                                                        <div type="submit" className=" is-primary is-static mr-3 pr-1">Choose a file…</div>
                                                    </div>
                                                </div>

                                                <div className=" has-background-danger-light pt-1 pb-2">
                                                    <div className=" mt-5 mr-3 ml-3 pb-3 ">
                                                        <Link to='/allmovies'><button className="button is-link is-fullwidth mb-2" type='submit' value="Create" >Back to Movies</button></Link>
                                                        <button className="button is-danger is-fullwidth " type='submit' value="Create" >Create a Movie</button>
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

export default Addmovie;