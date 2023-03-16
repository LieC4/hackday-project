import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import dateFormat from "dateformat";
import "./EventCard.css";

const EventCard = ({ event }: any) => {
  //   const [Encuesta, setEncuesta] = useState("");
  //   let navigate = useNavigate();
  let navigate = useNavigate();

  function handleSearch(id: string) {
    navigate(`/event/${id}`);
  }
  const params = useParams();

  return ( 
    <div className="card-container">
      <article>
        {" "}
        {event.photo ? (
          <div>
            <img src={event.photo} alt={event.name} className="imagen" />
          </div>
        ) : (
          <div>
            <img
              src="https://cdn3.iconfinder.com/data/icons/rcons-user-profession/32/designer-512.png"
              alt={event.name}
            />
          </div>
        )}
      </article>
      <h1 className="bold-text">
        {event.name} <span className="normal-text">{event.location}</span>
      </h1>
      <h2 className="normal-text">
        {dateFormat(event.startDate, "dddd, mmmm dS, yyyy")}
      </h2>
      <div className="divboton">
        <p className="goTo">This is a {event.category} event!</p>
        <button onClick={() => handleSearch(event.id)}>Go to details</button>
      </div>
    </div>
  );
};

export default EventCard;
