import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function Update({ onUpdate }) {
  // Update는 Read + Create 이다.
  // 이미 있는 값을 읽어오고 (Read), 그것을 수정한다(Create)

  // **************** 1. READ ****************

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

  // **************** 2. UPDATE ****************

  function submitHandler(e) {
    e.preventDefault();
    const title = e.target.title.value;
    const body = e.target.body.value;
    onUpdate(id, title, body);
  }
  return (
    <article>
      <h1>Update</h1>
      <form onSubmit={submitHandler}>
        <p>
          <input
            type="text"
            name="title"
            placeholder="title"
            value={topic.title}
            onChange={(e) => {
              const newTopic = { ...topic, title: e.target.value };
              setTopic((current) => newTopic);
            }}
          ></input>
        </p>
        <p>
          <textarea
            name="body"
            placeholder="body"
            value={topic.body}
            onChange={(e) => {
              const newTopic = { ...topic, body: e.target.value };
              setTopic((current) => newTopic);
            }}
          ></textarea>
        </p>
        <p>
          <input type="submit" value="update"></input>
        </p>
      </form>
    </article>
  );
}
