import { Box, Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { ToastError, ToastSuccess } from '../../../../notification';
import { useNavigate, useParams } from 'react-router-dom';
import All_API from '../../../../state/All_API';


const UpdateMedication = ({ handleClose, open, idObject, onLoad }) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '500px',
        bgcolor: 'background.paper',
        borderRadius: '8px',
        boxShadow: 24,
        padding: '16px',
        outline: 'none',
      };
      const navigate = useNavigate();
      const [medication, setMedication] = useState(null)
      const [medicationName, setMedicationName] = useState('')

      const handleSubmit = (event) => {
		event.preventDefault();
	
		const data = new FormData(event.currentTarget);
		const medicationData = {
        medicationName: data.get("medicationName")
		};
		updateMedication(idObject, medicationData)
	  }

		async function updateMedication(idObject, medicationData) {
		  try{
			const response = await All_API.updateMedication(idObject,medicationData)
			if(response.data.status === "success") {
				ToastSuccess(response.data.message)
            handleClose()
            onLoad()
			}else {
				ToastError(response.data.message)
                handleClose()
			}
		  }catch (error){
			ToastError(error.response.data.message)
            handleClose()
		  }
		}

        async function getMedicationById(idObject) {
            try {
                const response = await All_API.getMedicationById(idObject);
                if (response.data.status === "success") {
                    const dataNew =response.data.data
                    setMedication(dataNew);
                    setMedicationName(dataNew?.medicationName)
                } else {
                    ToastError(response.data.status);
                    navigate('/admin/medications');
                }
            } catch (error) {
                ToastError(error.response.data.message);
                navigate('/admin/medications');
            }
        }

        useEffect(()=> {
            getMedicationById(idObject)
        },[])

      return (
        <Modal
          open={open ? open : false}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div id="deleteModal" tabIndex="-1" aria-hidden="true" className="custom-modal-overlay">
              <div className="custom-modal-container form-medication-ad">
                <div className="custom-modal-content ">
                  <div className="custom-modal-header">
                  <nav>
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a><FontAwesomeIcon icon={faCircleUser} /></a>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">Update Medication</li>
                            </ol>
                        </nav>
                  </div>
                  <div class="row justify-content-center">
                        <div class=" col-12 ">
                    
                                {/* <!-- /.box-header --> */}
                                <form class="form" onSubmit={handleSubmit}>
                                    <div class="box-body">
                                        <h4 class="box-title text-info mb-0"> Medication Info
                                        </h4>
                                        <div class="my-15">
                                       
                                         

                                            <div class="row">
                                            
                                            <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label class="form-label">Medication Name</label>
                                                        <input type="text" 
                                                        value={medicationName}
                                                        onChange={(e)=>setMedicationName(e.target.value)}
                                                         name='medicationName' id='medicationName'  className='schedule-filter-input select-admin-form' required/>
                                                        </div>
                                                </div>
                                              
                                            </div>
                                        </div>

                                        <div class="my-15">
                                           
                                      
                                            {/* <!-- /.box-body --> */}
                                            <div class="box-footer box-btn-ad ">
                                                <button type="button" onClick={()=> handleClose()} class="btn btn-warning me-10 ">
                                                    <i class="ti-trash"></i> Cancel
                                                </button>
                                                <button type="submit" class="btn btn-primary">
                                                    <i class="ti-save-alt"></i> Save
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form >
                            </div>
                    </div>
                  
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      );
}

export default UpdateMedication
