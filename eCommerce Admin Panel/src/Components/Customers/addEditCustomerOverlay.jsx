/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./addEditLayover.css";
import "./editCustomerOverlay.css";
import {
  getUserList,
  addUser,
  updateUser,
} from "../../redux/slices/adminSlice";

const AddEditCustomerOverlay = (props) => {
  const state = useSelector((state) => state.admin);
  const prevUpdateDetailStatus = useRef(state.updateUserDetailStatus); 
  const prevAddUserStatus = useRef(state.addUserStatus);

  const { onClose, mode ='add', customerData } = props;
  const [formData, setFormData] = useState({
    userName: "",
    customerName: "",
    email: "",
    photo: null,
  });
  const overlayRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (mode === "edit" && customerData) {
      setFormData({
        userName: customerData.userName,
        customerName: customerData.customerName,
        email: customerData.email,
        photo: customerData.photo,
      });
    }
  }, [mode, customerData]);

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "add") {
      dispatch(addUser(formData));

    } else if (mode === "edit" && customerData) {

      dispatch(updateUser({ putData: formData, id: customerData._id }));
 
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    if (
      prevUpdateDetailStatus.current === "success" ||
      prevAddUserStatus.current === "success"
    ) {
      dispatch(getUserList());
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.updateUserDetailStatus,state.addUserStatus]);

  const handlePhotoChange = (e) => {
    setFormData({
      ...formData,
      photo: e.target.files[0],
    });
  };

  return (
    <div className="overlay-container" ref={overlayRef}>
      <div className="overlay-card">
        <span className="close-btn" onClick={onClose}>
          ×
        </span>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="layover-heading">
            <h2>{mode === "add" ? "Add New Customer" : "Edit Customer"}</h2>
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Customer Name"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          {mode === "add" && (
            <div className="form-group">
              <input type="file" onChange={handlePhotoChange} />
            </div>
          )}
          <div className="submit-btn">
            <button type="submit">
              {mode === "add" ? "ADD CUSTOMER" : "SAVE CHANGES"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditCustomerOverlay;
