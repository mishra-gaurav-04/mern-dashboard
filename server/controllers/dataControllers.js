const Data = require('../models/Data');
const { getFilteredData} = require('../factory/factory');
const errorResponse = (res,err) => {
    return res.status(500).json({
        status : 'Fail',
        message : `Internal Server Error :: ${err}`,
    });
}; 
const dataNotFoundError = (res) => {
    return res.status(404).json({
        status : 'fail',
        message : 'Data Not found'
    })
}
const filterData = (data,field) => {
    let response = []
    data.filter((item) => item[field] != "" ).map((item) => {
        if(!response.includes(item[field])){
            response.push(item[field]);
        }
    })
    return response;
}
const filterByName = (data,field,name) => {
    let response = [];
    data.filter((item) => item[field] === name).map((item) => {
        response.push(item);
    })
    return response;
}
const getUniqueValues = (data, propertyName) => {
  const uniqueValues = [...new Set(
    data
      .filter((item) => item[propertyName] !== null)
      .map((item) => item[propertyName])
  )];

  return uniqueValues;
};
exports.getAllData = async(req,res,next) => {{
    try{
        const data = await Data.find();
        if(!data){
           dataNotFoundError(res);
        }
        res.status(200).json({
            status : 'Success',
            data
        })
    }
    catch(err){
        errorResponse(res,err);
    }
}};
exports.getAllProperty = async(req,res,next) => {
    try{
        const data = await Data.find();
        let intensity = [];
        let relevance = [];
        let likelihood = [];
        if(!data){
            dataNotFoundError(res);
         }
         intensity = filterData(data,'intensity');
         relevance = filterData(data,'relevance');
         likelihood = filterData(data,'likelihood');
         res.status(200).json({
            status : 'Success',
            data : {
                intensity,
                relevance,
                likelihood
            }
         })
    }
    catch(err){
        errorResponse(res,err);
    }
}
exports.getAllYears = async (req, res, next) => {
    try {
      const data = await Data.find();
  
      if (!data) {
        dataNotFoundError(res);
      }
      const startYearCounts = {};
      const endYearCounts = {};
      data.forEach((item) => {
        const startYear = item.start_year;
        const endYear = item.end_year;
        if (startYear) {
          startYearCounts[startYear] = startYearCounts[startYear]
            ? startYearCounts[startYear] + 1 : 1;
        }
        if (endYear) {
          endYearCounts[endYear] = endYearCounts[endYear]
            ? endYearCounts[endYear] + 1 : 1;
        }
      });
      const filteredStartYearCounts = Object.fromEntries(
        Object.entries(startYearCounts).filter(([year, count]) => count > 1)
      );
      const filteredEndYearCounts = Object.fromEntries(
        Object.entries(endYearCounts).filter(([year, count]) => count > 1)
      );
      res.status(200).json({
        status: "Success",
        data: {
          startYearCounts: filteredStartYearCounts,
          endYearCounts: filteredEndYearCounts,
        },
      });
    } catch (err) {
      errorResponse(res, err);
    }
    }
  exports.getEndYearByYear = async (req, res, next) => {
    try {
      const year = req.params.year;
      const data = await Data.find();
      let end_year = [];
      if (!data) {
        dataNotFoundError(res);
      }
      end_year = filterByName(data, "end_year", year);
  
      const details = end_year.map((item) => ({
        intensity: item.intensity,
        likelihood: item.likelihood,
        relevance: item.relevance,
      }));
      const uniqueIntensity = getUniqueValues(details, "intensity");
      const uniqueLikelihood = getUniqueValues(details, "likelihood");
      const uniqueRelevance = getUniqueValues(details, "relevance");
      res.status(200).json({
        status: "Success",
        data: {
          intensity: uniqueIntensity,
          likelihood: uniqueLikelihood,
          relevance: uniqueRelevance,
        },
      });
    } catch (err) {
      errorResponse(res, err);
    }
  };
exports.getStartYearByYear = async(req,res,next) => {
    try {
        const year = req.params.year;
        const data = await Data.find();
        let start_year = [];
        if (!data) {
          dataNotFoundError(res);
        }
        start_year = filterByName(data, "start_year", year);
        const details = start_year.map((item) => ({
          intensity: item.intensity,
          likelihood: item.likelihood,
          relevance: item.relevance,
        }));
        const uniqueIntensity = getUniqueValues(details, "intensity");
        const uniqueLikelihood = getUniqueValues(details, "likelihood");
        const uniqueRelevance = getUniqueValues(details, "relevance");
        res.status(200).json({
          status: "Success",
          data: {
            intensity: uniqueIntensity,
            likelihood: uniqueLikelihood,
            relevance: uniqueRelevance,
          },
        });
      } catch (err) {
        errorResponse(res, err);
      }
    };
exports.getAllSector = async (req, res, next) => {
    try {
      let sectorList = [];
      let itemsCount = [];
      let country = {};
      const data = await Data.find();
      if (!data) {
        dataNotFoundError(res);
      }
      sectorList = filterData(data, 'sector');
      const countryList = filterData(data, 'country');
      sectorList.forEach((sector) => {
        country[sector] = {};
        countryList.forEach((countryName) => {
          if (countryName !== '') {
            const count = data.filter(
              (item) => item.sector === sector && item.country === countryName
            ).length;
  
            if (count > 0) {
              if (count < 50) {
                itemsCount.push(count);
              }
  
              country[sector][countryName] = count;
            }
          }
        });
      });
      res.status(200).json({
        status: 'Success',
        data: {
          sectorList,
          itemsCount,
          country
        },
      });
    } catch (err) {
      errorResponse(res, err);
    }
  };
  exports.getSectorByName = async (req, res, next) => {
    try {
      const sectorName = req.params.name;
      const data = await Data.find();
      if (!data) {
        dataNotFoundError(res);
      }
      const filteredSectors = data.filter(item => item.sector === sectorName);
      const countryProjects = {};
      filteredSectors.forEach(item => {
        const country = item.country;
        if(country !== ""){
          if (!countryProjects[country]) {
            countryProjects[country] = 1;
          } else {
            countryProjects[country]++;
          }
        }
      });
      res.status(200).json({
        status: 'Success',
        sector: sectorName,
        data : {
          countryProjects,
        }
      });
    } catch (err) {
      errorResponse(res, err);
    }
  };
exports.getAllRegion = async (req, res, next) => {
  try {
    const data = await Data.find();
    if (!data) {
      dataNotFoundError(res);
    }
    let region = [];
    let regionItems = {};
    let itemsCount = [];
    data.forEach((item) => {
      if (item.region && item.region.trim().length > 0) {
        const regionName = item.region.trim();
        if (!region.includes(regionName)) {
          region.push(regionName);
        }
        if (regionName.includes('Asia')) {
          regionItems['Asia'] = (regionItems['Asia'] || 0) + 1;
        } else if (regionName.includes('America')) {
          regionItems['America'] = (regionItems['America'] || 0) + 1;
        } else if (regionName.includes('Africa')) {
          regionItems['Africa'] = (regionItems['Africa'] || 0) + 1;
        } else if (regionName.includes('Europe')) {
          regionItems['Europe'] = (regionItems['Europe'] || 0) + 1;
        } else if (regionName.includes('World')) {
          regionItems['World'] = (regionItems['World'] || 0) + 1;
        }
      }
    });
    itemsCount = region.map((item) => {
      const count = data.filter((it) => it.region.trim() === item).length;
      return count;
    });
    res.status(200).json({
      status: 'Success',
      data: {
        region,
        regionItems,
        itemsCount
      }
    });
  } catch (err) {
    errorResponse(res, err);
  }
};
exports.getRegionByName = async(req,res,next) => {
    try{
        const name = req.params.name;
        let region = [];
        const data = await Data.find();
        if(!data){
            dataNotFoundError(res);
        }
        region = filterByName(data,'region',name);

        const details = region.map((item) => ({
          intensity : item.intensity,
          likelihood : item.likelihood,
          relevance : item.relevance
        }));
        const uniqueIntensity = [... new Set(
          details
            .filter((item) => item.intensity !== null)
            .map((item) => item.intensity )
        )];

        const uniqueLikelihood = [...new Set(
          details
            .filter((item) => item.likelihood !== null)
            .map((item) => item.likelihood)
        )];

        const uniqueRelevance = [...new Set(
          details
            .filter((item) => item.relevance !== null)
            .map((item) => item.relevance)
        )];

        res.status(200).json({
            status : 'Success',
            data : {
              intensity : uniqueIntensity,
              likelihood : uniqueLikelihood,
              relevance : uniqueRelevance
            }
        });
    }
    catch(err){
        errorResponse(res,err);
    }
};
exports.getAllTopics = async(req,res,next) => { 
    try{
      const data = await Data.find();
      if(!data){
        dataNotFoundError(res);
      }
      const topicCounts = {};
      data.forEach((item) => {
        const topic = item.topic;
        if(topic !== ""){
          if(topicCounts[topic]){
            topicCounts[topic]++;
          }
          else{
            topicCounts[topic] = 1;
          }
        }
      });
        const sortedTopic = Object.keys(topicCounts).sort(
        (a,b) => topicCounts[b] - topicCounts[a]
      );
      const top10topics = sortedTopic.slice(0,10);
      const topicList = top10topics.map((item) => item);
      const countList = top10topics.map((item) => topicCounts[item]);
      res.status(200).json({
        status : 'Success',
        data : {
          topicList,
          countList
        }
      });
    }
    catch(err){
      errorResponse(res,err);
    }
};
exports.getTopicByName = async (req,res,next) => {
  try{
    const name = req.params.name;
    let topics = [];
    const data = await Data.find();
    if(!data){
      dataNotFoundError(res);
    }
    topics = filterByName(data,'topic',name);
    const details = topics.map((item) => ({
      intensity : item.intensity,
      liklihood : item.likelihood,
      relevance : item.relevance
    }));
    const uniqueIntensity = getUniqueValues(details, "intensity");
    const uniqueLikelihood = getUniqueValues(details, "likelihood");
    const uniqueRelevance = getUniqueValues(details, "relevance");
    res.status(200).json({
      status : 'Success',
      data : {
        intensity : uniqueIntensity,
        likelihood : uniqueLikelihood,
        relevance : uniqueRelevance
      }
    })
  }
  catch(err){
    errorResponse(ress,err);
  }
}
exports.getAllSource = async (req, res, next) => {
  try {
    const data = await Data.find();
    if (!data) {
      dataNotFoundError(res);
    }
    const sourceCounts = {};
    data.forEach((item) => {
      const source = item.source;
      if (sourceCounts[source]) {
        sourceCounts[source]++;
      } else {
        sourceCounts[source] = 1;
      }
    });
    const sortedSources = Object.keys(sourceCounts).sort(
      (a, b) => sourceCounts[b] - sourceCounts[a]
    );
    const top10Sources = sortedSources.slice(0, 10);
    const sourceList = top10Sources.map((source) => source);
    const countList = top10Sources.map((source) => sourceCounts[source]);
    res.status(200).json({
      status: 'Success',
      data: {
        sourceList,
        countList,
      },
    });
  } catch (err) {
    errorResponse(res, err);
  }
};
exports.getSourceByName = async(req,res,next) => {
  try{
    const name = req.params.name;
    let source = [];
    const data = await Data.find();
    if(!data){
      dataNotFoundError(res);
    }
    source = filterByName(data,'source',name);
    const details = source.map((item) => ({
      intensity : item.intensity,
      liklihood : item.likelihood,
      relevance : item.relevance
    }));
    const uniqueIntensity = getUniqueValues(details, "intensity");
    const uniqueLikelihood = getUniqueValues(details, "likelihood");
    const uniqueRelevance = getUniqueValues(details, "relevance");
    res.status(200).json({
      status : 'Success',
      data : {
        intensity : uniqueIntensity,
        likelihood : uniqueLikelihood,
        relevance : uniqueRelevance
      }
    })
  }
  catch(err){
    errorResponse(res,err);
  }
};

exports.getAllPestel = async(req,res,next) => {
    try{
        const response = await getFilteredData('pestle');
        res.status(200).json(response);
    }
    catch(err){
        errorResponse(res,err);
    }
};
exports.getPestelByName = async(req,res,next) => {
  try{
    const name = req.params.name;
    let pestle = [];
    const data = await Data.find();
    if(!data){
      dataNotFoundError(res);
    }
    pestle = filterByName(data,'pestle',name);
    const details = pestle.map((item) => ({
      intensity : item.intensity,
      liklihood : item.likelihood,
      relevance : item.relevance
    }));
    const uniqueIntensity = getUniqueValues(details, "intensity");
    const uniqueLikelihood = getUniqueValues(details, "likelihood");
    const uniqueRelevance = getUniqueValues(details, "relevance");
    res.status(200).json({
      status : 'Success',
      data : {
        intensity : uniqueIntensity,
        likelihood : uniqueLikelihood,
        relevance : uniqueRelevance
      }
    })
  }
  catch(err){
    errorResponse(res,err);
  }
};
exports.getAllCountry = async (req,res,next) => {
  try{
    const response = await getFilteredData('country');
    res.status(200).json(response);
  }
catch(err){
    errorResponse(res,err);
  }
};
exports.getCountryByName = async(req,res,next) => {
  try{
    const name = req.params.name;
    let country = [];
    const data = await Data.find();
    if(!data){
      dataNotFoundError(res);
    }
    country = filterByName(data,'country',name);
    const details = country.map((item) => ({
      intensity : item.intensity,
      liklihood : item.likelihood,
      relevance : item.relevance
    }));
      const uniqueIntensity = getUniqueValues(details, "intensity");
      const uniqueLikelihood = getUniqueValues(details, "likelihood");
      const uniqueRelevance = getUniqueValues(details, "relevance");
    res.status(200).json({
      status : 'Success',
      data : {
        intensity : uniqueIntensity,
        likelihood : uniqueLikelihood,
        relevance : uniqueRelevance
      }
    })
  }
  catch(err){
    errorResponse(res,err);
  }
}