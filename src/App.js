import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "./Component/Form";
import User from "./Component/User";
import schema from "./Component/FormSchema";
import * as yup from "yup";

const initialFormValues = {
  name: "",
  email: "",
  password: "",
  serviceTerms: false, // checkbox
};
const initialFormErrors = {
  name: "",
  email: "",
  password: "",
};
const initialUsers = [];
const initialDisabled = true;

function App() {
  const [users, setUsers] = useState(initialUsers);
  const [formValues, setformValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  const getUsers = () => {
    axios
      .get("https://reqres.in/api/users")
      .then((res) => {
        setUsers([...users, res.data]);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setformValues(initialFormValues);
      });
  };
  const postNewUser = (newUser) => {
    axios
      .post("https://reqres.in/api/users", newUser)
      .then((res) => {
        setUsers([...users, res.data]);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setformValues(initialFormValues));
  };

  const updateForm = (inputName, inputValue) => {
    validate(inputName, inputValue);
    setformValues({ ...formValues, [inputName]: inputValue });
  };
  const submitForm = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      serviceTerms: formValues.serviceTerms,
    };
    postNewUser(newUser);
  };

  const validate = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: "" }))
      .catch((error) =>
        setFormErrors({ ...formErrors, [name]: error.errors[0] })
      );
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    schema.isValid(formValues).then((valid) => setDisabled(!valid));
  }, [formValues]);

  return (
    <div className="App">
      <h1>Sign Up</h1>
      <Form
        formValues={formValues}
        update={updateForm}
        submit={submitForm}
        disabled={disabled}
        errors={formErrors}
      />
      {users.map((user) => {
        return <User key={user.id} user={user} />;
      })}
    </div>
  );
}

export default App;
