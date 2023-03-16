import axios, { all } from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AllEvents from "./components/AllEvents";
import CardDetail from "./components/CardDetail";

import NewEvent from "./components/NewEvent";

import logo from "./logo.svg";

export interface Event {
  name: string;
  location: string;
  startdate: string;
  category: string;
}

const App = () => {
  const [allDataEvents, setAllDataEvents] = useState<Event[]>([]);

  const filterCard = (value: any) => {
    // allDataEvents.filter( (res: any)=> setAllDataEvents([res]))
    if (value == "") apiCall();
    setAllDataEvents((previousState) =>
      previousState.filter((event) => event.category.includes(value))
    );
  };
  

  const apiCall = async () => {
    try {
      const URL = "http://localhost:5164/api/Event";
     

      const config = {
        method: "GET",
        mode: "no-cors",
        cache: "default",
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
          Authorization: "Token  *****************",
        },
      };

      const { data } = await axios.get(URL, config);
      setAllDataEvents(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    apiCall();
  }, []);

  return (
    <div>
      <header className="App-header">
        <table align="center">
          <tbody>
            <tr>
              <td>
                <img src={logo} className="App-logo" alt="logo" />
              </td>
              <td>
                <h2>Join me!</h2>
              </td>
            </tr>
          </tbody>
        </table>
        <Routes>
          <Route path="/" element={<AllEvents allDataEvents={allDataEvents} filterCard={filterCard} />} /> 
          <Route path="/events/create" element={<NewEvent />} />
          <Route path="/event/:eventId" element={<CardDetail />} />
        </Routes>
      </header>
      
    </div>
  );
};

export default App;
