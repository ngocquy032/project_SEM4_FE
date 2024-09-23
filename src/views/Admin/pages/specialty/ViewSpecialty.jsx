import React, { useState, useRef, useEffect } from 'react';
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useParams } from 'react-router-dom';
import All_API from '../../../../state/All_API';
import { ToastError, ToastSuccess } from '../../../../notification';
import { API_BASE_URL } from '../../../../config/apiConfig';

const ViewSpecialty = () => {

    const inputStyle = {
        fontSize: '16px',
        padding: '10px',
        width: '100%',
        textAlign: 'center',  // Center text in the input
        height: '50px',  // Increase height for better UI
        display: 'flex',  // Flexbox for centering content
        alignItems: 'center',
        justifyContent: 'center',
    };


    const labelStyle = {
        fontWeight: 'bold',
        marginBottom: '8px',
        display: 'block'
    };

    const buttonGroupStyle = {
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',
        marginTop: '20px'
    };

    const { idSpecialty } = useParams();

    const navigate = useNavigate()
    const [imagePreview, setImagePreview] = useState(null);  // State to store image preview
    const fileInputRef = useRef(null);  // Ref to handle file input
    const [specialtyName, setSpecialtyName] = useState('')
    const [description, setDescription] = useState('')
    const [specialtyImageOld,setSpecialtyImageOld] = useState(null)

 


    async function getSpecialtyById(idObject) {
        try {
            const response = await All_API.getSpecialtyById(idObject);
            if (response.data.status === "success") {
                const dataNew =response.data.data
                setSpecialtyName(dataNew?.specialtyName)
                setDescription(dataNew?.description)
                setSpecialtyImageOld(dataNew?.specialtyImage)
             
            } else {
                ToastError(response.data.status);
                navigate('/admin/specialties');
            }
        } catch (error) {
            ToastError(error.response.data.message);
            navigate('/admin/specialties');
        }
    }

    useEffect(()=> {
        getSpecialtyById(idSpecialty)
    },[])
    return (
        <div className="content-wrapper">
            <div className="container-full">
                <div className="content-header">
                    <div className="d-flex align-items-center">
                        <div className="me-auto">
                            <h2 className="page-title">Specialty</h2>
                            <div className="d-inline-block align-items-center">
                                <nav>
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <FontAwesomeIcon icon={faCircleUser} />
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">Add Specialty</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="content">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="box">
                                <form className="form" >
                                    <div className="box-body">
                                        <h4 className="box-title text-info mb-3"> Specialty Info
                                        </h4>
                                        <div className="row form-specialty-ad">
                                            <div className="col-md-12 mb-3">
                                                <div className="form-group">
                                                    <label style={labelStyle}>Specialty Name</label>
                                                    <input
                                                        name='specialty_name'
                                                        type="text"
                                                        value={specialtyName}
                                                        className="form-control"
                                                        style={inputStyle}
                                                        placeholder="Enter specialty name"
                                                        required
                                                        disabled
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-12 mb-3">
                                                <div className="form-group">
                                                    <label style={labelStyle}>Specialty Image </label>
                                                    <input
                                                        name='specialty_image'
                                                        type="text"
                                                        className="form-control"
                                                        style={inputStyle}
                                                        accept=".png, .jpg, .jpeg"
                                                        ref={fileInputRef}
                                                        value={specialtyImageOld}
                                                        disabled

                                                    />
                                                </div>
                                            </div>

                                            {imagePreview  && (
                                                <div className="col-md-12 mb-3" style={{ textAlign: 'center' }}>
                                                    <img src={imagePreview} alt="Specialty Preview" style={{ maxWidth: '360px', height: '240px', objectFit: 'cover' }} />
                                                    <div style={{ marginTop: '10px' }}>
                                                        
                                                    </div>
                                                </div>
                                            )}

                                            {imagePreview == null && specialtyImageOld && (
                                                <div className="col-md-12 mb-3" style={{ textAlign: 'center' }}>
                                                    <img src={`${API_BASE_URL}images/view/${specialtyImageOld}`} alt="Specialty Preview" style={{ maxWidth: '70%', height: 'auto' }} />
                                                    <div style={{ marginTop: '10px' }}>
                                                       
                                                    </div>
                                                </div>
                                            )}

                                            <div className="col-md-12 mb-3">
                                                <div className="form-group">
                                                    <label style={labelStyle}>Description</label>
                                                    <textarea
                                                        name='description'
                                                        className="form-control"
                                                        style={inputStyle}
                                                        rows="5"
                                                        placeholder="Enter description"
                                                        value={description}
                                                        required
                                                        disabled
                                                    ></textarea>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="box-footer" style={buttonGroupStyle}>
                                            <button type="button" className="btn btn-warning" onClick={()=> navigate('/admin/specialties')}>
                                                <i className="ti-trash"></i> Cancel
                                            </button>
                                          
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ViewSpecialty;