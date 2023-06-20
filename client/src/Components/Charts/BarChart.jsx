import React from 'react';
import { Bar } from 'react-chartjs-2';


const BarChart = ({label,values,title}) => {
  const dataSet = {
    labels: label,
    datasets: [
      {
        label: 'Project Count',
        data: values,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className='container mx-auto bg-white shadow-md p-5 h-auto relative' style={{ width: '700px', height: '400px' }}>
  <div className='text-center'>
    <h1>{title}</h1>
  </div>
  <div style={{ height: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center' ,marginTop : "5px"}}>
    <Bar data={dataSet} options={options} />
  </div>
</div>

  );
};

export default BarChart;
