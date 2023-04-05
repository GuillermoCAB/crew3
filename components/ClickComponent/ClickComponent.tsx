// ClickComponent.tsx
import React, { useState, CSSProperties } from "react";
import { CommentForm } from "../CommentForm";
import styles from "../../styles/components/ClickComponent.module.scss";

interface ClickComponentProps {
  x: number;
  y: number;
}

interface Comment {
  id: number;
  text: string;
}

export const ClickComponent: React.FC<ClickComponentProps> = ({ x, y }) => {
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

  const handleAddComment = (text: string) => {
    const newComment: Comment = {
      id: new Date().getTime(),
      text,
    };
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const handleClick = (event: any) => {
    event.stopPropagation();

    setIsActive(true);
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
        {comments.length}
      </div>
      {isHovering && !isActive && (
        <div className={styles.commentContainer} style={commentsWindowStyle}>
          <h3>Comments</h3>
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>{comment.text}</li>
            ))}
          </ul>
        </div>
      )}
      {isActive && (
        <div className={styles.commentContainer} style={commentsWindowStyle}>
          <button
            className={styles.closeButtonStyle}
            onClick={() => setIsActive(false)}
          >
            &times;
          </button>
          <h3>Comments</h3>
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>{comment.text}</li>
            ))}
          </ul>
          <CommentForm onAddComment={handleAddComment} />
        </div>
      )}
    </>
  );
};
