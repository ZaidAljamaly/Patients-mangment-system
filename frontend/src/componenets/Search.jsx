import React,{useState} from 'react'
export default function Search({searchText}) {
    const[text,setText] = useState()
    const sub = (e)=>{
        e.preventDefault();
        searchText(text);
    }
  return (
      <form onSubmit={sub}>
         <input onChange={e=>setText(e.target.value)} type=" text" placeholder='Key words' className="form-control"/>
          <button className='btn btn-primary w-5'>search</button>
      </form>

  )
}
