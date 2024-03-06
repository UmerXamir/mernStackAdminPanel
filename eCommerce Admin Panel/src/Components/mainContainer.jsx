import "./MainContainer.css";
import LeftSidebar from "./leftSideBar";
import CustomerList from "./customersListContainer";

const MainContainer = () => {
  return (
    <>
      <div className="container">
        <LeftSidebar />

        <div className="content">
          <CustomerList />
        </div>
      </div>
    </>
  );
};

export default MainContainer;
