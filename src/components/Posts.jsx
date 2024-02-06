import { useState } from 'react';
import { useEffect } from 'react';
import Comment from './Comment';
import CommentsForm from './CommentsForm';

// eslint-disable-next-line react/prop-types
export default function Posts({ userId }) {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getPostsAndComments = async () => {
      const postReponse = await fetch(`${import.meta.env.VITE_API_PATH}posts`);
      const postData = await postReponse.json();

      setPosts(postData);

      const commentsResponse = await fetch(
        `${import.meta.env.VITE_API_PATH}comments`
      );
      const commentsData = await commentsResponse.json();

      setComments(commentsData);
    };

    getPostsAndComments().catch((e) => console.log(e));
  }, []);

  const HandlePostingComment = async (e, postId, commentText) => {
    // api call here

    const response = await fetch(`${import.meta.env.VITE_API_PATH}comments`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(
          import.meta.env.VITE_JWT
        )}`,
      },
      body: JSON.stringify({
        content: commentText,
        authorId: userId,
        postId: postId,
      }),
    });

    const data = await response.json();
    setComments([...comments, data]);
  };

  return (
    <div>
      {posts.map((post) => {
        return post.is_published ? (
          <div key={post._id}>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <div>Comments:</div>
            <div className="CommentsBox">
              {comments
                .slice()
                .reverse()
                .map((comment) => {
                  if (comment.post._id == post._id) {
                    return (
                      <div key={comment._id}>
                        <Comment comment={comment} />
                      </div>
                    );
                  }

                  if (comment.post == post._id) {
                    return (
                      <div key={comment._id}>
                        <Comment comment={comment} />
                      </div>
                    );
                  }
                })}
            </div>

            {userId != null && (
              <CommentsForm
                HandlePostingComment={HandlePostingComment}
                post={post}
              />
            )}
          </div>
        ) : null;
      })}
    </div>
  );
}
