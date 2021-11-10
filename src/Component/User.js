import React from "react";

export default function User(props) {
  if (!props.user) {
    return <h3> Working on results! </h3>;
  }

  return (
    <div className="user-container">
        <br></br>
      <h3>{props.user.name}</h3>
      <p>{props.user.email}</p>
      <p>{props.user.password}</p>
    </div>
  );
}
