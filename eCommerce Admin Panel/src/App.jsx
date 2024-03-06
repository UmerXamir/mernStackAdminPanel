import { useEffect, useState } from "react";
import ReactLoading from "react-loading";

import CustomerList from "./Components/customersListContainer";
function App() {
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/users/list");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();

    setUsersData(data);
    console.log(data);
    setIsLoading(false);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  
console.log("isLoading", isLoading);
  return (
    <>
    <CustomerList/>
      <div className="loading-container">
        <div>
          <h1>User List</h1>
        </div>
        {isLoading ? (
          <ReactLoading
            type={"spin"}
            color={"#ffffff"}
            height={100}
            width={100}
          />
        ) : (
          <ul style={{ color: "wheat", textAlign: "left" }}>
            {(usersData || []).map((user, index) => (
              <li key={index}>
                <strong>Name:</strong> {user.userName}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default App;
