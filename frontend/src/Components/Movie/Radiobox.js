import React, { useState } from 'react';
//import { Radio } from 'antd';

function Radiobox({ groups, handleFilters }) {

    const [Radio, setRadio] = useState('')

    const [value, setvalue] = useState(0)
    function handlechange(e) {
        handleFilters(e.target.value)
        setvalue(e.target.value)
    }
    return groups.map((p, i) => (
        <div key={i}>
            <input type="radio"  value={`${p._id}`} onChange={(e) => { handlechange(e) }} name="rad" />           
            <label className=' ml-5 title is-6  has-text-white'>{p.name}</label><br /> <br /> 
        </div >
    ))
    //
}

export default Radiobox;