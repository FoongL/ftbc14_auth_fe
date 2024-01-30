import { useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";

const BasicAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);

  const handleChange = (e) => {
    if (e.target.id === "email") {
      setEmail(e.target.value);
    } else if (e.target.id === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("email:", email);
    console.log("password:", password);

    const login = await axios.post("http://localhost:8888/users/basicSignIn", {
      email,
      password,
    });

    console.log(login);

    if (login.data.success) {
      window.localStorage.setItem("email", email);
      window.localStorage.setItem("password", password);
      setAuthed(true);
    } else {
      window.alert("Login failed");
    }
    setPassword("");
    setEmail("");
  };

  const testAuth = async () => {
    console.log("lets get testing");
    const savedEmail = window.localStorage.getItem("email")
    const savedPassword = window.localStorage.getItem("password")
    const authString = savedEmail + ":" + savedPassword
    console.log({authString})
    const credentials = Buffer.from(authString).toString('base64')

    console.log("credentials:", credentials);

    const authCheck = await axios.get("http://localhost:8888/users/testBasic", {
      headers: { Authorization: "Basic " + credentials },
    });

    console.log(authCheck.data);
  };

  return (
    <div>
      <h1>Basic Authentication:</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="email"
          placeholder="enter your email here"
          onChange={handleChange}
          value={email}
        />
        <br />
        <input
          type="password"
          id="password"
          placeholder="enter your password here"
          onChange={handleChange}
          value={password}
        />
        <br />
        <input type="submit" />
      </form>
      {authed ? <button onClick={testAuth}>Test Auth</button> : ""}
    </div>
  );
};

export default BasicAuth;
