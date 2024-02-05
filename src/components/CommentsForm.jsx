import { useState } from 'react';

// eslint-disable-next-line react/prop-types
export default function CommentsForm({ HandlePostingComment, post }) {
  const [commentText, setCommentText] = useState('');

  const HandleNewCommentBtnClick = (e) => {
    e.preventDefault();
    if (commentText == '') {
      window.alert('Comment Cant be empty');
      return;
    }
    // eslint-disable-next-line react/prop-types
    HandlePostingComment(e, post._id, commentText);
    setCommentText('');
  };

  return (
    <form className="CommentForm">
      <textarea
        type="text"
        id="comment"
        className="CommentFormInput"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button
        className="CommentFormButton"
        type="submit"
        onClick={HandleNewCommentBtnClick}
      >
        Add Comment
      </button>
    </form>
  );
}
