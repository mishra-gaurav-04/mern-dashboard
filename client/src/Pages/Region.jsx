import React from 'react';
import {useState,useEffect} from 'react';
import BarChart from '../Components/Charts/BarChart';
import {getAllRegion,getRegionByName,getAllSector} from '../Api/api';
import PieChart from '../Components/Charts/PieChart';
import LineChart from '../Components/Charts/LineChart';

const Region = () => {
  const [barChartData,setBarChartData] = useState({});
  const [lineChartData,setLineChartData] = useState([]);
  const [sectorData,setSectorData] = useState({});
  const [selectRegion,setSelectRegion] = useState('World');

  
  const handleSelectRegion = (region) => {
    setSelectRegion(region);
  }

  useEffect(() => {
    const fetchAllRegion = async () =>{
      try{
        const res = await getAllRegion();
        if(res){
          setBarChartData(res.data);
        }
      }
      catch(err){
        console.log('Error fecthing data',err);
      }
    }
    const fetchAllSector = async() => {
      try{
        const res = await getAllSector();
        if(res){
          setSectorData(res.data);
        }
      }
      catch(err){
        console.log('Error fetching data',err);
      }
    }
    fetchAllRegion();
    fetchAllSector();
  },[]);
  
  useEffect(() => {
    const fetchRegionByName = async () => {
      try{
        const res = await getRegionByName(selectRegion);
        if(res){
          setLineChartData(res.data);
        }
      }
      catch(err){
        console.log('Error fetching data',err);
      }
    };
    fetchRegionByName();
  },[selectRegion])
  return (
    <div className='container mx-auto p-4'>
      <div>
        <h1 className='text-4xl font-bold text-gray-600'>Region Visualization</h1>
      </div>
      <div className='flex flex-wrap mt-5 gap-4'>
        <BarChart title='Projects Per Region' label={barChartData.region} values={barChartData.itemsCount}/>
        <PieChart labels={barChartData.regionItems ? Object.keys(barChartData.regionItems).map((key) => key) : []} values={barChartData.regionItems ? Object.values(barChartData.regionItems).map((value) => value) : []} title='Project By Region' />
        <LineChart title='Property of Each Region' onSelectItem={handleSelectRegion} label={Object.keys(lineChartData)} values={lineChartData} dropDownHeading='Select Region' dropDownData={barChartData.region ? barChartData.region : []} />
        <BarChart title='Project Based on Sector' label={sectorData.sectorList} values={sectorData.itemsCount}/>
        
      </div>
    </div>
  )
}

export default Region