import React, { useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import Dropdown from '../Dropdown';

const LineChart = ({ title, label,onSelectItem,values,dropDownHeading,dropDownData}) => {
  const chartRef = useRef(null);
  const handleSelect = (item) => {
    onSelectItem(item);
  }
  useEffect(() => {
    let chartInstance = null;

    const renderChart = () => {
      if (chartRef.current) {
        if (chartInstance) {
          chartInstance.destroy();
        }

        chartInstance = new Chart(chartRef.current.getContext('2d'), {
          type: 'line',
          data: data,
          options: options,
        });
      }
    };

    renderChart();

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [label, values]);

  const data = {
    labels: label,
    datasets: [
      {
        label: 'Intensity',
        data: values.intensity,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Relevance',
        data: values.relevance,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(28, 232, 103, 0.8)',
        borderWidth: 1,
      },
      {
        label: 'Likelihood',
        data: values.likelihood,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(236, 20, 31, 0.8)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="container mx-auto bg-white shadow-md p-5 h-auto relative" style={{ width: '700px', height: '400px' }}>
     <div className='text-center'>
        <h1>{title}</h1>
      </div>
      {
        dropDownHeading && <Dropdown title={dropDownHeading} onSelect={handleSelect}  dropData={dropDownData}/>
      }
      <div style={{ height: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5px' }}>
        <Line data={data} options={options} ref={chartRef} />
      </div>
    </div>
  );
};

export default LineChart;
