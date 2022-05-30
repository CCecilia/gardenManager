import './Auth.css'

import SignIn from "./SignIn"
import SignUp from "./SignUp"

export default function Auth() {
    return (
        <div className="App">
      <div className='row'>
        <div className='col-12 text-align-center'>
          <button>Login</button>
          <button>Sign Up</button>
        </div>
      </div>
      <div className='row'>
        <div className='col-12 login-form-wrapper'>
          <SignIn/>
        </div>
        <div className='col-12 sign-up-form-wrapper'>
          <SignUp/>
        </div>
      </div>
    </div>
    )
}
