import axios from '../config/axiosConfig';
import React, { useEffect, useState } from 'react';
import '../../Assets/Styles/book.css'
import NavBar_Home from '../Home/NavBar_Home';

// import { Tabs, Radio, Space } from 'antd';
// const { TabPane } = Tabs;

function Booking(props) {

    const [show, setshow] = useState()
    const [row, setrow] = useState()
    const [col, setcol] = useState()
    const [data, setdata] = useState(0)
    const [seats, setseats] = useState([])
    const [total, settotal] = useState(0)
    const [mov, setmov] = useState()

    const [savedata, setsavedata] = useState([])
    var cartitems = JSON.parse(localStorage.getItem("cart")) || []

    let divide = []
    let selectedseats = []
    useEffect(() => {
        axios.get(`http://localhost:8070/show/getone/${props.match.params.id}`).then((data) => {
            setshow(data.data)
            setrow(data.data.hid.rows)
            setcol(data.data.hid.cols)
            setseats(data.data.hid.seats)
            setmov(data.data.mid)
            selectedseats = data.data.seatbook
            setsavedata(selectedseats)



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


    const dividefunc = () => {
        var dis = []
        for (var i = 0; i < seats.length; i++) {

            dis.push(seats[i])
            if ((i + 1) % col === 0) {
                divide.push(dis)
                dis = []
            }
        }

    }

    dividefunc()






    const clickfunc = (id) => {
        const ch = document.getElementById("ch")
        const tota = document.getElementById("total")
        var ds = document.getElementById(id)
        if (ds.classList.contains("ocupied")) {
            return
        }
        if (ds.classList.contains("selected")) {
            ds.classList.remove("selected")
            ds.innerHTML = ""
        } else {
            ds.classList.add("selected")
            ds.innerHTML = id
        }
        if (selectedseats.includes(id)) {
            selectedseats = selectedseats.filter(item => item !== id)
            ch.innerHTML = selectedseats
            tota.innerHTML = (selectedseats.length * show.price)
        } else {

            selectedseats.push(id)
            ch.innerHTML = selectedseats
            tota.innerHTML = (selectedseats.length * show.price)

        }

        console.log(selectedseats)
    }


    const booktickets = () => {
        const upshow = {
            seatbook: [...savedata, ...selectedseats]
        }
        axios.put(`http://localhost:8070/show/update/${props.match.params.id}`, upshow).then((data) => {
            alert("booked")
        }).catch((err) => {
            console.log(err)
        })
        if (selectedseats.length === 0) {
            alert("please select seats")
            return
        }

        const cartitem = {
            sid: props.match.params.id,
            tickets: selectedseats.length,
            show: show,
            total: (selectedseats.length * show.price),
            mov: mov,
            num: cartitems.length,
            seatbook: [...savedata, ...selectedseats],
            sseats: selectedseats

        }
        cartitems.push(cartitem)
        localStorage.setItem("cart", JSON.stringify(cartitems))
        window.location.href = '/cart';
    }
    let selected = false;
    const findselected = (id) => {
        if (savedata.includes(id)) {
            document.getElementById(id).classList.add("ocupied")
        }
        else {

        }
    }

    return (
        <>
            <NavBar_Home />
            <section className="hero is-fullheight-with-navbar movie-div">

                <div className="hero-body">
                    <div className="container is-fluid">

                        <div className='container is-fluid'>
                            <div className='rows is-justify-content-center'>

                                <div className=''>
                                    <div className='rows is-justify-content-center mt-5'>
                                        <div className='col-xl-8 col-lg-8 col-md-8 col-sm-10 col-12'>
                                            <ul className='showcase'>
                                                <li>
                                                    <div className='seat'></div>
                                                    <small>NA</small>
                                                </li>
                                                <li>
                                                    <div className='seat selected'></div>
                                                    <small>selected</small>
                                                </li>
                                                <li>
                                                    <div className='seat ocupied'></div>
                                                    <small>ocupied</small>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className='columns'>
                                        <div className='column is-10'>
                                            <div className='con'>
                                                <div className='screen'></div>
                                                <div className='columns is-justify-content-center'>
                                                    <div className='col-xl-10 col-lg-10 col-md-10 col-sm-12 col-12'>
                                                        <table>
                                                            {divide.map((s, i) => (
                                                                <tr>
                                                                    {s.map(d => (
                                                                        <>
                                                                            <td> <div onClick={(e) => { clickfunc(d) }} id={d} className="seat" ></div></td>
                                                                            {findselected(d)}
                                                                        </>
                                                                    ))}
                                                                </tr>
                                                            ))}
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div >
                                        <div className='column mt-6  title is-4 has-text-white'>
                                            <div className='mt-2  '>
                                                <h4 className='subtitle is-4 has-text-white'>Ticket Price :<b><p className='subtitle is-6 has-text-danger-dark'> {show?.price}</p></b></h4>
                                                <h4 className='subtitle is-4 has-text-white'>Booked seats :<b><p className='subtitle is-6 has-text-danger-dark' id='ch'></p></b></h4>
                                                <h4 className='subtitle is-4 has-text-white'>Total price : <b><p className='subtitle is-6 has-text-danger-dark' id='total'></p></b></h4>
                                                <button onClick={(e) => { booktickets() }} className='button is-warning'>Add to cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div >

                    </div>
                </div>
            </section>
        </>
    );
}

export default Booking;