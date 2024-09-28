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
import DeleteLayout from "../../componets/DeleteLayout";
import { ToastError, ToastSuccess } from "../../../../notification";
import AddMedication from "./AddMedication";
import UpdateMedication from "./UpdateMedication";

const MedicationList = () => {
  const displayStyle = {
    padding: ".25rem 0.5rem",
  };
  const navigate = useNavigate();
  const [medications, setMedications] = useState([]);
  const [idObject, setIdObject] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [keyword, setKeyword] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef(null);


  const handleLimitChange = (e) => setLimit(e.target.value);
  const handleDeleteOpen = () => {
    setOpenDeleteModal(true);
  };
  const handleAddOpen = () => {
    setOpenAddModal(true);
  };

  const handleAddClose = () => {
    setOpenAddModal(false);
  };

  const handleUpdateOpen = () => {
    setOpenUpdateModal(true);
  };

  const handleUpdateClose = () => {
    setOpenUpdateModal(false);
  };
  const handleDeleteClose = () => {
    setOpenDeleteModal(false);
  };
  const handleLoading = () => {
    setLoading(!loading);
  };
  const handlePaginate = (event, value) => {
    setPage(value - 1); // Cập nhật số trang hiện tại khi người dùng chuyển trang
  };

  const handleSearchChange = (e) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a new timeout
    timeoutRef.current = setTimeout(() => {
      setKeyword(e.target.value);
    }, 500);
  };

  async function deleteMedication(id) {
    try {
      const response = await All_API.deleteMedicationById(id);
      if (response.data.status === "success") {
        ToastSuccess(response.data.message);
        handleLoading();
        handleDeleteClose();
      } else {
        ToastError(response.data.message);
        handleDeleteClose();
      }
    } catch (error) {
      ToastError(error.response.data.message);
      handleDeleteClose();
    }
  }


  async function getAllMedication(data) {
    try {
      const response = await All_API.getAllMedications(data);
      setMedications(response.data.data.medications);
      setTotalPages(response.data.data.totalPages);
    } catch {}
  }

  useEffect(() => {
    const data = { page, limit, keyword };
    getAllMedication(data);
  }, [page, limit, keyword, loading]);

  return (
    <div class="content-wrapper">
      <div class="container-full">
        {/* <!-- Content Header (Page header) --> */}
        <div class="content-header">
          <div class="d-flex align-items-center">
            <div class="me-auto header-admin-edit">
              <div>
                {" "}
                <h2 class="page-title">Medication</h2>
                <div class="d-inline-block align-items-center">
                  <nav>
                    <ol class="breadcrumb">
                      <li class="breadcrumb-item">
                        <a>
                          <FontAwesomeIcon icon={faCircleUser} />
                        </a>
                      </li>
                      <li class="breadcrumb-item active" aria-current="page">
                        Medication List
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>

              <div className="btn-add-admin">
                <button onClick={() => handleAddOpen()} class="btn btn-primary">
                  ADD Medication
                </button>
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
                          <th>Medication Name</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {medications?.map((medication) => (
                          <tr class="hover-primary">
                            <td>#{medication?.id}</td>
                            <td>{medication?.medicationName}</td>
                            <td>
                              <div class="btn-group acion-admin-list">
                                <a
                                  style={displayStyle}
                                  onClick={() =>
                                    navigate(
                                      `/admin/timeSlots/${medication?.id}`
                                    )
                                  }
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
                                    setIdObject(medication?.id);
                                    handleUpdateOpen();
                                  }}
                                >
                                  {" "}
                                  <FontAwesomeIcon
                                    icon={faPen}
                                    className="icon-actionAD"
                                  />
                                </a>
                                <a
                                  style={displayStyle}
                                  onClick={() => {
                                    setIdObject(medication?.id);
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

      {openAddModal && (
        <AddMedication
          open={openAddModal}
          handleClose={handleAddClose}
          onCreate={handleLoading}
        />
      )}

      {openUpdateModal && (
        <UpdateMedication
          open={openUpdateModal}
          handleClose={handleUpdateClose}
          idObject={idObject}
          onLoad={handleLoading}
        />
      )}
      {openDeleteModal && (
        <DeleteLayout
          open={openDeleteModal}
          handleClose={handleDeleteClose}
          idObject={idObject}
          onDelete={handleLoading}
          deleteFunction={deleteMedication}
        />
      )}
    </div>
  );
};

export default MedicationList;
