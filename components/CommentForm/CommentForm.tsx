// CommentForm.tsx
import React, { useState, FormEvent } from "react";
import styles from "../../styles/components/CommentForm.module.scss";

interface CommentFormProps {
  onAddComment: (text: string) => void;
}

export const CommentForm: React.FC<CommentFormProps> = ({ onAddComment }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onAddComment(text);
    setText("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your comment"
        rows={3}
      />
      <button type="submit">Add Comment</button>
    </form>
  );
};
