export default function SignIn() {
    return (
        <form id='login-form'>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Email: </span>
                <input type="text" className="form-control" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1"></input>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Email: </span>
                <input type="text" className="form-control" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1"></input>
            </div>
            <button id='login-btn'>Login</button>
        </form>
    )
}