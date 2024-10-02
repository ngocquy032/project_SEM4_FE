import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { GetUser } from '../../../state/Auth/authUserSlice'
import { API_BASE_URL } from '../../../config/apiConfig'
import { useNavigate, useParams } from 'react-router-dom'
import All_API from '../../../state/All_API'
import { ToastError, ToastSuccess } from '../../../notification'
import { convertToDateString, convertToTimeString } from '../../Admin/componets/ConvertData'
import Loading from './Loading'

function BookAppoinment() {
    const navigate = useNavigate()
    const user = useSelector(GetUser)
    const {idSchedule} = useParams(); 
    const [schedule,setSchedule] = useState(null)
    const [doctor, setDoctor] = useState(null)
    const [fullName, setFullName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [address, setAddress] = useState('')
    const [loading, setLoading] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('VNPAY'); // Default to VNPAY

    const selectPaymentMethod = (method) => {
      setSelectedPaymentMethod(method);
    };


      
    const handleSumbit = (event) => {
        event.preventDefault();
		const data = new FormData(event.currentTarget);
        const bookingData = {
			schedule_id: idSchedule,
            user_id: user?.id,
            reason: data.get("reason"),
            amount: schedule?.price,
            payment_method: selectedPaymentMethod,
		};


        if(user !== null) {
            createBooking(bookingData)
          
          }
          else{
            ToastError("Please login to your account, it will take 2 seconds to login.")
            setTimeout(function() {
              window.location.href = "/login";
          }, 2500);      
        }
        
    }


    async function createBooking(bookingData) {
        setLoading(true)
        try {
            const response = await All_API.createBooking(bookingData);
            if (response.data.status === "success") {

                if(selectedPaymentMethod === "VNPAY") {
                    getUrlBank(response.data.data.id, schedule?.price)
                  }
                
            } else {
                ToastError("Appointment booking failed, Please try again");
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Appointment booking failed, Please try again";
            ToastError(errorMessage);
        } finally {
            setLoading(false); 
          }

    }
    

    async function getUrlBank(bookingId, total) {
        try{
          const response = await All_API.getUrlBank(bookingId, total)
          if(response.data.status === "success") {
            window.location.href = response.data.paymentUrl
          }else {
            ToastError(response.data.message)
          }
        }catch (error){
          ToastError(error.response.data.message)
        }
      }



    async function getScheduleById(idSchedule) {
        try {
            const response = await All_API.getScheduleById(idSchedule);
            if (response?.data.status === "success") {
             setSchedule(response?.data.data)
             setFullName(user?.fullname)
             setPhoneNumber(user?.phone_number)
             setEmail(user?.email)
             setGender(user?.gender)
             setAddress(user?.address)
             if(response?.data.data.doctor_id) {
               await getDoctorById(response.data.data.doctor_id)
            }
            } else {
                navigate('/service');
            }
        } catch (error) {
            navigate('/service');
        }
    }

    async function getDoctorById(idObject) {
        try {
          const response = await All_API.getDoctorById(idObject);
          if (response.data.status === "success") {
            setDoctor(response.data.data)
          } else {
          }
        } catch (error) {
        }
      }

    

    useEffect(()=> {
        getScheduleById(idSchedule)
    },[user])

    return (
        <div>
             {loading && <Loading />}
            <section className="page-title bg-1">
                <div className="overlay"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="block text-center">
                                <span className="text-white">Book your Seat</span>
                                <h1 className="text-capitalize mb-5 text-lg">Appoinment</h1>

                        
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section appoinment">
                <div className="container">
                    <div className="row ">
                    <div class="col-lg-4">
          <div class="mt-3">
            <div class="feature-icon mb-3">
              <i class="icofont-support text-lg"></i>
            </div>
             <span class="h3">Call for an Emergency Service!</span>
              <h2 class="text-color mt-3">+84 789 1256 </h2>
          </div>
      </div>
                        <div className="col-lg-8 col-md-10 ">
                            <div className="appoinment-wrap mt-5 mt-lg-0">
                                <h2 className="mb-2 title-color">Book appoinment</h2>
                                <div className='card'>
                                    <div className='card-body'>
                                    <div className='col-md-12 card-doctor-cle card-dc-cle'>
                                                        <div className='doctor-lcle img-dc-cle'>
                                                            <img  src={`${API_BASE_URL}images/view/${doctor?.avatar}`}
                                                             alt="Doctor avatar" className='img-doctor-cle' />
                                                          
                                                        </div>
                                                        <div className='doctor-rcle card-book-doctor'>
                                                        <h4 className="card-title doctor-fullname-cle">{schedule?.doctor_name}</h4>
                                                        <div className='date-time-schedule'>
                                                           <img src="https://bookingcare.vn/assets/icon/calendar_month.svg" alt="" />
                                                           <strong> {convertToTimeString(schedule?.start_time)} -{" "}
                                                           {convertToTimeString(schedule?.end_time)} -{" "}
                                                           {convertToDateString(schedule?.date_schedule)}
                                                           </strong>
                                                        </div>
                                                        <div className='clinicName-booking'>
                                                            <img src="https://bookingcare.vn/assets/icon/home_health.svg" alt="" />
                                                            <strong>
                                                                {schedule?.clinic_name}
                                                            </strong>
                                                            
                                                        </div>
                                                        <p className='clinic-adrs'>{schedule?.clinic_address}</p>
                                                        </div>
                                               
                                                    </div>
                                    </div>
                                </div>
                           
                                <form  className="appoinment-form" method="post" action="#" onSubmit={handleSumbit}>
                                    <div className="row">
                                        
                                       
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <input name="name" id="name" type="text" className="form-control" value={fullName} required
                                                onChange={(e)=>setFullName(e.target.value)}
                                                    placeholder="Full Name" />
                                            </div>
                                        </div>

                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <input name="phone" id="phone" type="text" className="form-control" value={phoneNumber} required
                                                    placeholder="Phone Number" maxLength={10}
                                                    onChange={(e)=>setPhoneNumber(e.target.value)}/>
                                            </div>
                                        </div>
                                     

                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <input name="email" id="email" type="text" className="form-control" value={email} required
                                                    placeholder="Email"
                                                    onChange={(e)=>setEmail(e.target.value)}/>
                                            </div>
                                        </div>
                                        

                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <select name="gender" id="gender" className="form-control" value={gender} required
                                                onChange={(e)=>setGender(e.target.value)}>
                                                <option value="Female">Female</option>
                                                <option value="Male">Male</option>

                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group-2 mb-4">
                                            <div className="form-group">
                                                <input name="adresss" id="adresss" type="text" className="form-control" value={address}
                                                onChange={(e)=>setAddress(e.target.value)}
                                                    placeholder="Adresss" required/>
                                            </div>
                                        </div>

                                    <div className="form-group-2 mb-4">
                                        <textarea name="reason" id="reason" className="form-control" rows="5"
                                            placeholder="Reason for Medical Examination" required></textarea>
                                    </div>

                                    <div className="payment-method-container">
      <label htmlFor="payment-method">Choose payment method:</label>
      <div className="payment-options">
        {/* VNPAY Option */}
        <div
          className={`payment-option ${selectedPaymentMethod === 'VNPAY' ? 'selected' : ''}`}
          id="vnpay"
          onClick={() => selectPaymentMethod('VNPAY')}
        >
          <img 
            src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-VNPAY-QR-1.png" 
            alt="VNPAY"
          />
        </div>

        {/* PayPal option disabled (optional: you can remove this part entirely) */}
        <div className="payment-option disabled" id="paypal" style={{ pointerEvents: 'none', opacity: 0.5 }}>
          <img 
            src="https://canhme.com/wp-content/uploads/2016/01/Paypal.png" 
            alt="PayPal"
          />
        </div>
      </div>
      <input
        type="hidden"
        id="selectedPaymentMethod"
        name="paymentMethod"
        value={selectedPaymentMethod}
      />
    </div>

                                    <button type='submit' disabled={loading}
                                     className="btn btn-main btn-round-full btn-book-conf">Make Appoinment <i
                                        className="icofont-simple-right  "></i></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default BookAppoinment