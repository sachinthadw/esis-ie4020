import React, { useState, useRef, useEffect } from 'react';
import QrReader from 'react-qr-reader';
import NavBar_Home from '../Home/NavBar_Home';
function QrRead() {
  //useStates
  const [scanResultFile, setScanResultFile] = useState();
  const [scanResultWebCam, setScanResultWebCam] = useState('');
  const [scanitems, setscanitems] = useState([])
  const [type, settype] = useState(true)
  const [movie, setmovie] = useState()

  const qrRef = useRef(null);

  useEffect(() => {
    setmovie(null)
  }, [type])

  //function fro qr reader
  const handleErrorFile = (error) => {
    console.log(error);
  }
  const handleScanFile = (result) => {
    if (result) {
      // setScanResultFile(result);
      // console.log(result);

      setmovie(JSON.parse(result))
    }
  }
  //upload image
  const onScanFile = () => {
    qrRef.current.openImageDialog();
  }
  const handleErrorWebCam = (error) => {
    console.log(error);
  }
  const handleScanWebCam = (result) => {
    if (result) {

      setmovie(JSON.parse(result))
    }
  }
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
    <div>
      <NavBar_Home />
      <section className="hero is-fullheight-with-navbar movie-div all-home-flexs">

        <div className="hero-body">
          <div className='container is-max-widescreen'>

            <div className="columns card">
              <div className="column is-half">

                {type ? <>
                  <button className="button is-success" onClick={(e) => { settype(!type) }}><i className="fa fa-camera" aria-hidden="true"></i>Use Camera</button>
                  <QrReader
                    ref={qrRef}
                    delay={300}
                    style={{ width: '525px', backgroundColor: '#fff' }}
                    onError={handleErrorFile}
                    onScan={handleScanFile}
                    legacyMode
                  />
                  <div className="has-text-centered">
                    <button className="button is-danger " onClick={(e) => { onScanFile() }}>scan to Insert</button>
                  </div>
                </> : <>
                  <div className="has-text-centered">
                    <button className="button is-warning " onClick={(e) => { settype(!type) }}><i className="fa fa-picture-o" aria-hidden="true"></i>Use Image</button>
                  </div>
                  <QrReader
                    delay={300}
                    style={{ width: '580px', backgroundColor: '#fff' }}
                    onError={handleErrorWebCam}
                    onScan={handleScanWebCam}
                  />

                </>}
              </div>
              <div className="column">
                <div>
                  {movie ? <>
                    <div className="card" style={{ width: '16rem' }}>
                      <div className="card-image">
                        <figure className="image ">
                          <img src={"http://localhost:8070/" + movie.image} className="card-img-top" alt="..." />
                        </figure>
                      </div>
                      <div className="card-content">
                        <div className="">
                          <div className="card-body">
                            <h2 className="card-title"><b>{movie.name}</b></h2>
                            <p className="card-text">{movie.seats+', '}</p>
                          </div>
                          <ul className="">
                            <li className="list-group-item">{"Date = " + movie.date}</li>
                            { getTime(movie.time)}
                            <li className="list-group-item">{"Time = " + range}</li>
                            <li className="list-group-item">{"#Tickets = " + movie.seats.length}</li>
                            <li className="list-group-item">{"Ticket Price = " + movie.price}</li>
                            <li className="list-group-item">{"Total Price = " + (movie.price * movie.seats.length)}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </> : <>

                  </>}


                </div>


              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default QrRead