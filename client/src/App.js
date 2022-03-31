import React, { useState } from 'react';
import debounce from 'lodash/debounce';
import AppNavbar from './components/AppNavbar';
import { CityList } from './components/CityList';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [search, setSearch] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [forcast, setForcast] = useState([]);

  const handelInputChange = (event) => {
    const { value } = event.target;
    if (value.length > 1) {
      console.log('fetching data');
      fetch(`http://localhost:5000/ap/${value}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => setSearch(data));
    }
  };
  const debouncedHandleChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
    debounce(handelInputChange, 1500)(event);
  };

  const selectedCityIdHandler = (cityAndId) => {
    console.log('selectedCityIdHandler');
    console.log(cityAndId);
    setSearch('');
    setInputValue('');
    // fetch(`http://localhost:5000/api/forcast/${cityAndId.id}`)
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => console.log(data))
    //   .then((logdata) => setForcast(logdata))
    //   .catch((err) => console.log(err));
  };

  return (
    <div className='App'>
      <AppNavbar />
      <input
        type='text'
        name='search'
        placeholder='Search for a city'
        value={inputValue}
        className='search'
        autoComplete='off'
        onChange={debouncedHandleChange}
      />
      {search?.length > 0 && (
        <div className='autocomplete'>
          <CityList items={search} selectedCityId={selectedCityIdHandler} />
        </div>
      )}
    </div>
  );
}

export default App;
