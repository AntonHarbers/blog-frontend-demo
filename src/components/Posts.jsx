import { useState } from 'react';
import { useEffect } from 'react';

// eslint-disable-next-line react/prop-types
export default function Posts({ loggedIn }) {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getPostsAndComments = async () => {
      const postReponse = await fetch('http://localhost:3000/posts');
      const postData = await postReponse.json();

      setPosts(postData);
      console.log(postData);

      const commentsResponse = await fetch('http://localhost:3000/comments');
      const commentsData = await commentsResponse.json();

      setComments(commentsData);
      console.log(commentsData);
    };

    getPostsAndComments().catch((e) => console.log(e));
  }, []);
  return (
    <div>
      {posts.map((post) => {
        return post.is_published ? (
          <div key={post._id}>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            {comments.map((comment) => {
              if (comment.post == post._id) {
                return <div key={comment._id}>{comment.content}</div>;
              }
            })}
          </div>
        ) : null;
      })}
    </div>
  );
}
