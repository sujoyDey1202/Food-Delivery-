import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'
const List = ({url}) => {

    const [list, setList] = useState([]);
    const fetchList = async()=>{
      const responce = await axios.get(`${url}/api/food/list`);
      console.log(responce.data);
    if(responce.data.success){
      setList(responce.data.data);
    }
    else {
      toast.error("Error");
    }
  }

    const removeFood = async(foodId)=>{
        const responce = await axios.post(`${url}/api/food/remove`,{id:foodId});
        await fetchList();
        if(responce.data.success){
          toast.success(responce.data.massage);
        }
        else {
          toast.error("Error");
        }
    }

      useEffect(()=>{
        fetchList();
      },[]);

  return (
    <div className='list add flex-col'>
      <h2>All Food List</h2>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return(
            <div className="list-table-format" key={index}>
              <img src={`${url}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List