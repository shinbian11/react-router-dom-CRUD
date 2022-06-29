import logo from "./logo.svg";
import "./App.css";
import { Header } from "./Header";
import { Routes, Route, useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Welcome } from "./Welcome";
import { Nav } from "./Nav";
import { Create } from "./Create";
import { Read } from "./Read";

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
