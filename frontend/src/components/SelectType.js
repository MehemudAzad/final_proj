import React from "react";

const SelectType = ({ selectedType, onTypeChange, handleTypeWiseSearch, category }) => {
  const handleTypeChange = (event) => {
    const newType = event.target.value;
    onTypeChange(newType); // Call the callback function with the new value
    console.log(category, newType)
    handleTypeWiseSearch(category, newType);
  };

  return (
    <select
      onChange={handleTypeChange}
      value={selectedType}
      id="countries"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <option>All</option>
      <option>Self-Paced</option>
      <option>Free</option>
      <option>Live</option>
      <option>Classroom</option>
    </select>
  );
};

export default SelectType;
