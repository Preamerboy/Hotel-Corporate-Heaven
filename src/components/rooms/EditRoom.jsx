import React, { useState,useEffect } from 'react'
import { getRoomById, updateRoom } from '../utils/ApiFuncions';
import { Link,useParams } from 'react-router-dom';

const EditRoom = () => {
  const[room,setRoom]=useState({
    photo:null,
    roomType:"",
    price:""
  })
  const {roomId}=useParams()
  const[imagePreview,setImagePreview]=useState("");
  const[successMessage,setSuccessMessage]=useState("");
  const[errorMessage,setErrorMessage]=useState("");

  const handleRoomInputChange=(e)=>{
    const name=e.target.name;
    let value=e.target.value
  setRoom({...room,[name]:value})
}

  const handlePhotoChange=(e)=>{
    const selectedImage=e.target.files[0]
    setRoom({...room,photo:selectedImage})
    setImagePreview(URL.createObjectURL(selectedImage))
    
  }
  useEffect(() => {
		const fetchRoom = async () => {
			try {
				const roomData = await getRoomById(roomId)
				setRoom(roomData)
				setImagePreview(roomData.photo)
			} catch (error) {
				console.error(error)
			}
		}

		fetchRoom()
	}, [roomId])
  const handleSubmit =async (event)=>{
    event.preventDefault()
    try{
      const response=await updateRoom(roomId,room)
      if(response.status===200){
        setSuccessMessage("Room updated succesfully")
        const updatedRoom=await getRoomById(roomId)
        setRoom(updatedRoom)
        setImagePreview(updatedRoom.photo)
        setErrorMessage("")

      }else{
        setErrorMessage("Error in updating Room")
      }
    }catch(error){
      console.error(error)
      setErrorMessage(error.message)
    }
  }
  return (
    <div className="container mt-5 mb-5">
			<h3 className="text-center mb-5 mt-5">Edit Room</h3>
			<div className="row justify-content-center">
				<div className="col-md-8 col-lg-6">
					{successMessage && (
						<div className="alert alert-success" role="alert">
							{successMessage}
						</div>
					)}
					{errorMessage && (
						<div className="alert alert-danger" role="alert">
							{errorMessage}
						</div>
					)}
					<form onSubmit={handleSubmit}>
						<div className="mb-3">
							<label htmlFor="roomType" className="form-label hotel-color">
								Room Type
							</label>
							<input
								type="text"
								className="form-control"
								id="roomType"
								name="roomType"
								value={room.roomType}
								onChange={handleRoomInputChange}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="roomPrice" className="form-label hotel-color">
								Room Price
							</label>
							<input
								type="number"
								className="form-control"
								id="price"
								name="price"
								value={room.price}
								onChange={handleRoomInputChange}
							/>
						</div>

						<div className="mb-3">
							<label htmlFor="photo" className="form-label hotel-color">
								Photo
							</label>
							<input
								required
								type="file"
								className="form-control"
								id="photo"
								name="photo"
								onChange={handlePhotoChange}
							/>
							{imagePreview && (
								<img
									src={`data:image/jpeg;base64,${imagePreview}`}
									alt="Room preview"
									style={{ maxWidth: "400px", maxHeight: "400" }}
									className="mt-3"
								/>
							)}
						</div>
						<div className="d-grid gap-2 d-md-flex mt-2">
							<Link to={"/existingRooms"} className="btn btn-outline-info ml-5">
								back
							</Link>
							<button type="submit" className="btn btn-outline-warning">
								Edit Room
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
  )
}

export default EditRoom
