import React, { useState, useRef } from 'react';
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useParams } from 'react-router-dom';
import All_API from '../../../../state/All_API';
import { ToastError, ToastSuccess } from '../../../../notification';

const AddClinic = () => {
    const jwtAdmin = localStorage.getItem("jwtAdmin")

    // General styles for form layout consistency
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

    const navigate = useNavigate()
    const [imagePreview, setImagePreview] = useState(null);  // State to store image preview
    const fileInputRef = useRef(null);  // Ref to handle file input
    const [clinicName, setClinicName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
        }
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
        fileInputRef.current.value = null;  // Reset file input
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        const clinicImage = fileInputRef.current.files[0];

        if (!clinicImage) {
            ToastError("Please upload an image.");
            return;
        }

        formData.append('file', clinicImage);
        uploadImage(jwtAdmin,formData)

       
     
        
    };
    async function uploadImage(token, imageData) {
        try {
            const response = await All_API.uploadImage(token, imageData);
    
            if (response.data.status !== "success") {
                return ToastError(response.data.message);
            }
    
            const clinicData = {
                clinic_name: clinicName,
                email: email,
                phone: phone,
                clinic_image: response.data.data,
                address: address
            };
    
            await createClinic(clinicData);
            
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Image upload failed";
            ToastError(errorMessage);
        }
    }
    
    async function createClinic(clinicData) {
        try {
            const response = await All_API.createClinic(clinicData);
            if (response.data.status === "success") {
                ToastSuccess(response.data.message);
                navigate('/admin/clinics')
                
            } else {
                ToastError(response.data.message);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Clinic create failed";
            ToastError(errorMessage);
        }
    }
    

    return (
        <div className="content-wrapper">
            <div className="container-full">
                <div className="content-header">
                    <div className="d-flex align-items-center">
                        <div className="me-auto">
                            <h2 className="page-title">Clinic</h2>
                            <div className="d-inline-block align-items-center">
                                <nav>
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <FontAwesomeIcon icon={faCircleUser} />
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">Add Clinic</li>
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
                                <form className="form" onSubmit={handleSubmit}>
                                    <div className="box-body">
                                        <h4 className="box-title text-info mb-3"> Clinic Info
                                        </h4>
                                        <div className="row form-specialty-ad">
                                            <div className="col-md-12 mb-3">
                                                <div className="form-group">
                                                    <label style={labelStyle}>Clinic Name</label>
                                                    <input
                                                        name='clinic_name'
                                                        type="text"
                                                        value={clinicName}
                                                        onChange={(e)=> setClinicName(e.target.value)}
                                                        className="form-control"
                                                        style={inputStyle}
                                                        placeholder="Enter clinic name"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <div className="form-group">
                                                    <label style={labelStyle}>Email</label>
                                                    <input
                                                        name='email'
                                                        type="text"
                                                        value={email}
                                                        onChange={(e)=> setEmail(e.target.value)}
                                                        className="form-control"
                                                        style={inputStyle}
                                                        placeholder="Enter email"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <div className="form-group">
                                                    <label style={labelStyle}>Phone</label>
                                                    <input
                                                        name='phone'
                                                        type="text"
                                                        value={phone}
                                                        onChange={(e)=> setPhone(e.target.value)}
                                                        className="form-control"
                                                        style={inputStyle}
                                                        placeholder="Enter phone"
                                                        required
                                                        maxLength={10}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-12 mb-3">
                                                <div className="form-group">
                                                    <label style={labelStyle}>Clinic Image </label>
                                                    <input
                                                        name='clinic_image'
                                                        type="file"
                                                        className="form-control"
                                                        style={inputStyle}
                                                        accept=".png, .jpg, .jpeg"
                                                        ref={fileInputRef}
                                                        onChange={handleFileChange}
                                                        required

                                                    />
                                                </div>
                                            </div>

                                            {imagePreview && (
                                                <div className="col-md-12 mb-3" style={{ textAlign: 'center' }}>
                                                    <img src={imagePreview} alt="Specialty Preview" style={{ maxWidth: '70%', height: 'auto' }} />
                                                    <div style={{ marginTop: '10px' }}>
                                                        <button type="button" className="btn btn-danger" onClick={handleRemoveImage}>
                                                            Remove Image
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="col-md-12 mb-3">
                                                <div className="form-group">
                                                    <label style={labelStyle}>Address</label>
                                                    <textarea
                                                        name='address'
                                                        className="form-control"
                                                        style={inputStyle}
                                                        rows="5"
                                                        placeholder="Enter address"
                                                        value={address}
                                                        onChange={(e)=> setAddress(e.target.value)}
                                                        required
                                                    ></textarea>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="box-footer" style={buttonGroupStyle}>
                                        <button type="button" onClick={()=> navigate('/admin/clinics')} class="btn btn-warning me-10 ">
                                                    <i class="ti-trash"></i> Cancel
                                                </button>
                                                <button type="submit" class="btn btn-primary">
                                                    <i class="ti-save-alt"></i> Save
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

export default AddClinic;