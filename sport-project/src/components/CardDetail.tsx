import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import dateFormat from "dateformat";
import AttendeeDetail from './AttendeeDetail';
import { idText } from 'typescript';
import "./CardDetail.css";
import MyComponent from "./MyComponent";

export interface User {
  username: string;
  email: string;
  password: string;
  photo: string;
}

export interface Event {
  name: string;
  location: string;
  startdate: string;
  category: string;
  description: string;
  startDate: string;
  photo: string;
  organizer: Organizer
}

export interface Organizer {
  username: string;
  email: string;
  password: string;
  photo: string;
}

export interface User {
  id: string;
  username: string,
  email: string;
}

const CardDetail = ({ event }: any) => {
  // const navigate = useNavigate()
  // const handleOnclick = (id: number) => {
  //     navigate(`/event/${id}`)
  // }
  let { eventId } = useParams()
  const [allEvents, setAllEvents] = useState<Event>();
  const [attendees, setAttendees] = useState<User[]>();
  const [userId, setUserId] = useState("");

  var counter = attendees?.length;
  const navigate = useNavigate();

  const apiCall = async (id: any) => {

    try {
      const URL = `http://localhost:5164/api/Event/${id}`;
      

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
      setAllEvents(data);

    } catch (err) {
      console.log(err);
    }
  };


  const apiCallGetAttenders = async (id: any) => {

    try {
      const URL = `http://localhost:5164/api/Event/GetAttenders?eventId=${id}`;
      

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
      setAttendees(data);

    } catch (err) {
      console.log(err);
    }
  };
  const [userNames, setUserNames] = useState<User[]>([]);
  
  const apiCallGetUsersNames = async () => {

    try {
      const URL = `http://localhost:5164/api/User`;
      

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
      setUserNames(data);

    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    apiCallGetUsersNames();
    apiCall(eventId);
    apiCallGetAttenders(eventId);
  }, []);

  function addUserToEvent(e: any) {
    e.preventDefault();

    // const url = `http://localhost:5164/api/Event/UserEvent?idEvent=${eventId}&idUser=${userId}`;
    const url = `http://localhost:5164/api/Event/UserEvent?idEvent=${eventId}&idUser=${userId}`;
    

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      //body: JSON.stringify(eventRequest)
    };

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(() => {
        console.log("User added a Event Success");
        alert("User added a Event Success");
        apiCallGetAttenders(eventId);
      })
      .catch((err) => {
        console.log('User added a Event Error:', err.toString())
      });
  }
  console.log('----> Users: ', userNames);

  return (
    <>
    <div className='info-cardDetail'>
      <div className='details'>
      <div className='info-left'>
      <h1>{allEvents?.name}</h1>
      <p className='pedro'>{allEvents?.description}</p>
      <div className='organizer'>
      <p>Created by : {allEvents?.organizer.username}</p>
      <img className='img' src={allEvents?.organizer.photo}/>
      </div>
      </div>
      <div className='info-right'>
      <p>
        <img className='img' src={allEvents?.photo}/>
        </p>
      </div>
      </div>
      <div className='details2'>
      <div className='info-left'>
        <p>{dateFormat(allEvents?.startDate, "dddd, mmmm dS, yyyy")}</p>
        <div className='attendees'>
        <div>Who is joining?</div>
        <hr></hr>
        {attendees?.map((item, index) => (
        <AttendeeDetail key={item.id} attendee={item} index={counter}></AttendeeDetail>
      ))}
      <hr></hr>
      </div>
        </div>
      <div className='info-right'>
        <p>{allEvents?.location}</p>
      <MyComponent/>
      </div>
      </div>
      
      <p>{allEvents?.category}</p>
    </div>
    <div className='formDiv'>
    <form className="form" onSubmit={addUserToEvent}>
        {/* <div>User ID</div>
        <div><input type="text" value={userId} onChange={p => setUserId(p.target.value)} /></div> */}
        {/* p.target.value */}
        {/* <button>Join user a Event!</button> */}
        <button onClick={() => setUserId("8")}>Join the event!</button>
        {/* <label htmlFor='selectUserName'>Select user:
          <select value={userId} onChange={e => setUserId(e.target.value)}>
            {userNames ? userNames.map((item) => (
            <option value={userNames.id} key={userNames.id}>{userNames.username}</option>))}
          </select>
        </label> */}
      </form>
      
      </div>
      <hr></hr>
      



      <Link to="/" className='link'>
        <button>Cancel and return to list events</button>
      </Link>



    </>

  )
}

export default CardDetail


