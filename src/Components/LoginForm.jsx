import React from "react";

const LoginForm = ({ values, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Login Form</h2>
      <input
        id="email"
        type="email"
        value={values.email}
        placeholder="abc@xyz"
        onChange={(e) => handleChange(e.target.type, e.target.value)}
        required
      />
      <input
        id="password"
        type="password"
        value={values.password}
        placeholder="123"
        onChange={(e) => handleChange(e.target.type, e.target.value)}
        required
      />
      <button className="submit-btn">SUBMIT</button>
    </form>
  );
}

export default LoginForm;
