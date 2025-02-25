export default function LoginPage() {
  return (
    <>
      <div className="container">
        <h1 id="form-title">Login</h1>
        <form id="auth-form">
          <div id="name-field" className="input-group" style="display: none">
            <label htmlFor="full-name">Full Name</label>
            <input type="text" id="full-name" name="full-name" />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">Submit</button>
        </form>
        <p id="toggle-form">
          Dont have an account?{" "}
          <a href="#" onclick="toggleForm()">
            Sign Up
          </a>
        </p>
      </div>
    </>
  );
}
