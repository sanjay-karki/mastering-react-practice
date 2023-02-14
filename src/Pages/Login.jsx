import { useContext, useState } from "react";
import LoginForm from "../Components/LoginForm";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import { AuthContext } from "../Store/Store";

const Login = () => {
  const {isLoginCorrect, setIsLoginCorrect} = useContext(AuthContext)
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [logout, setLogout] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.email === "abc@xyz" && values.password === "123") {
      localStorage.setItem("isLoginCorrect", true);
      setIsLoginCorrect(true);
    } else {
      alert("Cannot Login. Incorrect Email & Password");
    }
    setValues({ email: "", password: "" });
  };

  const handleChange = (fieldName, value) => {
    setValues((prevValues) => ({ ...prevValues, [fieldName]: value }));
  };

  return (
    <>
      {isLoginCorrect ? (
        <div className={logout && "inactive-container"}>
          <h1>Welcome Admin!</h1>
          <br />
          <Link to="/information" className="view-info">
            VIEW INFO
          </Link>
          <br />
          <button className="logout-btn" onClick={() => setLogout(true)}>
            Log Out
          </button>
        </div>
      ) : (
        <LoginForm
          values={values}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
      {logout &&
        createPortal(
          <div className="logout-confirm-container">
            <h3 style={{ fontWeight: "500" }}>
              Are you sure you want to log out?
            </h3>
            <button
              onClick={() => {
                localStorage.removeItem("isLoginCorrect");
                setIsLoginCorrect(false);
                setLogout(false);
              }}
            >
              Yes
            </button>
            <button
              onClick={() => {
                setLogout(false);
              }}
            >
              Cancel
            </button>
          </div>,
          document.body
        )}
    </>
  );
};
export default Login;
