export default function LoginPage() {
  return (
    <>
      <div class="container">
        <h1 id="form-title">Login</h1>
        <form id="auth-form">
          <div id="name-field" class="input-group" style="display: none">
            <label for="full-name">Full Name</label>
            <input type="text" id="full-name" name="full-name" />
          </div>
          <div class="input-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div class="input-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">Submit</button>
        </form>
        <p id="toggle-form">
          Don't have an account?{" "}
          <a href="#" onclick="toggleForm()">
            Sign Up
          </a>
        </p>
      </div>
    </>
  );
}
