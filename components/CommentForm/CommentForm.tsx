// CommentForm.tsx
import React, { useState, FormEvent } from "react";
import styles from "../../styles/components/CommentForm.module.scss";

interface CommentFormProps {
  onAddComment: (text: string) => void;
  placeholder?: string;
}

export const CommentForm: React.FC<CommentFormProps> = ({
  onAddComment,
  placeholder,
}) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!text) return;
    onAddComment(text);
    setText("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder || "Write your comment"}
      />
      <button className={styles.addComment} type="submit">
        →
      </button>
    </form>
  );
};
