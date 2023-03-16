import React from 'react'
import './AttendeeDetail.css'

export const AttendeeDetail = (attendee: any) => {
    
    console.log('-->', attendee);

  return (
   <div className='attendeeGallery'>
    
    <hr />
     <div className='image'>
           <img className='img' src={attendee.attendee.photo}/>
      </div>
      <div className='details'>
          {attendee.attendee.username}
          
      </div>

</div>
  )
}
export default AttendeeDetail