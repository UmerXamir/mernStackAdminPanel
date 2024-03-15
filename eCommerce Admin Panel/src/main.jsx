import React from 'react'
import ReactDOM from 'react-dom/client'
import MainContainer from './Components/Customers/mainContainer.jsx';
// import './index.css'
import "./main.css";
import {Provider} from 'react-redux'
import { store } from './redux/store';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <LeftSidebar/> */}
    <Provider store={store}>
      <MainContainer />
    </Provider>
  </React.StrictMode>
);

