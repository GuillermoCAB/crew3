// ClickComponent.tsx
import React, { useState, CSSProperties } from "react";
import { CommentForm } from "../CommentForm";
import styles from "../../styles/components/ClickComponent.module.scss";

interface ClickComponentProps {
  x: number;
  y: number;
  id: number;
  setHasWindowOpen: (bool: boolean) => void;
  removeClick: (id: number) => void;
}

interface Comment {
  id: number;
  text: string;
}

export const ClickComponent: React.FC<ClickComponentProps> = ({
  x,
  y,
  id,
  setHasWindowOpen,
  removeClick,
}) => {
  const [thread, setThread] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);

  const dotStyle: CSSProperties = {
    top: y,
    left: x,
  };

  const commentsWindowStyle: CSSProperties = {
    top: y + 40,
    left: x + 40,
  };

  const [isHovering, setIsHovering] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isInitial, setIsInitial] = useState(true);

  const handleAddThread = (text: string) => {
    setThread(text);
    setIsInitial(false);
    setHasWindowOpen(false);
  };

  const handleAddComment = (text: string) => {
    const newComment: Comment = {
      id: new Date().getTime(),
      text,
    };
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const handleClick = (event: any) => {
    event.stopPropagation();

    setHasWindowOpen(true);
    setIsActive(true);
  };

  const handleClose = (event: any) => {
    event.stopPropagation();

    setIsActive(false);
    setHasWindowOpen(false);
  };

  const handleCloseInitial = (event: any) => {
    event.stopPropagation();

    if (!thread) {
      removeClick(id);
    }

    setIsInitial(false);
    setHasWindowOpen(false);
  };

  return (
    <>
      <div
        onClick={handleClick}
        style={dotStyle}
        className={styles.dot}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {(thread && thread[0].toUpperCase()) || ""}
      </div>
      {isHovering && !isActive && !isInitial && (
        <div className={styles.commentContainer} style={commentsWindowStyle}>
          <h3>{thread}</h3>
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>{comment.text}</li>
            ))}
          </ul>
        </div>
      )}
      {isActive && (
        <div className={styles.commentContainer} style={commentsWindowStyle}>
          <button className={styles.closeButtonStyle} onClick={handleClose}>
            &times;
          </button>
          <div className={styles.line} />
          <h3>{thread}</h3>
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>{comment.text}</li>
            ))}
          </ul>
          <CommentForm onAddComment={handleAddComment} />
        </div>
      )}
      {isInitial && (
        <div className={styles.commentContainer} style={commentsWindowStyle}>
          <button
            className={styles.closeButtonStyle}
            onClick={handleCloseInitial}
          >
            &times;
          </button>

          <CommentForm
            placeholder={"Start a thread"}
            onAddComment={handleAddThread}
          />
        </div>
      )}
    </>
  );
};
