import { useEffect } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import AppRoutes from "./routes";
import Navbar from "./scenes/global/Navbar";

function App() {
  const ScrollToTop = () => {
    const { location } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);
    return null;
  };

  return (
    <div className="App">
      <Router>
        <Navbar />
        <ScrollToTop />
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;
