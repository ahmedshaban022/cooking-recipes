import React, { useState } from 'react'

const IngrediantsInput = ({fields, setFields}) => {

    // const [fields, setFields] = useState([""])


    const handleChangeInput = (i, e) => {
     
        const values = [...fields]
        values[i] = e.target.value;
        setFields(values)
      }

      const handleAdd = (e,id) => {
          e.preventDefault();
        setFields([...fields, ""])
      }


      const handleSubtract = (e,i) => {
        e.preventDefault();
        const values = [...fields];
        
        values.splice(i, 1)
        setFields([...values])
      }

  return (
    <div>
        {
        fields && fields.map((field,i)=>(
            <div className='row' key={i}>
          <div className="form-floating col-10">
        <input className="form-control mb-3 " value={field} name='ingredient' required onChange={(e)=>handleChangeInput(i,e)} placeholder="Leave a comment here" id="floatingTextarea"></input>
        <label htmlFor="floatingTextarea"> Ingredient</label> 
      </div>
      <div className='col-2 d-flex align-items-start'>
          
           <button  onClick={(e) => handleAdd(e,i)} className=" btn fw-bold fs-4 text-success">
                        +
                      </button>
                      <button  disabled={fields.length=== 1} onClick={(e) => handleSubtract(e,i)} className=" btn text-danger fs-4 fw-bold">
                        -
                      </button>
      </div>
      </div>
        ))
      }
    </div>
  )
}

export default IngrediantsInput