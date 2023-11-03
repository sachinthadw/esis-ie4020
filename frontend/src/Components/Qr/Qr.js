import React, { useState, useRef } from 'react';
import QRCode from 'qrcode';
import {Link} from 'react-router-dom'
function Qr() {
  //useStates
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  // const [scanResultFile, setScanResultFile] = useState('');
  // const [scanResultWebCam, setScanResultWebCam] = useState('');

  // const qrRef = useRef(null);

  //function for Qr Code Generate
  const generateQrCode = async () => {
    try {
      //create object and passing into data
      const response = await QRCode.toDataURL(text);
      //set image url in to setImageUrl
      setImageUrl(response);
    } catch (error) {
      console.log(error);
    }
  }
  // //function fro qr reader
  // const handleErrorFile = (error) => {
  //   console.log(error);
  // }
  // const handleScanFile = (result) => {
  //   if (result) {
  //     setScanResultFile(result);
  //   }
  // }
  // //upload image
  // const onScanFile = () => {
  //   qrRef.current.openImageDialog();
  // }
  // const handleErrorWebCam = (error) => {
  //   console.log(error);
  // }
  // const handleScanWebCam = (result) => {
  //   if (result) {
  //     setScanResultWebCam(result);
  //   }
  // }
  return (
    <div className='container is-max-widescreen'>
      <h2><b>QR Code</b></h2>
          <Link to="/qrread"> <a>Scan Page</a></Link>
          <br /><br />
      <div className="columns">
        <div className="column is-half">
          <b>Text : </b><input type="text" onChange={(e) => setText(e.target.value)} required />
          <br /><br />
          <button className="button is-danger" onClick={(e) => { generateQrCode() }}>Generate</button>
          <br /><br />
          {imageUrl ? (<a href={imageUrl} download> <img src={imageUrl} alt="img" /><br />Click to Download</a>) : null}
          <br />
        </div>

        {/* <div className="column">
          <button onClick={(e) => { onScanFile() }}>scan to Insert</button>
          <QrReader
            ref={qrRef}
            delay={300}
            style={{ width: '100%' }}
            onError={handleErrorFile}
            onScan={handleScanFile}
            legacyMode
          />
          <h3>Scanned Code: {scanResultFile}</h3>
        </div>
        <div className="column">
          <h3>Qr Code Scan by Web Cam</h3>
          <QrReader
            delay={300}
            style={{ width: '100%' }}
            onError={handleErrorWebCam}
            onScan={handleScanWebCam}
          />
          <h3>Scanned By WebCam Code: {scanResultWebCam}</h3>
        </div> */}

      </div>
    </div>
  )
}

export default Qr