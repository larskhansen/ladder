import Image from "next/image";
import styles from "./page.module.scss";
import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import Day from "@/components/day/day";


export default function Home() {
  return (
    <Container style={{ backgroundColor: "#eee", marginTop: "2rem" }}>
      <Day name="Monday" />
      <Day name="Tuesday" />
      <Day name="Wednesday" />
      <Day name="Thursday" />
      <Day name="Friday" />
      <Day name="Saturday" />
      <Day name="Sunday" />
    </Container>
  );
}
