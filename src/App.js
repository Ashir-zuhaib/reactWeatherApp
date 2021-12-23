import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import "./App.css";

export default function App() {

  const [city, newCity] = useState(null)
  const [search, newSearch] = useState('Karachi')
  
  useEffect(() => {
    
    console.log("search", search)
    axios(`http://api.openweathermap.org/data/2.5/weather?q=${search}&appid=6f64dd0c88d659b2b3501c6adcdf6966`)
      .then((data) => {
        console.log('data: ', data)
        console.log("seoncd: ", data.data.main.temp)
        let celcius = parseInt(data.data.main.temp) - 273
        console.log(celcius)
        newCity(data)
        console.log("city: ", city)
        
      })
  }, [search])

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  
    return (
          
      <>
        <div className="App">
          <div className="main">
            <input type="text" id="input" 
              value={search} 
              onChange={(event) => {
                newSearch(event.target.value)
                }}
          />
        </div>

          {!city?
            (<p>..</p>) :
            (<div className='wedData'>
              <div>{city.data.name}, {city.data.sys.country}</div>
              <h1>{Math.round(city.data.main.temp - 273)} °C</h1>
              <h2 className='t'>Feels like: {Math.round(city.data.main.feels_like - 273)} °C</h2>
              <div className="date">{dateBuilder(new Date())}</div>              
              <div className="time">{new Date().getHours()}:{new Date().getMinutes()}</div>              
              <h2>{city.data.weather[0].main}</h2>
              
            </div>)

          }
        </div>
      </>
    );
  } 
  
  

    
    
