import axios from '../config/axiosConfig';
import StripeCheckout from 'react-stripe-checkout';
import React, { useEffect, useState } from 'react';
import NavBar_Home from '../Home/NavBar_Home';
import { Link } from 'react-router-dom';
function Cart(props) {
    const [total, settotal] = useState(0)
    var t = 0;
    var sum = 0;
    var it = JSON.parse(localStorage.getItem("cart"))

    var user = JSON.parse(localStorage.getItem("user"))
    const [cartitems, setcartitems] = useState(it)



    useEffect(() => {


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

    }, [cartitems])
    useEffect(() => {

        localStorage.setItem("cart", JSON.stringify(cartitems))



    }, [cartitems])

    const calctotal = (tot) => {
        sum = sum + tot;
    }




    const removecart = (id) => {
        setcartitems(cartitems.filter(item => item.num !== id))
        calctotal()
    }

    const bookmovies = () => {
        const data = {
            cart: cartitems,
            uid: user._id,

        }
        axios.post('http://localhost:8070/booking', data).then((resu) => {

        }).catch((err) => {
            console.log(err)
        })


        axios.put(`http://localhost:8070/show/updatecart`, data).then((da) => {
            alert("booked")
        }).catch((err) => {
            console.log(err)
        })

        localStorage.setItem("cart", null)

        window.location.href = '/all';
    }
    return (

        <>
            {localStorage.getItem('token') ? (
                <>
                    <NavBar_Home />
                    <section className="hero is-fullheight-with-navbar movie-div all-home-flexs">
                        <div className="hero-body" style={{ padding: '3rem 0.5rem' }}>
                            <div className="container is-widescreen">
                                <div className="columns is-justify-content-center">
                                    <div className="column is-9">
                                        <div className="card">
                                            <div className="card p-1">
                                                <table className="table is-striped is-narrow is-hoverable is-fullwidth ">
                                                    <thead>
                                                        <tr className="is-uppercase">
                                                            <th scope="col"><div className="">Movie</div></th>
                                                            <th scope="col" ><div className="">Quantity</div></th>
                                                            <th scope="col" ><div className="">Price</div></th>
                                                            <th scope="col"  ><div className="" style={{ float: 'right' }}>Action</div></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {cartitems?.map((m, i) => (


                                                            <tr key={i}>
                                                                <td>

                                                                    <figure className="is-flex is-align-items-center">
                                                                        <img src={"http://localhost:8070/" + m.mov.image} style={{ height: '120px' }} />
                                                                        <figcaption style={{ paddingLeft: '0.25rem' }} className="pl-2">
                                                                            <h3><b>{m.mov.name}</b></h3>
                                                                            <p className="has-text-grey">{m.show.date}<br /> 11.00pm</p>
                                                                        </figcaption>
                                                                    </figure>
                                                                </td>
                                                                <td><div className="ml-5 pl-3 has-text-danger"><b>{m.tickets}</b> </div></td>
                                                                <td>
                                                                    <div className="price-wrap">
                                                                        <var style={{ fontWeight: '600', color: '#212529' }} >
                                                                            <div>${m.total}</div>
                                                                        </var>
                                                                        <small className="has-text-grey">
                                                                            <div> ${m.show.price}</div>
                                                                        </small>
                                                                    </div>
                                                                </td>
                                                                {calctotal(((m.total)))}
                                                                <td className="" style={{ float: 'right' }}>
                                                                    <a className="button is-light " > <i className="fa fa-heart " /></a>
                                                                    <a className="button is-danger" onClick={(e) => { removecart(m.num) }} > <i className="fa fa-trash" /></a>
                                                                </td>
                                                            </tr>

                                                        ))}


                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="column">
                                        <div className="card">
                                            {/* <div className="card-content">

                                                <form>
                                                    <div className="form-group"> <label>Have coupon?</label>
                                                        <div className="input-group"> <input type="text" className="input" name placeholder="Coupon code" />
                                                            <span className="input-group-append">
                                                                <button className="button is-danger is-outlined is-fullwidth ">Apply</button>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </form>

                                            </div> */}
                                        </div>

                                        <div className="card mt-3">
                                            <div className="card-content">
                                                <dl className="is-flex">
                                                    {/* <dt>Total price:</dt>
                                                    <dd className="text-right ml-3">$69.97</dd> */}
                                                </dl>
                                                <dl className="is-flex">
                                                    <dt>Discount:</dt>
                                                    <dd className="text-right text-danger ml-3">- $0.00</dd>
                                                </dl>
                                                <dl className="is-flex">
                                                    <dt>Total:</dt>
                                                    <dd className="text-right text-dark b ml-3"><strong>${sum ? sum : 0}</strong></dd>
                                                </dl>
                                                <hr />
                                                {sum > 0 ? <>

                                                    <StripeCheckout
                                                        shippingAddress
                                                        currency='LKR'
                                                        amount={sum * 100}
                                                        token={bookmovies}
                                                        stripeKey="pk_test_51KON7QSGc2uzmcTNMsY4QEFqEOPT7kUQaFthMpzSvbbeDYNxBvvPTkiZDnQhMMuuLadaLvFR36OxyQBbVKmXkYnT000ZDxnzBd"
                                                    >
                                                        <a href="#" className="button is-primary is-outlined is-fullwidth" data-abc="true"> Make Purchase </a>
                                                    </StripeCheckout>
                                                </> : <></>}

                                                <a href="#" className="button is-info is-outlined mt-2 is-fullwidth" data-abc="true"><Link to="/all">Continue Shopping</Link></a>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            ) : (
                window.location = "/"
            )
            }
        </>

    );
}

export default Cart;