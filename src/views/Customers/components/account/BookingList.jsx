import React, { useState } from 'react'
import { faCircleUser, faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BookingDetails from './BookingDetails';
import BookingUpdate from './BookingUpdate';

const BookingList = ({ onBookingAction }) => {
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const displayStyle = {
        padding: '.25rem 0.5rem'
    }
    const handleViewDetails = (booking) => {
        setSelectedBooking(booking);
    };

    const handleUpdate = () => {
        setIsUpdating(true);
    };

    const handleCloseDetails = () => {
        setSelectedBooking(null);
    };
    const handleUpdateSuccess = () => {
        setIsUpdating(false);
        onBookingAction('bookingList'); // Quay lại tab Booking List sau khi cập nhật
    };
    return (
        <div>
            <div class="content-header">
                <div class="d-flex align-items-center">
                    <div class="me-auto">
                        <h2 class="page-title">Booking</h2>
                        <div class="d-inline-block align-items-center">
                            <nav>
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a><FontAwesomeIcon icon={faCircleUser} /></a>
                                    </li>
                                    <li class="breadcrumb-item active" aria-current="page">BookingList</li>
                                </ol>
                            </nav>
                        </div>
                    </div>

                </div>
            </div>
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
                                        // value={limit}
                                        // onChange={handleLimitChange}
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
                                            // onChange={handleSearchChange}
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
                                                <th>Clinic Name</th>
                                                <th>Email</th>
                                                <th>Phone</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            <tr class="hover-primary">
                                                <td>#1</td>
                                                <td>a</td>
                                                <td>b</td>
                                                <td>c</td>

                                                <td>
                                                    <div class="btn-group acion-admin-list">
                                                        <a
                                                            style={displayStyle}

                                                            onClick={() => handleViewDetails()}
                                                        >
                                                            {" "}
                                                            <FontAwesomeIcon
                                                                icon={faEye}
                                                                className="icon-actionAD"
                                                            />
                                                        </a>
                                                        <a
                                                            style={displayStyle}
                                                            onClick={handleUpdate}

                                                        >
                                                            {" "}
                                                            <FontAwesomeIcon
                                                                icon={faPen}
                                                                className="icon-actionAD"
                                                            />
                                                        </a>
                                                        <a
                                                            style={displayStyle}

                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faTrash}
                                                                className="icon-actionAD"
                                                            />
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>

                                        </tbody>
                                        {/* <tbody>
                                            {clinics?.map((clinic) => (
                                                <tr class="hover-primary">
                                                    <td>#{clinic?.id}</td>
                                                    <td>{clinic?.clinicName}</td>
                                                    <td>{clinic?.email}</td>
                                                    <td>{clinic?.phone}</td>

                                                    <td>
                                                        <div class="btn-group acion-admin-list">
                                                            <a
                                                                style={displayStyle}
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/admin/clinics/${clinic?.id}`
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
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/admin/clinics/update/${clinic?.id}`
                                                                    )
                                                                }
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
                                                                    setIdObject(clinic?.id);
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
                                        </tbody> */}
                                    </table>
                                    {selectedBooking && !isUpdating && (
                                        <BookingDetails booking={selectedBooking} onClose={handleCloseDetails} />
                                    )}

                                    {isUpdating && (
                                        <BookingUpdate booking={selectedBooking} onUpdateSuccess={handleUpdateSuccess} onCancel={() => setIsUpdating(false)} />
                                    )}
                                </div>
                                <div>
                                    {/* <Stack
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
                                    </Stack> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default BookingList