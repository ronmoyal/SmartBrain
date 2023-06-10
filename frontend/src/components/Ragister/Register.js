import React, { useState } from "react";

const Register = ({onRouteChange})=> {
  const [RegisterEmail, setRegisterEmail] = useState('');
  const [RegisterPassword, setRegisterPassword] = useState('');
  const [RegisterName, setRegisterName] = useState('');

  const onEmailChange = (event) => {
    setRegisterEmail(event.target.value);
}


const onPasswordChange = (event) => {
  setRegisterPassword(event.target.value);
}

const onNameChange = (event) => {
  setRegisterName(event.target.value);
}


const onSubmitSignIn = () => {
  fetch('http://localhost:5000/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          email: RegisterEmail,
          password: RegisterPassword,
          name:RegisterName
      })
  })
      .then(response => response.json())
      .then(data => {
          if (data === 'User Create.') {
              onRouteChange('home');
          }
      })
}

    return(
    <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
<main className="pa4 black-80">
  <div className="measure">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="f1 fw6 ph0 mh0">Sign Up</legend>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
        <input 
        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
        type="text" 
        name="name" 
        id="name"
        onChange={onNameChange}/>
      </div>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
        type="email" 
        name="email-address"  
        id="email-address"
        onChange={ onEmailChange}/>
      </div>
      <div className="mv3">
        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
        <input 
        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
        type="password"
         name="password"  
         id="password"
         onChange={onPasswordChange}/>
      </div>
    </fieldset>
    <div className="">
      <input 
        onClick={onSubmitSignIn}
        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
        type="submit" 
        value="Register"/>
    </div>
    <div className="lh-copy mt3">
    <p onClick={() => onRouteChange('signin')} 
    className="f6 link dim black db">Already have an account? Sign In</p>
    </div>

   
  </div>
</main>
</article>
    );
}

export default Register;