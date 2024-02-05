/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types

export default function Comment({ comment }) {
  return (
    <div className="CommentContainer">
      <div className="CommentContent">{comment.content}</div>
      <div
        className={`CommentAuthor ${comment.author.is_admin && 'AdminComment'}`}
      >
        By:{' '}
        {comment.author.username != undefined ? comment.author.username : 'You'}
      </div>
      <div className="CommentTimestamp">
        {`Posted: ` +
          new Date(comment.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
      </div>
    </div>
  );
}
