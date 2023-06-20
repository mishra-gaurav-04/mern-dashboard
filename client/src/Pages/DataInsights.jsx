import React, { useState, useEffect } from 'react';
import BarChart from '../Components/Charts/BarChart';
import {  getAllSector,
   getSectorByName,
   getAllPestel,
   getAllSource,
   getAllTopics,
  getCountryByName,getSourceByName,getPestleByName,getTopicByName, getAllCountry } from '../Api/api';
import PieChart from '../Components/Charts/PieChart';
import LineChart from '../Components/Charts/LineChart';
import AreaChart from '../Components/Charts/AreaChart';

const DataInsights = () => {
  const [sectorData, setSectorData] = useState({});
  const [filterSectorData, setFilterSectorData] = useState({});
  const [selectSector, setSelectSector] = useState('Energy');
  const [pestleData,setPestleData] = useState({});
  const [barSourceData,setBarSourceData] = useState({});
  const [barTopicData,setBarTopicData] = useState({});
  const [filterCountryData,setFilterCountryData] = useState({});
  const [filterTopicData,setFilterTopicData] = useState({});
  const [filterSourceData,setFilterSourceData] = useState({});
  const [filterPestleData,setFilterPestleData] = useState({});
  const [countryData,setCountryData] = useState([]);
  const [selectCountry,setSelectCountry] = useState('India');
  const [selectTopic,setSelectTopic] = useState('oil');
  const [selectSource,setSelectSource] = useState('OPEC');
  const [selectPestle,setSelectPestle] = useState('Industries');

  const handleSelectSector = (sector) => {
    setSelectSector(sector);
  };
  const handleSelectCountry = (country) => {
    setSelectCountry(country);
  };
  const handleSelectTopic = (topic) => {
    setSelectTopic(topic);
  };
  const handleSelectSource = (source) => {
    setSelectSource(source);
  };
  const handleSelectPestle = (pest) => {
    setSelectPestle(pest);
  };

  useEffect(() => {
    const fetchAllSector = async () => {
      try {
        const res = await getAllSector();
        if (res) {
          setSectorData(res.data);
        }
      } catch (err) {
        console.log('Error fetching data', err);
      }
    };
    const fetchAllPestle = async () => {
      try{
        const res = await getAllPestel();
        if(res){
          setPestleData(res.data);
        } 
      }
      catch(err){
        console.log('Error fetching data',[])
      }
    };
    const fetchAllSources = async () => {
      try{
        const res = await getAllSource();
        if(res){
          setBarSourceData(res.data);
        }
      }
      catch(err){
        console.log('Error fecthing data',err);
      }
    };
    const fetchAllTopics = async () =>{
      try{
        const res = await getAllTopics();
        if(res){
          setBarTopicData(res.data);
        }
      }
      catch(err){
        console.log('Error fetching data',err);
      };
    };
    const fetchAllCountry = async () => {
      try{
        const res = await getAllCountry();
        if(res){
          setCountryData(res.data);
        }
      }
      catch(err){
        console.log('Error fetching Data',err);
      }
    };
    fetchAllSources(); fetchAllPestle();fetchAllSector();fetchAllTopics();fetchAllCountry();
  }, []);

  useEffect(() => {
    const fetchSectorByName = async () => {
      try {
        const res = await getSectorByName(selectSector);
        if (res) {
          setFilterSectorData(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    const fetchCountryByName = async () => {
      try{
        const res = await getCountryByName(selectCountry);
        if(res){
          setFilterCountryData(res.data);
        }
      }
      catch(err){
        console.log('Error fetching data',err);
      }
    };
    const fetchTopicByName = async() => {
      try{
        const res = await getTopicByName(selectTopic);
        if(res){
          setFilterTopicData(res.data);
        }
      }
      catch(err){
        console.log('Error fetching data',err);
      }
    };
    const fetchSourceByName = async() => {
      try{
        const res = await getSourceByName(selectSource);
        if(res){
          setFilterSourceData(res.data);
        }
      }
      catch(err){
        console.log('Error fetching data',err);
      }
    };const fetchPestleByName = async() => {
      try{
        const res = await  getPestleByName(selectPestle);
        if(res){
          setFilterPestleData(res.data);
        }
      }
      catch(err){
        console.log('Error fetching data',err);
      }
    };

    fetchSectorByName();fetchCountryByName();fetchTopicByName();fetchSourceByName();fetchPestleByName();
  }, [selectSector,selectCountry,selectPestle,selectSource,selectTopic]);
  console.log('filter c data',filterCountryData); 
  return (
    <div className="container mx-auto ">
      <div>
        <h1 className="text-4xl text-gray-600 font-bold">Country Based Visualization</h1>
      </div>
      <div className="flex flex-wrap mt-5 gap-3 ">
        <PieChart title="Sector and County Insight" onSelectItem={handleSelectSector} dropDownHeading="Select Sector" dropDownData={sectorData.sectorList ? sectorData.sectorList : []} label={filterSectorData.countryProjects ? Object.keys(filterSectorData.countryProjects).map((key) => key) : []} values={filterSectorData.countryProjects ? Object.values(filterSectorData.countryProjects).map((value) => value) : []} />
        <PieChart title='Project By Pestle' labels={pestleData.pestel} values={pestleData.itemCount}/>
        <BarChart title='Project By Top 10 Sources' label={barSourceData.sourceList} values={barSourceData.countList}/>
        <BarChart title='Project By Top 10 Topics' label={barTopicData.topicList} values={barSourceData.countList}/>
        <AreaChart title='Property of Pestle' dropDownHeading='Select Pestle' dropDownData={pestleData.pestel ? pestleData.pestel : []} labels={filterPestleData ? Object.keys(filterPestleData).map((item) => item) : []} values={filterPestleData ? filterPestleData : {}} onSelectItem={handleSelectPestle}/>
        <AreaChart title='Property of Source' dropDownHeading='Select Source' dropDownData={barSourceData.sourceList ? barSourceData.sourceList : []} labels={filterSourceData ? Object.keys(filterSourceData).map((item) => item) : []} values={filterSourceData ? filterSourceData : {}} onSelectItem={handleSelectSource}/>
        <LineChart title='Property By Topics' dropDownHeading='Select Topic' dropDownData={barTopicData.topicList ?barTopicData.topicList : []} label={filterTopicData ? Object.keys(filterTopicData).map((item) => item) : []} values={filterTopicData ? filterTopicData : {}} onSelectItem={handleSelectTopic}/>
        <LineChart title='Property By Country' dropDownHeading='Select Country' dropDownData={countryData.countries ? countryData.countries : []} label={filterCountryData ? Object.keys(filterCountryData).map((item) => item) : []} values={filterCountryData ? filterCountryData : {}} onSelectItem={handleSelectCountry}/>
      </div>
    </div>
  );
};

export default DataInsights;
