import React, { useState, useRef, useEffect } from 'react';
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useParams } from 'react-router-dom';
import All_API from '../../../../state/All_API';
import { ToastError, ToastSuccess } from '../../../../notification';
import { API_BASE_URL } from '../../../../config/apiConfig';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const UpdateSpecialty = () => {
    const jwtAdmin = localStorage.getItem("jwtAdmin")

    // General styles for form layout consistency
    const inputStyle = {
        fontSize: '16px',
        padding: '10px',
        width: '100%',
        textAlign: 'center',  // Center text in the input
        display: 'flex',  // Flexbox for centering content
        alignItems: 'center',
        justifyContent: 'center',
        height: '50px',
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
    const [price, setPrice] = useState(0)


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
        const specialtyImage = fileInputRef.current.files[0];
        formData.append('file', specialtyImage);

        if (!specialtyImage) {
            const specialtyData = {
                specialty_name: specialtyName,
                description: description,
                price: price
            };
            updateSpecialty(idSpecialty, specialtyData);

        }
        else{
            uploadImage(idSpecialty, jwtAdmin, formData)
        }

    };



    async function uploadImage(idSpecialty, token, imageData) {
        try {
            const response = await All_API.uploadImage(token, imageData);
    
            if (response.data.status !== "success") {
                return ToastError(response.data.message);
            }
    
            const specialtyData = {
                specialty_name: specialtyName,
                specialty_image: response.data.data,
                description: description
            };
    
            await updateSpecialty(idSpecialty, specialtyData);
            
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Image upload failed";
            ToastError(errorMessage);
        }
    }
    
    async function updateSpecialty(idSpecialty, specialtyData) {
        try {
            const response = await All_API.updateSpecialty(idSpecialty, specialtyData);
            if (response.data.status === "success") {
                ToastSuccess(response.data.message);
                navigate('/admin/specialties')
                
            } else {
                ToastError(response.data.message);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Specialty create failed";
            ToastError(errorMessage);
        }
    }
    


    async function getSpecialtyById(idObject) {
        try {
            const response = await All_API.getSpecialtyById(idObject);
            if (response.data.status === "success") {
                const dataNew =response.data.data
                setSpecialtyName(dataNew?.specialtyName)
                setDescription(dataNew?.description)
                setSpecialtyImageOld(dataNew?.specialtyImage)
                setPrice(dataNew?.price)
             
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
                                        <li className="breadcrumb-item active" aria-current="page">Update Specialty</li>
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
                                                        onChange={(e)=> setSpecialtyName(e.target.value)}
                                                        className="form-control"
                                                        style={inputStyle}
                                                        placeholder="Enter specialty name"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-12 mb-3">
                                                <div className="form-group">
                                                    <label style={labelStyle}>Specialty Image </label>
                                                    <input
                                                        name='specialty_image'
                                                        type="file"
                                                        className="form-control"
                                                        style={inputStyle}
                                                        accept=".png, .jpg, .jpeg"
                                                        ref={fileInputRef}
                                                        onChange={handleFileChange}
                                                        

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
                          <label style={labelStyle}>Specialty Price </label>
                          <input
                            name="price"
                            type="number"
                            min={0}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="form-control"
                            style={inputStyle}
                            placeholder="Enter specialty name"
                            required
                          />
                        </div>
                      </div>

                                            <div className="col-md-12 mb-3">
                                                <div className="form-group">
                                                    <label style={labelStyle}>Description</label>
                                                    <CKEditor
                            editor={ClassicEditor}
                            data={description} // Gán dữ liệu mặc định từ state
                            config={{
                                ckfinder: {
                                    uploadUrl: '/upload',
                                },
                                image: {
                                    toolbar: [
                                        'imageTextAlternative', '|',
                                        'imageStyle:full', 'imageStyle:side'
                                    ]
                                },
                            
                            }}
                           
                            onChange={(event, editor) => {
                              const data = editor.getData(); // Lấy nội dung CKEditor
                              setDescription(data); // Cập nhật giá trị vào state
                            }}
                          />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="box-footer" style={buttonGroupStyle}>
                                            <button type="button" className="btn btn-warning" onClick={()=> navigate('/admin/specialties')}>
                                                <i className="ti-trash"></i> Cancel
                                            </button>
                                            <button type="submit" className="btn btn-primary">
                                                <i className="ti-save-alt"></i> Update
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

export default UpdateSpecialty;