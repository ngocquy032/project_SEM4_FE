import React, { useState, useRef, useEffect } from "react";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import All_API from "../../../../state/All_API";
import { ToastError, ToastSuccess } from "../../../../notification";
import Select from "react-select";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AddDoctor = () => {
  const jwtAdmin = localStorage.getItem("jwtAdmin")

  // General styles for form layout consistency
  const inputStyle = {
    fontSize: "16px",
    padding: "10px",
    width: "100%",
    textAlign: "center", // Center text in the input
    height: "46px", // Increase height for better UI
    display: "flex", // Flexbox for centering content
    alignItems: "center",
    justifyContent: "center",
  };

  const buttonGroupStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginTop: "20px",
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      height: 46, // Chiều cao của control
      minHeight: 46, // Chiều cao tối thiểu
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "0.5rem", // Padding cho vị trí hiển thị
    }),
    dropdownIndicator: (base) => ({
      ...base,
      padding: "0.5rem", // Padding cho mũi tên dropdown
    }),
    indicatorsContainer: (base) => ({
      ...base,
      height: 46, // Chiều cao của chỉ báo
    }),
  };

  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null); // State to store image preview
  const fileInputRef = useRef(null); // Ref to handle file input
  const [keywordUser, setKeywordUser] = useState("");
  const [users, setUsers] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [user, setUser] = useState(null);
  const [specialtyId, setSpecialtyId] = useState(null);
  const [qualification, setQualification] = useState("");
  const [experience, setExperience] = useState("");
  const [bio, setBio] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    fileInputRef.current.value = null; // Reset file input
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    const doctorImage = fileInputRef.current.files[0];

    if (!doctorImage) {
      ToastError("Please upload an image.");
      return;
    }

    formData.append("file", doctorImage);
    uploadImage(jwtAdmin, formData);
  };

  async function uploadImage(token, imageData) {
    try {
      const response = await All_API.uploadImage(token, imageData);

      if (response.data.status !== "success") {
        return ToastError(response.data.message);
      }

      const doctorData = {
        user_id: user?.value,
        specialty_id: specialtyId,
        avatar: response.data.data,
        qualification: qualification,
        experience: experience,
        bio: bio,
      };

      await createDoctor(doctorData);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Image upload failed";
      ToastError(errorMessage);
    }
  }

  async function createDoctor(doctorData) {
    try {
      const response = await All_API.createDoctor(doctorData);
      if (response.data.status === "success") {
        ToastSuccess(response.data.message);
        navigate("/admin/doctors");
      } else {
        ToastError(response.data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Doctor create failed";
      ToastError(errorMessage);
    }
  }

  // Lọc danh sách specialties dựa trên từ khóa tìm kiếm
  const filteredSpecialties = users?.filter((user) =>
    user.fullname.toLowerCase().includes(keywordUser.toLowerCase())
  );
  // Chuyển đổi dữ liệu cho react-select
  const options = filteredSpecialties.map((doctor) => ({
    value: doctor.id,
    label: doctor.fullname,
  }));

  async function getFullUser() {
    try {
      const response = await All_API.getUserFull("DOCTOR");
      setUsers(response.data.data);
    } catch {}
  }

  async function getAllSpecialty() {
    try {
      const response = await All_API.getSpecialtyFull();
      setSpecialties(response.data.data.specialtyList);
    } catch {}
  }

  useEffect(() => {
    getFullUser();
    getAllSpecialty();
  }, []);

  const handleChange = (selectedOption) => {
    setUser(selectedOption);
  };

  return (
    <div className="content-wrapper">
      <div className="container-full">
        <div className="content-header">
          <div className="d-flex align-items-center">
            <div className="me-auto">
              <h2 className="page-title">Doctor</h2>
              <div className="d-inline-block align-items-center">
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <FontAwesomeIcon icon={faCircleUser} />
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Add Doctor
                    </li>
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
                    <h4 className="box-title text-info mb-3"> Doctor Info</h4>
                    <div className="row form-specialty-ad">
                      <div class="col-md-12 mb-3">
                        <div className="specialty-form-group">
                          <label className="form-label">User</label>
                          <Select
                            value={user}
                            onChange={handleChange}
                            options={options}
                            placeholder="Select User"
                            isClearable
                            styles={customStyles}
                            required // Gán custom styles vào đây
                          />
                        </div>
                      </div>

                      <div className="col-md-12 mb-3">
                        <div class="form-group">
                          <label class="form-label">Specialty</label>
                          <select
                            id="Specialty"
                            value={specialtyId}
                            onChange={(e) => setSpecialtyId(e.target.value)}
                            className="schedule-filter-select select-admin-form"
                            name="Specialty"
                            required
                          >
                            <option value="">Select Specialty</option>
                            {specialties?.map((specialty) => (
                              <option value={specialty?.id}>
                                {specialty?.specialtyName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="col-md-12 mb-3">
                        <div className="form-group">
                          <label class="form-label">Doctor Image </label>
                          <input
                            name="specialty_image"
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
                        <div
                          className="col-md-12 mb-3"
                          style={{ textAlign: "center" }}
                        >
                          <img
                            src={imagePreview}
                            alt="Specialty Preview"
                            style={{ maxWidth: "70%", height: "auto" }}
                          />
                          <div style={{ marginTop: "10px" }}>
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={handleRemoveImage}
                            >
                              Remove Image
                            </button>
                          </div>
                        </div>
                      )}


                      <div className="col-md-12 mb-3">
                        <div className="form-group">
                          <label class="form-label">Experience </label>
                          <input
                            name="experience"
                            type="number"
                            className="form-control"
                            style={inputStyle}
                            required
                            min={0}
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-md-12 mb-3">
                        <div className="form-group">
                          <label class="form-label">Qualification</label>
                          <textarea
                            name="qualification"
                            className="form-control"
                            rows="3"
                            value={qualification}
                            onChange={(e) => setQualification(e.target.value)}
                            required
                          ></textarea>
                        </div>
                      </div>
                    



                      <div className="col-md-12 mb-3">
                        <div className="form-group">
                          <label class="form-label">Bio</label>
                          <CKEditor
                            editor={ClassicEditor}
                            data={bio} // Gán dữ liệu mặc định từ state
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
                              setBio(data); // Cập nhật giá trị vào state
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="box-footer" style={buttonGroupStyle}>
                      <button type="button" className="btn btn-warning">
                        <i className="ti-trash"></i> Cancel
                      </button>
                      <button type="submit" className="btn btn-primary">
                        <i className="ti-save-alt"></i> Save
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

export default AddDoctor;
