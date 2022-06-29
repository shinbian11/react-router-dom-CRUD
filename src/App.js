import logo from "./logo.svg";
import "./App.css";
import { Header } from "./Header";
import { Link, Routes, Route } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <ol>
        <li>
          <Link to="/">welcome</Link>
        </li>
        <li>
          <Link to="/read/1">read</Link>
        </li>
      </ol>
    </nav>
  );
}

function Read() {
  return (
    <article>
      <h2>Read</h2>
      Hello, Read
    </article>
  );
}
function Welcome() {
  return (
    <article>
      <h2>Welcome</h2>
      Hello, WEB
    </article>
  );
}

function App() {
  return (
    <div>
      <Header></Header>
      <Nav></Nav>
      <Routes>
        <Route exact path="/" element={<Welcome />}></Route>
        <Route path="/read/1" element={<Read />}></Route>
      </Routes>
    </div>
  );
}

export default App;
