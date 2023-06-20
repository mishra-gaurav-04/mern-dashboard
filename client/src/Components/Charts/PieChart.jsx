import React from 'react';
import { Pie } from 'react-chartjs-2';
import Dropdown from '../Dropdown';

const PieChart = ({title,labels,values,check,dropDownHeading,onSelectItem,dropDownData}) => {
  const handleSelect = (item) =>{
    onSelectItem(item);
  }
  const data = {
    labels: labels,
    datasets: [
      {
        data: values,
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="container  mx-auto bg-white shadow-md p-5 h-auto relative" style={{ width: '700px', height: '400px' }}>
      <div className='text-center'>
        <h1>{title}</h1>
      </div>
      {
        dropDownHeading && <Dropdown title={dropDownHeading} dropData={dropDownData} onSelect={handleSelect}/>
      }
      <div style={{ height: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center',marginTop:'2px'}}>
      {
        check === true ? <h1 className='text-red-600 font-bold text-2xl'>No Data Found</h1> : <Pie data={data} options={options} />
      }
      </div>
    </div>
  );
};

export default PieChart;
