import React, { useState } from 'react';

const Dropdown = ({title,dropData,onSelect}) => {
  const [selectedOption,setSelectedOption] = useState('')
  const handleSelect = (event) => {
   const opt = event.target.value;
   setSelectedOption(opt);
   onSelect(opt);
  };
  // const data = [1,2,3]
  return (
    <div className="dropdown">
      <label htmlFor="year-select" className="text-lg font-semibold text-gray-800">
        {title}:
      </label>
      <select
        id="year-select"
        value={selectedOption}
        onChange={handleSelect}
        className=" block w-full rounded-md bg-white border border-gray-300 px-3 py-2 text-base leading-6 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="">-- Select --</option>
        {
          dropData.map((item) => (
            <option value={item}>{item}</option>
          ))
        }
      </select>
    </div>
  );
};

export default Dropdown;
