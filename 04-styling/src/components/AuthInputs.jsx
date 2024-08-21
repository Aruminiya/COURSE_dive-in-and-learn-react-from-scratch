import { useState } from 'react';
import { styled } from 'styled-components';

import Button from './Button.jsx';
import Input from './Input.jsx';

const ControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

export default function AuthInputs() {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleInputChange(identifier, value) {
    if (identifier === 'email') {
      setEnteredEmail(value);
    } else {
      setEnteredPassword(value);
    }
  }

  function handleLogin() {
    setSubmitted(true);
  }

  const emailNotValid = submitted && !enteredEmail.includes('@');
  const passwordNotValid = submitted && enteredPassword.trim().length < 6;

  return (
    <div id="auth-inputs">
      <ControlContainer>
        <Input 
          label="Email"
          type="email"
          invalid={emailNotValid}
          onChange={(event) => handleInputChange('email', event.target.value)}
        />
        {/* 通过在 prop 名称前加上 `$`，styled-components 
        会识别这是一个自定义属性，并且不会将其传递给实际的 DOM 元素，
        而是仅用于样式计算。 */}
        <Input 
          label="Password"
          type="email"
          invalid={passwordNotValid}
          onChange={(event) => handleInputChange('password', event.target.value)}
        />
      </ControlContainer>
      <div className="actions">
        <button type="button" className="text-button">
          Create a new account
        </button>
        <Button onClick={handleLogin}>Sign In</Button>
      </div>
    </div>
  );
}
