import React from 'react';
import { Link } from 'react-router-dom';

const DepartmentDetails = () => {
    // Static data for the department
    const department = {
        name: 'Medicine and Health',
        description: 'Detailed information about the department, including services provided and other relevant details.',
        services: [
            'International Drug Database',
            'Stretchers and Stretcher Accessories',
            'Cushions and Mattresses',
            'Cholesterol and Lipid Tests',
            'Critical Care Medicine Specialists',
            'Emergency Assistance'
        ],
        price: '$120 per consultation',
        address: '123 Health Street, Medicine City'
    };

    // Static data for the doctors
    const doctors = [
        {
            name: 'Dr. John Doe',
            specialty: 'Cardiologist',
            experience: '15 years',
            schedule: [
                { day: 'Monday', time: '10:00 - 12:00' },
                { day: 'Wednesday', time: '14:00 - 16:00' },
                { day: 'Friday', time: '09:00 - 11:00' }
            ]
        },
        {
            name: 'Dr. Jane Smith',
            specialty: 'Dermatologist',
            experience: '10 years',
            schedule: [
                { day: 'Tuesday', time: '11:00 - 13:00' },
                { day: 'Thursday', time: '15:00 - 17:00' },
                { day: 'Saturday', time: '10:00 - 12:00' }
            ]
        }
    ];

    return (
        <div>
            <section className="page-title bg-1">
                <div className="overlay"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="block text-center">
                                <span className="text-white">Department Details</span>
                                <h1 className="text-capitalize mb-5 text-lg">Single Department</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section department-single">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="department-img">
                                <img src="customers/images/service/bg-1.jpg" alt="" className="img-fluid" />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-8">
                            <div className="department-content mt-5">
                                <h3 className="text-md">{department.name}</h3>
                                <div className="divider my-4"></div>
                                <p className="lead">{department.description}</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum recusandae dolor autem laudantium, quaerat vel dignissimos. Magnam sint suscipit omnis eaque unde eos aliquam distinctio, quisquam iste, itaque possimus.</p>

                                <h3 className="mt-5 mb-4">Services Features</h3>
                                <div className="divider my-4"></div>
                                <ul className="list-unstyled department-service">
                                    {department.services.map((service, index) => (
                                        <li key={index}><i className="icofont-check mr-2"></i>{service}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="sidebar-widget schedule-widget mt-5">
                                <h5 className="mb-4">Time Schedule</h5>
                                <ul className="list-unstyled">
                                    <li className="d-flex justify-content-between align-items-center">
                                        <a href="#">Monday - Friday</a>
                                        <span>9:00 - 17:00</span>
                                    </li>
                                    <li className="d-flex justify-content-between align-items-center">
                                        <a href="#">Saturday</a>
                                        <span>9:00 - 16:00</span>
                                    </li>
                                    <li className="d-flex justify-content-between align-items-center">
                                        <a href="#">Sunday</a>
                                        <span>Closed</span>
                                    </li>
                                </ul>

                                <div className="department-price mt-4">
                                    <h5>Price</h5>
                                    <p>{department.price}</p>
                                </div>
                                <div className="department-address mt-4">
                                    <h5>Address</h5>
                                    <p>{department.address}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-5">
                        <div className="col-lg-12">
                            <h3 className="mb-4">Doctors in this Department</h3>
                            <div className="divider my-4"></div>
                            <div className="row">
                                {doctors.map((doctor, index) => (
                                    <div key={index} className="col-md-6 mb-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <h4 className="card-title">{doctor.name}</h4>
                                                <p className="card-text">Specialty: {doctor.specialty}</p>
                                                <p className="card-text">Experience: {doctor.experience}</p>
                                                <h5 className="card-subtitle mb-2">Schedule:</h5>
                                                <ul>
                                                    {doctor.schedule.map((slot, i) => (
                                                        <li key={i}>{slot.day}: {slot.time}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="row mt-5">
                    <div className="col-lg-12 text-center">
                            <Link to="/bookAppoinment" className="btn btn-main-2 btn-round-full">Make an Appointment<i className="icofont-simple-right ml-2"></i></Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default DepartmentDetails;
