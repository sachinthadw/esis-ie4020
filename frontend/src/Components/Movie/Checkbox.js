import React, { useState } from "react";

function Checkbox({ areas, handleFilters }) {
    const [checked, setchecked] = useState([])

    const handleToggle = c => {
        const currentcategoryId = checked.indexOf(c)
        const newcheckedcategoryid = [...checked]

        if (currentcategoryId === -1) {
            newcheckedcategoryid.push(c)
        }
        else {
            newcheckedcategoryid.splice(currentcategoryId, 1)
        }

        setchecked(newcheckedcategoryid)
        handleFilters(newcheckedcategoryid)
    }
    return areas.map((c, i) => (
        <div className='title is-6  has-text-white form-inline d-flex align-items-center py-1' key={i}>

            <input type='checkbox' className='checkbox' onChange={(e) => { handleToggle(c._id) }} value={checked.indexOf(c._id === -1)} />
            <label className='tick ml-5'>{c.name}</label>
            <span className="check" />
            
        </div>
    ))
}
export default Checkbox;