import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from "react-loading";
import { getUserList } from "../../redux/slices/adminSlice";
import "./CustomerList.css";
import AddEditCustomerOverlay from "./addEditCustomerOverlay";

const CustomerList = (props) => {
  const state = useSelector((state) => state.admin);
  const [showAddNewCustomer, setShowAddNewCustomer] = useState(false);
  const [showEditCustomer, setShowEditCustomer] = useState(false);
  const [editCustomerData, setEditCustomerData] = useState({});

  const handleEditCustomer = (customerData) => {
    setEditCustomerData(customerData);
    setShowEditCustomer(true); // Show the edit customer overlay
  };

  const dispatch = useDispatch();
  const usersData = state.userList;
  useEffect(() => {
    dispatch(getUserList());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [layOver, setLayOver] = useState(false);

  const deleteCustomer = () => {
    // setCustomers(usersData?.filter((customer) => customer.id !== customerId));
  };
  const toggleAddNewCustomer = () => {
    console.log("layOVer", layOver);
    setShowAddNewCustomer(!showAddNewCustomer);
    setLayOver(true);
  };
  if (state.isLoading) {
    return (
      <>
        <div className="loading-container">
          <ReactLoading
            type={"spin"}
            color={"black"}
            height={100}
            width={100}
          />
        </div>
      </>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <div className="add-new-button">
          <button
            onClick={toggleAddNewCustomer}
            style={{
              padding: "10px",
              fontSize: "16px",
              borderRadius: "5px",
            }}
          >
            + ADD NEW CUSTOMER
          </button>
        </div>
      </div>
      <table className="customer-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersData?.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.userName}</td>
              <td>{customer.customerName}</td>
              <td>{customer.email}</td>
              <td>
                <div className="action-buttons">
                  <button
                    className="edit"
                    onClick={() => handleEditCustomer(customer)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete"
                    onClick={() => deleteCustomer(customer._id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddNewCustomer && (
        <AddEditCustomerOverlay
          {...props}
          onClose={() => setShowAddNewCustomer(false)}
          mode={"add"}
        />
      )}

      {showEditCustomer && (
        <AddEditCustomerOverlay
          onClose={() => setShowEditCustomer(false)}
          customerData={editCustomerData}
          mode={"edit"}
        />
      )}
    </div>
  );
};

export default CustomerList;
