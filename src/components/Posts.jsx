import { useState } from 'react';
import { useEffect } from 'react';
import Comment from './Comment';

// eslint-disable-next-line react/prop-types
export default function Posts({ userId }) {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const getPostsAndComments = async () => {
      const postReponse = await fetch('http://localhost:3000/posts');
      const postData = await postReponse.json();

      setPosts(postData);

      const commentsResponse = await fetch('http://localhost:3000/comments');
      const commentsData = await commentsResponse.json();

      setComments(commentsData);
    };

    getPostsAndComments().catch((e) => console.log(e));
  }, []);

  const HandlePostingComment = async (e, postId) => {
    e.preventDefault();
    if (commentText == '') {
      window.alert('Comment Cant be empty');
      return;
    }
    // api call here

    const response = await fetch('http://localhost:3000/comments', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('JWT-Blog-Front')}`,
      },
      body: JSON.stringify({
        content: commentText,
        authorId: userId,
        postId: postId,
      }),
    });

    const data = await response.json();
    console.log(data);
    setComments([...comments, data]);
    setCommentText('');
  };

  return (
    <div>
      {posts.map((post) => {
        return post.is_published ? (
          <div key={post._id}>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            {comments.map((comment) => {
              if (comment.post._id == post._id) {
                return (
                  <div key={comment._id}>
                    <Comment comment={comment} />
                  </div>
                );
              }
            })}
            {userId != null && (
              <form>
                <label htmlFor="comment"></label>
                <input
                  type="text"
                  id="comment"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button
                  type="submit"
                  onClick={(e) => HandlePostingComment(e, post._id)}
                >
                  Add Comment
                </button>
              </form>
            )}
          </div>
        ) : null;
      })}
    </div>
  );
}
