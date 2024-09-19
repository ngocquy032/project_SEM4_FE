import { Box, Modal } from '@mui/material';
import React from 'react';

const DeleteLayout = ({ handleClose, open, idObject, deleteFunction }) => {
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

  const handleDelete = () => {
    deleteFunction(idObject);
  };

  const handleCancelClick = () => {
    handleClose();
  };

  return (
    <Modal
      open={open ? open : false}
      onClose={handleCancelClick}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div id="deleteModal" tabIndex="-1" aria-hidden="true" className="custom-modal-overlay">
          <div className="custom-modal-container">
            <div className="custom-modal-content">
              <div className="custom-modal-header">
                <button type="button" className="custom-close-button" data-dismiss="modal" aria-label="Close" onClick={handleCancelClick}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="custom-modal-body text-center">
                <svg className="custom-icon-delete" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
                </svg>
                <p className="custom-modal-text">Are you sure you want to delete this item?</p>
              </div>
              <div className="custom-modal-footer">
                <button type="button" className="custom-btn custom-btn-cancel" onClick={handleCancelClick}>
                  No, cancel
                </button>
                <button type="button" className="custom-btn custom-btn-confirm" onClick={handleDelete}>
                  Yes, I'm sure
                </button>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default DeleteLayout;
