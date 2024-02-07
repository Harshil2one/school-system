import React from "react";
import AppRoutes from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HISTORY, routeConstants } from "./utils/shared";

class App extends React.Component {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    HISTORY.push(routeConstants.NOTFOUND_PAGE);
    console.error("Error: ", errorInfo);
  }

  render() {
    return (
      <div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={true}
          closeOnClick
        />
        <AppRoutes />
      </div>
    );
  }
}

export default App;
