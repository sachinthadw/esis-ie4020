import React, { useEffect, useState } from "react";
import axios from '../config/axiosConfig';
import { Link } from 'react-router-dom';

const Login = () => {



  const [userName, setuserName] = useState("")
  const [email, setemail] = useState("kavinduchamith01@gmail.com")
  const [password, setpassword] = useState("Donkavi2@")
  const [test, setTest] = useState(false)
  const [userId, setUserId] = useState('')


  function sendData(e) {
    e.preventDefault();
    const newUser = {
      //userName:userName,
      email: email,
      password
    };

    axios
      .post('http://localhost:8070/user/login', newUser)
      .then((res) => {
        if (res.status !== 200) {
          console.log(res)

        }
        localStorage.setItem("user", JSON.stringify(res.data.user))
        localStorage.setItem("token", res.data.token)

        console.log(res.data.token)
        setUserId(res.data.user._id)
        setTest(!test)

        window.location.href = '/all';

      })
      .catch((err) => {
        alert("Email or Password is worng");
        console.log(err)
      });
  }





  return (
    <>
      <div className='home-div'> </div>

      <section className="hero is-fullheight-with-navbar all-home-flexs">

        <div className="hero-body" style={{ padding: '3rem 0.5rem' }}>
          <div className="container is-widescreen">
            <div className='content '>
              <div className="columns is-justify-content-center">
                <div className="column is-3">
                  <h2 className="subtitle is-2 is-semibold has-text-white has-text-centered">Login</h2>

                  <form onSubmit={sendData}>

                    <div className="mb-3">
                      <input type="email" className="input is-primary" placeholder="Email Address" onChange={(e) => { setemail(e.target.value) }} aria-label="Username" aria-describedby="basic-addon1" required />
                    </div>
                    <div className="mb-3">
                      <input type="password" className="input is-primary" placeholder="Password" onChange={(e) => { setpassword(e.target.value) }} aria-label="Password" aria-describedby="basic-addon1" required />
                    </div>
                    <div>
                      <button type="submit" className="button is-link is-fullwidth">Login</button>
                      <Link to="/register"><button className="button is-danger is-fullwidth mt-2">Register</button></Link>
                      <Link to='/'> <button type="submit" className="button is-success is-fullwidth mt-2">Back to Home Page</button></Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Login;
