import type { NextPage } from "next";
import styles from "../styles/Home.module.scss";
import { useState } from "react";
import { ClickComponent } from "../components/ClickComponent";

type ClickItems = {
  x: number;
  y: number;
  id: number;
};

const Home: NextPage = () => {
  const [clicks, setClicks] = useState<ClickItems[]>([]);

  const handleCommentAreaClick = (event: any) => {
    const newClick: ClickItems = {
      x: event.pageX,
      y: event.pageY,
      id: new Date().getTime(),
    };

    setClicks((prevClicks) => [...prevClicks, newClick]);
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Crew3 Test</h1>
        <div onClick={handleCommentAreaClick} className={styles.commentArea}>
          {clicks.map((click) => (
            <ClickComponent key={click.id} x={click.x} y={click.y} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
