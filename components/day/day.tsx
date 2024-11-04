"use client";

import {
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  ModalTitle,
  Row,
} from "react-bootstrap";
import styles from "@/app/page.module.scss";
import React, { ChangeEvent, useState } from "react";
import Time from "@/components/time/time";

const Day = ({ name }: { name: string }) => {
  const weekDays: string[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const numberNames: string[] = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
  ];
  const weekDay: number = weekDays.indexOf(name);

  const firstMonday = new Date();
  firstMonday.setDate(
    firstMonday.getDate() + ((1 + 7 - firstMonday.getDay()) % 7),
  );

  const nth = (n: number): string => {
    return ["st", "nd", "rd"][((((n + 90) % 100) - 10) % 10) - 1] || "th";
  };

  const date = new Date(firstMonday);
  date.setDate(date.getDate() + weekDay);
  //const unixTimestamp = Math.floor(date.getTime() / 1000);
  const correctMonth: number = date.getMonth() + 1;
  const correctDay: string | number =
    date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  const weekDate: string =
    date.getFullYear() + "-" + correctMonth + "-" + correctDay;
  const month: string = date.toLocaleString("default", { month: "long" });
  const day: string = nth(parseInt(correctDay.toString()));

  const [times, setTimes] = useState<number[]>([]);
  const [time, setTime] = useState<string>("");
  const [active, setActive] = useState<boolean>(true);
  //Modal
  const [show, setShow] = useState<boolean>(false);
  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);

  const clickActivate = (): void => {
    setActive(!active);
  };
  const saveTime = () => {
    date.setHours(parseInt(time.split(":")[0]), parseInt(time.split(":")[1]));
    const localTimes: number[] = JSON.parse(JSON.stringify(times));
    localTimes.push(Math.floor(date.getTime() / 1000));
    localTimes.sort();
    setTimes(localTimes);
    setShow(false);
  };

  const deleteTime = (deletionTime: number) => {
    const localTimes: number[] = JSON.parse(JSON.stringify(times));
    setTimes(localTimes.filter((item) => item !== deletionTime));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  return (
    <Row className={styles.day}>
      <Col sm={12}>
        <h2>{name.toLocaleUpperCase()}</h2>
      </Col>
      <Col lg={4} md={4} sm={6}>
        <label>
          <input
            type="checkbox"
            value="1"
            name={"norace"}
            onClick={clickActivate}
          />
          &nbsp;No race
        </label>
      </Col>
      <Col lg={4} md={4} sm={6}>
        <input
          defaultValue={weekDate}
          disabled={!active}
          type="date"
          name={"addDate"}
        />
      </Col>
      <Col lg={4} md={4} sm={6}>
        <button
          onClick={handleShow}
          disabled={!active}
          className={styles.addTime}
          type="button"
        >
          Add time
        </button>
      </Col>
      <Col style={{ display: active ? "block" : "none" }} sm={12}>
        &nbsp;
        <Row>
          {times &&
            times.map((entry, index) => {
              return <Time key={index} deleteTime={deleteTime} time={entry} />;
            })}
        </Row>
        &nbsp;
        <Row style={{ display: active ? "block" : "none" }}>
          <Col>
            <pre>
              **{name} {month} {correctDay}
              {day}**
              <br />
              Select all the times you can
              <br />
              {times &&
                times.map((entry, index) => {
                  return (
                    <span key={index}>
                      :{numberNames[index]}: &lt;t:{entry}:t&gt;&nbsp;
                    </span>
                  );
                })}
              :no_entry: Cannot race
            </pre>
          </Col>
        </Row>
      </Col>
      <Modal show={show} onHide={handleClose}>
        <ModalHeader closeButton>
          <ModalTitle>Add time for {name}</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <input type="time" onChange={handleChange} name={"time"} autoFocus />
          &nbsp;
          <button onClick={saveTime} type="button">
            Save
          </button>
        </ModalBody>
      </Modal>
    </Row>
  );
};

export default Day;
