import React, { useEffect, useState } from 'react'
import BookingForm from './BookingForm'
import { useParams } from 'react-router-dom'
import { getRoomById } from '../utils/ApiFuncions'
import { FaCar, FaGlassCheers, FaTshirt, FaTv, FaUtensils, FaWifi } from 'react-icons/fa'
import RoomCarousel from '../common/RoomCarousel'

const CheckOut = () => {
  const [error,setError]=useState("")
  const[isLoading,setIsLoading]=useState(false)
  const[roomInfo,setRoomInfo]=useState({photo:"",roomType:"",price:""})
  const {roomId}=useParams()
  useEffect(()=>{
    setTimeout(()=>{
      getRoomById(roomId).then((response)=>{
        setRoomInfo(response)
        setIsLoading(false)
      }).catch((error)=>{
        setError(error)
        setIsLoading(false)
      })
    },2000)
  },[roomId])



  return (
    <div>
      <section className='container'>
        <div className='row flex-column flex-md-row align-items-center'>
          <div className='col-md-4 mt-5 mb-5'>
              {isLoading?(
                <p>Loading Room </p>
              ):error?(
                <p>{error}</p>
              ):(
                <div className='room-info'>
                  <img src={`data:image/png;base64,${roomInfo.photo}`}
                  alt='Room Photo'
                  style={{width:'100%', height:'200px'}}/>
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <th>Room Type</th>
                        <th>{roomInfo.roomType}</th>
                      </tr>
                      <tr>
                        <th>Room Price</th>
                        <th>{roomInfo.price}</th>
                      </tr>
                      <tr>
                      <th>Room Services</th>
                        <td>
                          <ul>
                            <li><FaWifi/> Wifi</li>
                            <li><FaTv/>Netflix Premium </li>
                            <li><FaUtensils/>Breakfast</li>
                            <li><FaGlassCheers/>Mini Refreshment bar</li>
                            <li><FaCar/>Car Service</li>
                            <li><FaTshirt/>Laundry</li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                </div>
              )}

          </div>
          <div className='col-md-8'>
          <BookingForm/>
          </div>
        </div>

      </section>
      <div className='container'>
                <RoomCarousel/>
      </div>
    
    </div>
  )
}

export default CheckOut
