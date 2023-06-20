import React from 'react';
import BarChart from '../Components/Charts/BarChart';
import { getAllYears,getEndYearByYear,getStartYearByYear} from '../Api/api';
import {useState,useEffect} from 'react';
import AreaChart from '../Components/Charts/AreaChart';


const Year = () => {
  const [endYearData,setEndYearData] = useState([]);
  const [startYearData,setStartYearData] = useState([]);
  const [filterStartYear,setFilterStartYear] = useState([]);
  const [filterEndYear,setFilterEndYear] = useState([]);
  const [selectEndYear,setSelectEndYear] = useState('2017');
  const [selectStartYear,setSelectStartYear] = useState('2017');

  const handleSelectStartYear = (year) => {
    setSelectStartYear(year);
  }
  const handleSelectEndYear = (year) => {
    setSelectEndYear(year);
  }

  useEffect(() => {
    const fetchAllYear = async() => {
      try{
        const res = await getAllYears();
        if(res){
          setStartYearData(res.data.startYearCounts);
          setEndYearData(res.data.endYearCounts);
        }
      }
      catch(err){console.log('Start Year Data',startYearData);
        console.log('Error fetching the data ',err);
      }
    };
    
    fetchAllYear();
  },[])
  
  useEffect(() => {
    const fetchEndYear = async () => {
      try{
        const res = await getEndYearByYear(selectEndYear);
        if(res){
          setFilterEndYear(res.data);
        }
      }
      catch(err){
        console.log('Error Fetching data',err);
      }
    }
    const fetchStartYear = async () => {
      try{
        const res = await getStartYearByYear(selectStartYear);
        if(res){
          setFilterStartYear(res.data);
        }
      }
      catch(err){
        console.log('Error fetching data',err);
      }
    }
    fetchEndYear();
    fetchStartYear();
  },[selectEndYear,selectStartYear])

  return (
    <div className='container mx-auto p-5'>
      <div className='text-4xl font-bold text-gray-600'>
        <h1>Year Visualisation</h1>
      </div>
      <div className='flex flex-wrap mt-5 gap-3'>
        <BarChart title='Projects By End Year' label={Object.keys(endYearData)} values={Object.values(endYearData)}/>
        <BarChart title='Projects By Start Year' label={Object.keys(startYearData)} values={Object.values(startYearData)}/>
        <AreaChart title='Start Year Example' dropDownHeading='Select Start Year' dropDownData={Object.keys(startYearData)} onSelect={handleSelectStartYear} labels={Object.keys(filterStartYear)} values={filterStartYear}/>
        <AreaChart title='End Year Example' dropDownHeading='Select End Year' dropDownData={Object.keys(endYearData)} onSelect={handleSelectEndYear} labels={Object.keys(filterEndYear)} values={filterEndYear}/>
      </div>
    </div>
  )
}

export default Year