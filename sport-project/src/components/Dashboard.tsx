// import React from 'react'

// import { Link } from 'react-router-dom';
// import GenericEvent from './GenericEvent';

// export default function Dashboard() {

//     const url = "https://localhost:7154/api/Event";
//     const { data, loading } = useFetch(url);

//     const deleteEventToggle = (id : any) => {
//         //console.log('----> recibo llamada deleteEventToggle:', id);

//         if (window.confirm("Do you really want to delete?")) {
            
//             fetch(url.concat('/', id), { method: 'DELETE' })
//                 .then(() => {
//                     //alert("Delete Event Success");
//                     window.location.reload();
//                 })
//                 .catch((err) => { alert("Error on delete Event: ".concat(err)) });
//         }
//     }

//     return (
//         <div className='dashboard'>
//             <div>
//                 <hr></hr>
//                 <h3>Dashboard</h3>

//                 {loading && <h3>Loading events, please wait....</h3>}
//             </div>

//             <table>
//                 <thead>
//                     <tr>
//                         <th>Event Name</th>
//                         <th>Description</th>
//                         <th>Start Date</th>
//                         <th>Location</th>
//                         <th>Photo</th>
//                         <th></th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {data?.map((eventItem : any) => (
//                         <GenericEvent key={eventItem.id} event={eventItem} deleteEventToggle={deleteEventToggle} />
//                     ))}
//                 </tbody>
//             </table>

//             <div>
//                 <Link to="/events/create">
//                     <button>➕ New Event</button>
//                 </Link>
//             </div>
//         </div>
//     )
// }

// function useFetch(url: string): { data: any; loading: any; } {
//     throw new Error('Function not implemented.');
// }

import React from 'react'

const Dashboard = () => {
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard


