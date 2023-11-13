import "./Card.module.css";

export default function Card(props) {
  return <div className="card justify-content-center">{props.children}</div>;
}
