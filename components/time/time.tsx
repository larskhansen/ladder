import {Col} from "react-bootstrap";

const Time = ({time, deleteTime}: { time: number, deleteTime: Function }) => {

  const onClick = () => {
    deleteTime(time);
  };

  const timeDate = new Date(time * 1000);
  const hour:string = timeDate.getHours() < 10 ? "0" + timeDate.getHours() : timeDate.getHours().toString();
  const minute:string = timeDate.getMinutes() < 10 ? "0" + timeDate.getMinutes() : timeDate.getMinutes().toString();

  return <Col sd={12} md={6} lg={3}>
    <span style={{ border: "1px solid #000", padding: ".25rem" }}>{hour + ":" + minute}</span>
    <button onClick={onClick}>X</button>
  </Col>

};

export default Time;