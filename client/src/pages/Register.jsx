function Register() {
  return (
    <div>
      <section>
        <form>
          <div>
            <span>Username :--- </span>
            <input type="text" placeholder="username" />
          </div>

          <br />

          <div>
            <span>Firstname :--- </span>
            <input type="text" placeholder="firstname" />
          </div>

          <br />

          <div>
            <span>Lastname :--- </span>
            <input type="text" placeholder="lastname" />
          </div>

          <br />

          <div>
            <span>Email :--- </span>
            <input type="email" placeholder="email" />
          </div>

          <br />

          <div>
            <span>Password :--- </span>
            <input type="password" placeholder="password" />
          </div>

          <br />

          <button type="submit">Register</button>
        </form>
      </section>

    </div>
  );
}

export default Register;