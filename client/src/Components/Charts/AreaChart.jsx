import React from 'react';
import { Line } from 'react-chartjs-2';
import Dropdown from '../Dropdown';

const AreaChart = ({title,dropDownHeading,dropDownData,onSelectItem,labels,values}) => {
  const handleSelectedOption = (item) => {
    onSelectItem(item);
  }
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Intensity',
        data: values.intensity,
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Relevance',
        data: values.relevance,
        fill: true,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
      {
        label: 'Liklihood',
        data: values.likelihood,
        fill: true,
        backgroundColor: 'rgba(255, 0, 0, 1)',
        borderColor: 'rgba(1, 54, 246, 0.65)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Property',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Value',
        },
        max : 25,
        min : 0
      },
    },
  };

  return (
    <div className="container mx-auto  bg-white shadow-md p-5 h-auto relative" style={{ width: '700px', height: '400px' }}>
      <div className='text-center'>
        <h1>{title}</h1>
      </div>
     {
        dropDownHeading &&  <Dropdown title={dropDownHeading} dropData={dropDownData} onSelect={handleSelectedOption}/>
     }
      <div style={{ height: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default AreaChart;
