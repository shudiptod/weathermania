import axios from "axios";
import React, { useState, useEffect } from 'react';
import Search from './Search'
import {Card, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css';

function App() {

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [weather, setWeather] = useState('');
  const [temperature, setTemperature] = useState(0);
  const [cityName, setCityName] = useState('');
  const [query, setQuery] = useState('');
  const [isloading, SetIsLoading] = useState(true);
  const [flag, setFlag] = useState(false);

  const savePositionToState = async (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  }

  useEffect(
    () => {
      const fetchWeather = async () => {

        try {
          console.log('f--/');
          if (query === '' && flag === true) {
            SetIsLoading(true);
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=1c80d4c4a37d47802e1660be6d8f52de`);

            //console.log(res.data);
            setTemperature(res.data.main.temp);
            setCityName(res.data.name);
            setWeather(res.data.weather[0].main);
            SetIsLoading(false);

          }
          else if (query==='' && flag === false) {
            SetIsLoading(true);
            await window.navigator.geolocation.getCurrentPosition(savePositionToState);
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=1c80d4c4a37d47802e1660be6d8f52de`);
            console.log(res.data);
            setTemperature(res.data.main.temp);
            setCityName(res.data.name);
            setWeather(res.data.weather[0].main);
            SetIsLoading(false);
            setFlag(true);
          }
          else {
            SetIsLoading(true);
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=1c80d4c4a37d47802e1660be6d8f52de`);
            setTemperature(res.data.main.temp);
            setCityName(res.data.name);
            setWeather(res.data.weather[0].main);
            SetIsLoading(false);
          }


        }
        catch (error) {
          console.log(error);
        }
      }

      fetchWeather();
    }
    , [latitude, longitude, query])

  return (
    isloading ?
      (
        <Container className="shadow-lg p-3 mb-5 bg-white rounded" style={{width:'18rem','marginTop':'150px' ,padding:'10px'}} >
        <Card style={{ width: '100%' }}>
        <Card.Body>
          <Card.Title style={{'alignText':'center','paddingLeft':'20px'}}>Weather Mania</Card.Title>

          <Search getQuery={(q) => {
            setQuery(q);
          }} />
          <Card.Text style={{padding:'20px', color:'green'}}>

          Loading...

          </Card.Text>
        </Card.Body>
      </Card >
      </Container>)
      :
      (
        <Container className="shadow-lg p-3 mb-5 bg-white rounded" style={{width:'18rem','marginTop':'150px',padding:'10px'}} >
        <Card style={{ width: '100%' }}>
          <Card.Body>
            <Card.Title style={{'alignText':'center','paddingLeft':'20px',paddingBottom:'10px'}}> Weather Mania </Card.Title>

            <Search getQuery={(q) => {
              setQuery(q);
            }} />
            <Card.Text style={{padding:'20px'}}>
              <p>{cityName}</p>
              <p>{temperature}°C</p>
              <p>{weather}</p>

            </Card.Text>
          </Card.Body>
        </Card >
        </Container>
      )
  );
}

export default App;
