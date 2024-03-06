/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import "./editCustomerOverlay.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserList, updateUser } from "../redux/slices/adminSlice";
const EditCustomerOverlay = (props) => {
  const state = useSelector((state) => state.admin);
  const { onClose, customerData } = props;
  const [userName, setUsername] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  // const [photo, setPhoto] = useState(null);
const prevUpdateDetailStatus = useRef(state.updateUserDetailStatus) 
  useEffect(() => {
    setUsername(customerData.userName);
    setCustomerName(customerData.customerName);
    setEmail(customerData.email);
    // setPhoto(customerData.photo);
  }, [customerData]);


 const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data= { userName, customerName, email } ;
    console.log(data);
    dispatch(updateUser({ putData: data, id: customerData._id }));
    // Add logic to handle form submission
  };
  
  useEffect(() => {
    if (prevUpdateDetailStatus.current === "success") {
      dispatch(getUserList());
      onClose();
    }
    console.log("prevUpdateDetailStatus", prevUpdateDetailStatus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.updateUserDetailStatus]);

  // const handlePhotoChange = (e) => {
  //   setPhoto(e.target.files[0]);
  // };

  return (
    <div className="overlay-container">
      <div className="overlay-card">
        <span className="close-btn" onClick={onClose}>
          ×
        </span>
        <form onSubmit={handleSubmit} className="form-container">
          <h2>Edit Customer</h2>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            {/* <input type="file" onChange={handlePhotoChange} /> */}
          </div>
          <button type="submit">SAVE CHANGES</button>
        </form>
      </div>
    </div>
  );
};

export default EditCustomerOverlay;
