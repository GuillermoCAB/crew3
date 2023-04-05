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
  const [hasWindowOpen, setHasWindowOpen] = useState<boolean>(false);

  const handleCommentAreaClick = (event: any) => {
    if (hasWindowOpen) return;

    const newClick: ClickItems = {
      x: event.pageX,
      y: event.pageY,
      id: new Date().getTime(),
    };

    setClicks((prevClicks) => [...prevClicks, newClick]);
    setHasWindowOpen(true);
  };

  const removeClick = (targetId: number) => {
    setClicks((prevClicks) =>
      prevClicks.filter((click) => click.id !== targetId)
    );
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Crew3 Test</h1>
        <div onClick={handleCommentAreaClick} className={styles.commentArea}>
          {clicks.map((click) => (
            <ClickComponent
              setHasWindowOpen={setHasWindowOpen}
              removeClick={removeClick}
              id={click.id}
              key={click.id}
              x={click.x}
              y={click.y}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
