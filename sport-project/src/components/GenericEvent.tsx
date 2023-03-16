// import React from 'react'
// import { Link, useNavigate } from "react-router-dom";

// export default function GenericEvent({ event, deleteEventToggle } : any) {

//     const navigate = useNavigate();

//     const editOnClick = () => {

//         console.log('editar!', event.id);
//         navigate('/events/edit/'+ event.id);
//     }

//     const deleteOnClick = () => {
//         deleteEventToggle(event.id);
//     }

//     return (
//         <tr>
//             <td> <input defaultValue={event.name} /></td>
//             <td> <input defaultValue={event.description} /></td>
//             <td> <input defaultValue={event.startDate} /></td>
//             <td> <input defaultValue={event.location} /></td>
//             <td> <img src={event.photo} alt='photo'></img> </td>

//             <td> <button type='button' onClick={editOnClick}>✏️</button>
//                  <button type='button' onClick={deleteOnClick}>🗑️</button> </td>
//         </tr>
//     )
// }

import React from 'react'

const GenericEvent = () => {
  return (
    <div>GenericEvent</div>
  )
}

export default GenericEvent