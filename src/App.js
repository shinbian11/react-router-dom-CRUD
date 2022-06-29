import logo from "./logo.svg";
import "./App.css";
import { Header } from "./Header";
import { Routes, Route, useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Welcome } from "./Welcome";
import { Nav } from "./Nav";
import { Create } from "./Create";

function Read() {
  const params = useParams();
  const id = Number(params.id); // 기본적으로 parameter는 url 에서 가져온 것이므로, string 형태이다. 이를 number 형으로 변환해줌!

  // 1. useEffect를 이용, 한번만 실행
  // 2. fetch 를 이용
  // 3. topics state를 갱신
  // 4. 랜더링

  const [topic, setTopic] = useState({ title: null, body: null });

  async function refresh() {
    // npx json-server --watch -p 3333 db.json 을 이용하여 서버를 하나 만들었기 때문에, http://localhost:3333/topics/:id 라는 주소로 가면 해당 id에 일치하는 데이터가 저장되어 있는 상태이다.
    // 그 경로를 이용한 것이다!
    // http://localhost:3333/topics/:id (여기서 http://localhost:3333는 package.json 파일의 proxy 속성값으로 대체) 의 데이터를 fetch 해서 가져온다.
    const resp = await fetch("/topics/" + id);
    const data = await resp.json();
    setTopic((current) => data);
  }

  useEffect(() => {
    refresh();
  }, [id]);

  return (
    <article>
      <h2>{topic.title}</h2>
      {topic.body}
    </article>
  );
}

function Control() {
  const params = useParams();
  const id = Number(params.id);
  let contextUI = null;

  // id가 있을 때에만 Update 버튼 보이게 하기
  if (id) {
    contextUI = (
      <>
        <li>
          <Link to={`/update/${id}`}>Update</Link>
        </li>
      </>
    );
  }
  return (
    <ul>
      <li>
        <Link to="/create">Create</Link>
        {contextUI}
      </li>
    </ul>
  );
}

function App() {
  // 1. useEffect를 이용, 한번만 실행
  // 2. fetch 를 이용
  // 3. topics state를 갱신
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  async function refresh() {
    const resp = await fetch("/topics");
    const data = await resp.json();
    setTopics((current) => data);
  }

  useEffect(() => {
    refresh();
  }, []);

  async function createHandler(title, body) {
    // 1. post 방식으로 서버에 데이터를 전송한다.
    const resp = await fetch("/topics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body }),
    });

    const data = await resp.json();
    console.log("data : ", data);

    // 2. refresh 를 호출한다.
    refresh(); // <Nav> 컴포넌트의 topics를 재 랜더링한다.
    navigate("/read/" + data.id); // 주소도 방금 추가한 데이터의 Read url 로 바꾼다.
  }

  return (
    <div>
      <Header></Header>
      <Nav data={topics}></Nav>
      <Routes>
        <Route exact path="/" element={<Welcome />}></Route>
        <Route path="/read/:id" element={<Read />}></Route>
        <Route
          path="/create"
          element={<Create onCreate={createHandler} />}
        ></Route>
      </Routes>
      <Routes>
        <Route path="/" element={<Control></Control>}></Route>
        <Route path="/read/:id" element={<Control></Control>}></Route>
      </Routes>
      {/* <Control></Control> */}
    </div>
  );
}

export default App;
