import { Link } from "react-router-dom";

export function Nav(props) {
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
