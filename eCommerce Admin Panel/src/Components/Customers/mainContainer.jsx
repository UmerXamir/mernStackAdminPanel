
import LeftSidebar from "./leftSideBar";
import CustomerList from "./customersListContainer";

const MainContainer = () => {
  return (
    <>
      <div className="container">
        <LeftSidebar />
        <div className="user-list-container">
          <CustomerList />
        </div>
      </div>
    </>
  );
};

export default MainContainer;
