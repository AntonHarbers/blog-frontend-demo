/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types

export default function Comment({ comment }) {
  return (
    <div className="CommentContainer">
      <div className="CommentContent">{comment.content}</div>
      <div className="CommentAuthor">{comment.author.email}</div>
      <div className="CommentTimestamp">
        {new Date(comment.created_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </div>
    </div>
  );
}
