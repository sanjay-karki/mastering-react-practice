import "./sass/App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Store/Store";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Information from "./Pages/Information";
import Error from "./Pages/Error";
import ProtectedRoute from "./Routes/ProtectedRoutes/ProtectedRoute";
import Products from "./Pages/Products";
import Product from "./Pages/Product";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="products" element={<Products />}>
              <Route path=":productId" element={<Product />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="information" element={<Information />} />
            </Route>
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
