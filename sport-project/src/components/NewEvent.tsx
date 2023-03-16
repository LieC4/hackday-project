import React from 'react'
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './NewEvent.css'
import Swal from "sweetalert2";
import { Event } from '../App';

export default function NewEvent() {

    const [nameEvent, SetNameEvent] = useState("");
    const [descriptionEvent, SetDescriptionEvent] = useState("");
    const [statDateEvent, SetStartDateEvent] = useState("");
    const [locationEvent, SetLocationEvent] = useState("");
    const [photoEvent, SetPhotoEvent] = useState("");
    const [categoryEvent, SetCategoryEvent] = useState("");
    const [userIdEvent, SetUserIdEvent] = useState("");


    const navigate = useNavigate();

    function addNewEvent(e: any) {
        e.preventDefault();

        //date.toJSON()

        const eventRequest = {
            name: nameEvent,
            description: descriptionEvent,
            photo: photoEvent,
            startDate: statDateEvent,
            location: locationEvent,
            category: categoryEvent,
            userId: userIdEvent
        };
        const newEvent : Event = {
            name: nameEvent,
            location: locationEvent,
            startdate: statDateEvent,
            category: categoryEvent,
        }
        

        const url = "http://localhost:5164/api/Event";
        

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventRequest)
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then((res) => {

                if (res.status == 500) {
                    console.log('NewEvent Error:', res.detail);
                    alert('NewEvent Error: ' + res.detail);
                }
                else {
                    // console.log("New Event Success");
                    
                    Swal.fire(
                        'Good job!',
                        'You clicked the button!',
                        'success'
                      )
                    navigate("/", { replace: true });
                }
            })
            .catch((err) => {
                console.log('NewEvent Error:', err)
            });
    }


    return (

        <div>
            <div className='mainForm'>




                <form className="form" onSubmit={addNewEvent}>
                    <h2>New Event</h2>
                    <div>What is it?</div>
                    <div><input className='text' type="text" value={nameEvent} onChange={p => SetNameEvent(p.target.value)} /></div>

                    <div>Description</div>
                    <div><textarea className='text' value={descriptionEvent} onChange={p => SetDescriptionEvent(p.target.value)} /></div>

                    <div>Start Date</div>
                    <div><input className='text' type="datetime-local" min="2020-03-12T19:30" max="2026-03-12T00:00" value={statDateEvent} onChange={p => SetStartDateEvent(p.target.value)} /></div>

                    <div>Location</div>
                    <div><input className='text' type="text" value={locationEvent} onChange={p => SetLocationEvent(p.target.value)} /></div>

                    <div>Photo</div>
                    <div><input className='text' type="text" value={photoEvent} onChange={p => SetPhotoEvent(p.target.value)} /></div>

                    <div>Sport name</div>
                        <div>
                        <input className='text' type="text" value={categoryEvent} onChange={p => SetCategoryEvent(p.target.value)} />
                        </div>

                    {/* <div>Create User</div>
                    <div><input type="text" value={userIdEvent} onChange={p => SetUserIdEvent(p.target.value)} /></div> */}

                    <div className='buttons'>
                        <button className='submit' type="submit" onClick={() => SetUserIdEvent('5')}>Save Event</button>
                        <Link className="backButton" to="/">
                            <button className='backButton'>Cancel and return to list events</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

