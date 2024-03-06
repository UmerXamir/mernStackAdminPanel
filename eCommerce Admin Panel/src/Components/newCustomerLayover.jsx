/* eslint-disable react/prop-types */
import {  useRef, useState } from "react";
import "./newCustomerLayOver.css";

const NewCustomerLayOver = (props) => {
  const [username, setUsername] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState(null);
  const newRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ username, customerName, email, photo });
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };
  // const handleOutsideClick = (e) => {
  //   if (newRef.current && !newRef.current.contains(e.target)) {
  //     setCount(count - 1);
  //   }
  // };
  // useEffect(() => {
  //   document.addEventListener("mousedown", handleOutsideClick);
  //   return () => {
  //     document.removeEventListener("mousedown", handleOutsideClick);
  //   };
  // });

  return (
    <div className="overlay-container" ref={newRef}>
      <div className="overlay-card">
        <span className="close-btn" onClick={props.onClose}>
          ×
        </span>
        <form onSubmit={handleSubmit} className="form-container">
          <h2>Add New Customer</h2>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
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
            <input type="file" onChange={handlePhotoChange} />
          </div>
          <button type="submit">ADD CUSTOMER</button>
        </form>
      </div>
    </div>
  );
};

export default NewCustomerLayOver;
