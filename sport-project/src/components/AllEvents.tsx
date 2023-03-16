import React, { useEffect, useState } from "react";
import axios, { all } from "axios";
import dateFormat from "dateformat";
import { Event } from "../App";
import EventCard from "./EventCard";
import { Link } from "react-router-dom";
import './AllEvents.css';

export interface EventGallery {
  allDataEvents: Event[];
  filterCard: any
}

const AllEvents = ({ allDataEvents, filterCard }: EventGallery) => {


  return (
    <>
      <div className="filter">
        <Link to="/events/create">
          <button className="newEvent">New Event</button>
        </Link>
        <input
        className="input-filter"
          type="text"
          placeholder="Write your fav topic"
          onChange={(e: any) => filterCard(e.target.value)}
        ></input>
      </div>
      <div className="cards">
      {allDataEvents
        ? allDataEvents.map((event: any) => {
          return (
            <EventCard event={event} key={event.id} />
          );
        })
        : "No hay eventos de cards"}
        </div>
    </>
  );
};

export default AllEvents;
