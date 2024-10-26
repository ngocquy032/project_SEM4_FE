import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  faCircleUser,
  faEye,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import All_API from "../../../../state/All_API";
import {
  convertToDateString,
  convertToTimeString,
} from "../../componets/ConvertData";
import { Pagination, Stack } from "@mui/material";
import { ToastError, ToastSuccess } from "../../../../notification";
import RefundInvoiceAdmin from "../booking/RefundInvoiceAdmin";
import ContactView from "./ContactView";
import UpdateContact from "./UpdateContact";
import DeleteLayout from "../../componets/DeleteLayout";


const ContactList = () => {
    const displayStyle = {
        padding: ".25rem 0.5rem",
      };
      const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
      };
      const navigate = useNavigate();
      const [contacts, setContacts] = useState([]);
      const [totalPages, setTotalPages] = useState(0);
      const [idObject, setIdObject] = useState("");
      const [keyword, setKeyword] = useState("");
      const [limit, setLimit] = useState(5);
      const [page, setPage] = useState(0);
      const timeoutRef = useRef(null);
      const [loading, setLoading] = useState(false);
      const [status, setStatus] = useState("");
      const [openViewModal, setOpenViewModal] = useState(false);
      const [openUpdateModal, setOpenUpdateModal] = useState(false);
      const [openDeleteModal, setOpenDeleteModal] = useState(false);
    



      async function getAllContact(data) {
        try {
          const response = await All_API.getAllContact(data);
          setContacts(response.data.data.content);
          setTotalPages(response.data.data.totalPages);
        } catch {}
      }
    
      const handlePaginate = (event, value) => {
        setPage(value - 1); 
      };
    
      const handleLimitChange = (e) => setLimit(e.target.value);
      const handleStatusChange = (e) => setStatus(e.target.value);
    
      const handleSearchChange = (e) => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
    
        // Set a new timeout
        timeoutRef.current = setTimeout(() => {
          setKeyword(e.target.value);
        }, 500);
      };
   
   

      const handleLoading = () => {
        setLoading(!loading);
      };

      const handleViewOpen = () => {
        setOpenViewModal(true);
        };
      
        const handleViewClose = () => {
        setOpenViewModal(false);
        };
      
        const handleUpdateOpen = () => {
          setOpenUpdateModal(true);
          
        };
      
        const handleUpdateClose = () => {
          setOpenUpdateModal(false);
        };
      
      
        const handleDeleteOpen = () => {
        setOpenDeleteModal(true);
        };
      
        const handleDeleteClose = () => {
        setOpenDeleteModal(false);
        };

        async function deleteContact(id) {
          try{
            const response = await All_API.deleteContact(id)
            if(response.data.status === "success") {
              ToastSuccess(response.data.message)
              handleLoading()
              handleDeleteClose()
            }else {
              ToastError(response.data.message)
              handleDeleteClose()
            }
          }catch (error) {
                ToastError(error.response.data.message);
            handleDeleteClose()
        
          }
        }
        
    
      useEffect(() => {
        const data = {
          status: status || "",
          page: page,
          limit: limit,
          keyword: keyword,
        };
        getAllContact(data);
    }, [keyword, limit, page, loading, status]);
  return (
    <div class="content-wrapper">
    <div class="container-full">
      {/* <!-- Content Header (Page header) --> */}
      <div class="content-header">
        <div class="d-flex align-items-center">
          <div class="me-auto">
            <h2 class="page-title">Contact</h2>
            <div class="d-inline-block align-items-center">
              <nav>
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a>
                      <FontAwesomeIcon icon={faCircleUser} />
                    </a>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                  Contact List
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Main content --> */}
      <section class="content">
        <div class="row">
          <div class="col-12">
            <div class="box">
              <div className="schedule-filter-container">
                {/* Select Limit (bên trái) */}
                <div className="schedule-filter-limit">
                  <label htmlFor="limit" className="schedule-filter-label">
                    Limit
                  </label>
                  <select
                    id="limit"
                    value={limit}
                    onChange={handleLimitChange}
                    className="schedule-filter-select"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </select>
                </div>

                {/* Các phần tử ở bên phải */}
                <div className="schedule-filter-right">
              
                  <div className="schedule-filter-item">
                    <label
                      htmlFor="doctorId"
                      className="schedule-filter-label"
                    >
                      Status
                    </label>
                    <select
                      id="doctorId"
                      value={status}
                      onChange={handleStatusChange}
                      className="schedule-filter-select"
                    >
                      <option value="">Select Status</option>
                      <option value="AwaitReply">Await Reply</option>
                      <option value="Replied">Answered</option>
                    </select>
                  </div>
                  {/* Search */}
                  <div className="schedule-filter-item">
                    <label htmlFor="search" className="schedule-filter-label">
                      Search
                    </label>
                    <input
                      type="text"
                      id="search"
                      onChange={handleSearchChange}
                      className="schedule-filter-input inputsearch-admin"
                    />
                  </div>
                </div>
              </div>
              <div class="box-body">
                <div class="table-responsive rounded card-table">
                  <table class="table border-no" id="example1">
                    <thead>
                      <tr>
                            <th>ID</th>
							  <th>Full Name</th>
							  <th>Email</th>
							  <th>Message</th>
							  <th>Status</th>
							  <th>Action</th>

                      </tr>
                    </thead>
                    <tbody>
                    {contacts?.map((contact) => (
                          <tr class="hover-primary">
                            <td>{contact.id}</td>
							  <td>{contact.name}</td>
							  <td>{contact.email}</td>
							  <td className="max-w-[140px] truncate pr-4">{contact.message}</td>


                              <td>{contact.status === "AwaitReply" ? <button className="badge badge-info btn-status" onClick={()=> {
								setIdObject(contact?.id)
                handleUpdateOpen()
							  }}>Await Reply</button>: <button className="badge badge-success btn-status">Answered</button>}</td>
                          <td>
                            <div class="btn-group acion-admin-list">
                              <a
                                style={displayStyle}
                               onClick={()=> {
                                setIdObject(contact?.id)
                                handleViewOpen()
                              }}
                              >
                                {" "}
                                <FontAwesomeIcon
                                  icon={faEye}
                                  className="icon-actionAD"
                                />
                              </a>
                              <a
                                  style={displayStyle}
                                  onClick={() => {
                                    setIdObject(contact?.id)
                                    handleDeleteOpen();
                                  }}
                                >
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    className="icon-actionAD"
                                  />
                                </a>
                         
                           
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div>
                  <Stack
                    spacing={2}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Pagination
                      count={totalPages}
                      page={page + 1}
                      onChange={handlePaginate}
                    />
                  </Stack>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- /.content --> */}
    </div>
    {openViewModal && (
		<ContactView open={openViewModal} handleClose={handleViewClose} idObject={idObject} />
	  )}
	  
	  

	  {openUpdateModal && (
          <UpdateContact open={openUpdateModal} handleClose={handleUpdateClose} idObject={idObject} onUpdate={handleLoading} />
        )}



	{openDeleteModal && <DeleteLayout  open={openDeleteModal} handleClose={handleDeleteClose} idObject={idObject} deleteFunction={deleteContact} onDelete={handleLoading}/>}

  </div>
  )
}

export default ContactList
