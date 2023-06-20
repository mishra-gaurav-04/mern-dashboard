import React from 'react';
import BarChart from '../Components/Charts/BarChart';
import LineChart from '../Components/Charts/LineChart';
import PieChart from '../Components/Charts/PieChart';
import {getAllSector,
        getAllProperty,
        getAllCountry,
        getAllRegion} from '../Api/api'; 
import {useEffect,useState} from 'react';
const Home = () => {
  const [barData,setBarData] = useState([]);
  const [lineData,setLineData] = useState([]);
  const [countryData,setcountryData] = useState([]);
  const [regionData,setRegionData] = useState([]);

  useEffect(() => {
    const fetchSectorData = async() => {
      try{
        const res = await getAllSector();
        if(res){
          setBarData(res.data);
        }
      }
      catch(err){
        console.log('Error fetching data',err);
      }
    };
    const fetchAllProperty = async() => {
      try{
        const res = await getAllProperty();
        if(res){
          setLineData(res.data);
        }
      }
      catch(err){
        console.log('Error fetching data',err);
      }
    };
    const fetchAllCountry = async() => {
      try{
        const res = await getAllCountry();
        if(res){
          setcountryData(res.data);
        }
      }
      catch(err){
        console.log(err);
      }
    };
    const fetchAllRegion = async() => {
      try{
        const res = await getAllRegion();
        if(res){
          setRegionData(res.data);
        }
      }
      catch(err){
        console.log('Error fetcing data',err);
      }
    } 
    fetchAllProperty();
    fetchSectorData();
    fetchAllCountry();
    fetchAllRegion();
  },[])

  return (
   <div className='container mx-auto p-4'>
    <div>
      <h1 className='text-4xl text-gray-600 font-bold'>Data Visualization DashBoard</h1>
    </div>
    <div className='flex flex-wrap mt-5 gap-3'>
      <BarChart label={barData.sectorList} values={barData.itemsCount} title='Projects in Each Sector'/>
      <LineChart title='Project Properties' label={barData.sectorList} values={lineData}/>
      <PieChart labels={regionData.regionItems ? Object.keys(regionData.regionItems).map((key) => key) : []} values={regionData.regionItems ? Object.values(regionData.regionItems).map((value) => value) : []} title='Project By Region' />
      <BarChart title='Projects By country' label={countryData.countries} values={countryData.itemCount}/> 
    </div>
   </div>
  );
};

export default Home;
