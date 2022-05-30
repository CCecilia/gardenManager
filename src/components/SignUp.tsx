export default function SignUp() {
    return (
        <form id='sign-up-form'>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Email: </span>
              <input type="text" className="form-control" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1"></input>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Password: </span>
              <input type="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1"></input>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Confirm: </span>
              <input type="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1"></input>
            </div>
            <button id='login-btn'>Sign Up</button>
        </form>
    )
}