import { useState } from "react";

export default function StateLogin() {
  const [enterValues, setEnterValues] = useState({
    email: '',
    password: ''
  });

  const emailIsInvalid = enterValues.email !== '' && !enterValues.email.includes('@');

  function handleSubmit(event) {
    event.preventDefault();
    console.log(enterValues)
  };

  function handleInputChange(identifier, event) {
    setEnterValues((prevValues) => ({
      ...prevValues,
      [identifier]: event.target.value
    }))
  };

  return (
    <form onSubmit={(event)=>handleSubmit(event)}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input 
            id="email"
            type="email"
            name="email"
            value={enterValues.email}
            onChange={(event)=>handleInputChange('email', event)}
          />
          <div className="control-error">{emailIsInvalid && <p>Please enter a valid email address.</p>}</div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={enterValues.password}
            onChange={(event)=>handleInputChange('password', event)}
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}

