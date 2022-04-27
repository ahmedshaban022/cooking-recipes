import React from 'react'

const Login = () => {
  return (
    <div className='w-50 m-auto my-5'>
      <form className='w-75 m-auto my-5'>
      <div className="form-floating mb-3">
          <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
          <label htmlFor="floatingInput">Email</label>
        </div>
        <div className="form-floating mb-3">
          <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div class="col-12">
     <button type="submit" class="btn btn-primary w-100">Sign in</button>
      </div>
      </form>
    </div>
  )
}

export default Login