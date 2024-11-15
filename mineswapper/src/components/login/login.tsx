import "./login.css";

export default function Login() {
  return (
    <div className="username-box">
      <form>
        <div className="username-input">
          <input type="textbox" placeholder="Username"></input>
        </div>
        <div className="username-submit">
          <input type="submit" value="Login"></input>
        </div>
      </form>
    </div>
  );
}
