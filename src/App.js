import axios from "axios";
import React, { useState, useEffect } from 'react';
import Search from './Search'
import { Card, Container, Row, Col } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css'

function App() {

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const [weather_1, setWeather_1] = useState('');
  const [icon_1, setIcon_1] = useState('');
  const [weather_2, setWeather_2] = useState('');
  const [icon_2, setIcon_2] = useState('');

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
            setWeather_1(res.data.weather[0].description);
            setIcon_1(`http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`);

            if (res.data.weather[1] !== undefined) {
              setWeather_2(res.data.weather[1].description);
              setIcon_2(`http://openweathermap.org/img/wn/${res.data.weather[1].icon}@2x.png`);
              console.log(weather_2);
            }
            else {
              console.log("no second");
            }

            SetIsLoading(false);

          }
          else if (query === '' && flag === false) {
            SetIsLoading(true);
            await window.navigator.geolocation.getCurrentPosition(savePositionToState);
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=1c80d4c4a37d47802e1660be6d8f52de`);
            console.log(res.data);
            setTemperature(res.data.main.temp);
            setCityName(res.data.name);
            setWeather_1(res.data.weather[0].description);
            setIcon_1(`http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`);

            if (res.data.weather[1] !== undefined) {
              setWeather_2(res.data.weather[1].description);
              setIcon_2(`http://openweathermap.org/img/wn/${res.data.weather[1].icon}@2x.png`);
            }
            else {
              console.log("no second");
            }

            SetIsLoading(false);
            setFlag(true);
          }
          else {
            SetIsLoading(true);
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=1c80d4c4a37d47802e1660be6d8f52de`);
            setTemperature(res.data.main.temp);
            setCityName(res.data.name);

            setWeather_1(res.data.weather[0].description);
            setIcon_1(`http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`);

            if (res.data.weather[1] !== undefined) {
              setWeather_2(res.data.weather[1].description);
              setIcon_2(`http://openweathermap.org/img/wn/${res.data.weather[1].icon}@2x.png`);
            }
            else {
              console.log("no second");
            }
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
        <Container className="container-width shadow-lg p-3 bg-white rounded text-center">
          <Card style={{ width: '100%' }}>
            <Card.Body>
              <Card.Title className="text-center my-4"><h2>Weather Mania </h2></Card.Title>
              <Search getQuery={(q) => {
                setQuery(q);
              }} />
              <hr />
              <Card.Text style={{ padding: '20px', color: 'green' }}>

                Loading...
                </Card.Text>
            </Card.Body>
          </Card >
        </Container>)
      :
      (
        <Container className="container-width shadow-lg p-2 bg-white rounded" >
          <Card style={{ width: '100%' }}>
            <Card.Body>
              <Card.Title className="text-center my-4"><h2>Weather Mania </h2></Card.Title>

              <Search getQuery={(q) => {
                setQuery(q);
              }} />
              <hr />
              <Card.Text>

                <Container>
                  <Row className="align-items-center">
                    <Col lg={7}>
                      <h3 >{cityName}</h3>
                    </Col>
                    <Col lg={5}>
                      <h3 >{temperature}°C</h3>
                    </Col>

                  </Row>

                  <Row className="align-items-center">
                    <Col>
                      <h4>{weather_1}</h4>
                    </Col>
                    <Col className="w-50">
                      <img className="w-75 ml-3" src={icon_1} alt="" />
                    </Col>

                  </Row>
                  {weather_2 !== "" ?
                    (
                      <Row className="align-items-center ">
                        <Col>
                          <h4>{weather_2}</h4>
                        </Col>
                        <Col className="w-50">
                          <img className="w-75 ml-3" src={icon_2} alt="" />
                        </Col>

                      </Row>
                    ) : (<> </>)
                  }


                </Container>

              </Card.Text>
            </Card.Body>
          </Card >
        </Container >
      )
  );
}

export default App;
