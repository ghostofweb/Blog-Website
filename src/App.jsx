import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true); // Set initial state to true
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true); // Start loading before async operation
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      })
      .finally(() => setLoading(false)); // Stop loading after async operation
  }, [dispatch]);

  return !loading ? (
    <div className="min-h-screen flex flex-col"> {/* Changed bg-grey-400 to bg-gray-400 */}
      <Header />
      <main className="flex-grow"> {/* This allows main content to grow and push the footer down */}
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : null;
}

export default App;
