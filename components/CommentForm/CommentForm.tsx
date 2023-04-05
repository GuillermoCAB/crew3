// CommentForm.tsx
import React, { useState, FormEvent } from "react";
import EmojiPicker from "emoji-picker-react";
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
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!text) return;
    onAddComment(text);
    setText("");
  };

  const onEmojiClick = (emojiObject: any) => {
    setText((prevText) => prevText + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder || "Write your comment"}
      />
      <div className={styles.line} />
      <div className={styles.bottomContainer}>
        <button
          className={styles.addEmoji}
          type="button"
          onClick={toggleEmojiPicker}
        >
          Emoji
        </button>
        {showEmojiPicker && (
          <div className={styles.emojiContainer}>
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}
        <button className={styles.addComment} type="submit">
          →
        </button>
      </div>
    </form>
  );
};
