import axios from "axios";
import { createContext, useContext, useState, useState } from "react";
import Cookie from "universal-cookie";
import "./Style/auth.css";

const cookies = new Cookie();

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const initialState = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
  avatarURL: "",
  birthdateDay: "",
  birthdateMonth: "",
  birthdateYear: "",
};

export const AuthProvider = ({ children }) => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      username,
      password,
      avatarURL,
      birthdateDay,
      birthdateMonth,
      birthdateYear,
    } = form;
    const URL = "http://localhost:5000/auth";
    const {
      data: { token, userID, hashedPassword, email },
    } = await axios.post(`${URL}/${isSignup ? "signup" : "login"}`, {
      username,
      password,
      email: form.email,
      avatarURL,
      birthdateDay,
      birthdateMonth,
      birthdateYear,
    });

    cookies.set("token", token);
    cookies.set("username", username);
    cookies.set("email", email);
    cookies.set("userID", userID);

    if (isSignup) {
      cookies.set("avatarURL", avatarURL);
      cookies.set("hashedPassword", hashedPassword);
    }

    window.location.reload();
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  const value = { cookies };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
