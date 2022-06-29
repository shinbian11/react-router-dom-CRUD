import logo from "./logo.svg";
import "./App.css";
import { Header } from "./Header";
import { Link, Routes, Route, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Welcome } from "./Welcome";

function Nav(props) {
  return (
    <nav>
      <ol>
        {props.data.map((e) => (
          <li key={e.id}>
            <Link to={`/read/${e.id}`}>{e.title}</Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function Read() {
  const params = useParams();
  const id = Number(params.id); // 기본적으로 parameter는 url 에서 가져온 것이므로, string 형태이다. 이를 number 형으로 변환해줌!
  return (
    <article>
      <h2>Read</h2>
      Hello, Read {id}
    </article>
  );
}

function App() {
  // 1. useEffect를 이용, 한번만 실행
  // 2. fetch 를 이용
  // 3. topics state를 갱신
  const [topics, setTopics] = useState([]);

  async function refresh() {
    const resp = await fetch("/topics");
    const data = await resp.json();
    setTopics((current) => data);
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div>
      <Header></Header>
      <Nav data={topics}></Nav>
      <Routes>
        <Route exact path="/" element={<Welcome />}></Route>
        <Route path="/read/:id" element={<Read />}></Route>
      </Routes>
    </div>
  );
}

export default App;
