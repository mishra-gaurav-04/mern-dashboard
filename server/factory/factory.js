const Data = require('../models/Data');

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

const getFilteredData = async (filterProperty) => {
    try {
      let filteredData = [];
      let itemCount = [];
      const data = await Data.find();
      if (!data) {
        throw new Error('Data not found');
      }
      filteredData = filterData(data, filterProperty);
      filteredData.forEach((item) => {
        const count = data.filter((it) => it[filterProperty] === item).length;
        itemCount.push(count);
      });
      return {
        status: 'Success',
        data: {
          [filterProperty]: filteredData,
          itemCount,
        },
      };
    } catch (err) {
      throw err;
    }
  };

module.exports = {
    getFilteredData
}