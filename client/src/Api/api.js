import axios from 'axios'; 


const baseUrl = 'http://localhost:5001/api';

export const getAllData = async () => {
  try {
    const response = await axios.get(baseUrl + '/');
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllSector = async () => {
  try{
    const response = await axios.get(baseUrl + '/sector');
    return response.data;
  }
  catch(err){
    console.log(err);
    return null
  }
};

export const getAllProperty = async () => {
  try{
    const response = await axios.get(baseUrl + '/property');
    return response.data;
  }
  catch(err){
    console.log(err);
    return null
  }
};

export const getAllCountry = async () => {
  try{
    const response = await axios.get(baseUrl + '/country');
    return response.data;
  }
  catch(err){
    console.log(err);
    return null;
  }
};

export const getAllRegion = async () => {
  try{
    const response = await axios.get(baseUrl + '/region');
    return response.data;
  }
  catch(err){
    console.log(err);
    return null;
  }
};

export const getAllYears = async() => {
  try{
    const response = await axios.get(baseUrl + '/year');
    return response.data;
  }
  catch(err){
    console.log(err);
    return null;
  }
};

export const getEndYearByYear = async (year) => {
  try{
    const response = await axios.get(baseUrl + `/end-year/${year}`);
    return response.data;
  }
  catch(err){
    console.log(err);
    return null
  }
};

export const getStartYearByYear = async (year) => {
  try{
    const response = await axios.get(baseUrl + `/start-year/${year}`);
    return response.data;
  }
  catch(err){
    console.log(err);
    return null;
  }
};

export const getRegionByName = async (region) => {
  try{
    const response = await axios.get(baseUrl + `/region/${region}`);
    return response.data
  }
  catch(err){
    console.log(err);
    return null;
  }
};

export const getSectorByName = async(sector) => {
  try{
    const response = await axios.get(baseUrl + `/sector/${sector}`);
    return response.data;
  }
  catch(err){
    console.log(err);
    return null;
  }
};


export const getAllPestel = async() => {
  try{
    const response = await axios.get(baseUrl + '/pestle');
    return response.data;
  }
  catch(err){
    console.log(err);
    return null;
  }
};

export  const getAllSource = async() => {
  try{
    const response = await axios.get(baseUrl + '/source');
    return response.data;
  }
  catch(err){
    console.log(err);
    return null;
  }
};

export const getAllTopics = async ()=>{
  try{
    const response = await axios.get(baseUrl + '/topic');
    return response.data;
  }
  catch(err){
    console.log(err);
    return null;
  }
};

export const getTopicByName = async (topic) => {
  try{
    const response = await axios.get(baseUrl + `/topic/${topic}`)
    return response.data
  }
  catch(err){
    console.log(err);
    return null;
  }
};

export const getSourceByName = async (source) => {
  try{
    const response = await axios.get(baseUrl + `/source/${source}`)
    return response.data
  }
  catch(err){
    console.log(err);
    return null;
  }
};
export const getPestleByName = async (pest) => {
  try{
    const response = await axios.get(baseUrl + `/pestle/${pest}`)
    return response.data
  }
  catch(err){
    console.log(err);
    return null;
  }
};
export const getCountryByName = async (country) => {
  try{
    const response = await axios.get(baseUrl + `/country/${country}`)
    return response.data
  }
  catch(err){
    console.log(err);
    return null;
  }
};