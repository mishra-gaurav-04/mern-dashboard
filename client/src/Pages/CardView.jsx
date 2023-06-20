import React from 'react';
import Card from '../Components/Card';
import {useState,useEffect} from 'react';
import {getAllData} from "../Api/api"

const CardView = () => {
  const [data,setData] = useState([]);

  useEffect(() => {
    const fetchAllData = async() => {
      try{
        const res = await getAllData();
        if(res){
          setData(res.data);
        }
      }
      catch(err){
        console.log('Error fetchin data');
      }
    }
    fetchAllData();
  },[])
  return (
    <div className='container mx-auto mt-5 p-10 '>
     <div className='p-2 ' >
        <h1 className='font-bold text-gray-600 text-4xl'>Data Display</h1>
     </div>
     <div className='grid grid-cols-4 gap-5'>
      {
        data.map((item) => (
          <Card key={item._id} data={item}/>
        ))
      }
    </div>
    </div>
  )
}

export default CardView