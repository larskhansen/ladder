import { Button, Col } from "react-bootstrap";

const Time = ({
  time,
  deleteTime,
}: {
  time: number;
  deleteTime: CallableFunction;
}) => {
  const onClick = () => {
    deleteTime(time);
  };

  const timeDate = new Date(time * 1000);
  const hour: string =
    timeDate.getHours() < 10
      ? "0" + timeDate.getHours()
      : timeDate.getHours().toString();
  const minute: string =
    timeDate.getMinutes() < 10
      ? "0" + timeDate.getMinutes()
      : timeDate.getMinutes().toString();

  return (
    <Col sd={12} md={6} lg={3}>
      <div className="input-group mb-3">
        <span className="border border-dark text-center p-1">
          {hour + ":" + minute}
        </span>
        <div className="input-group-append">
          <Button className="rounded-0 btn btn-danger" onClick={onClick}>
            X
          </Button>
        </div>
      </div>
    </Col>
  );
};

export default Time;
