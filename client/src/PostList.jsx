import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CreateComments from './CreateComments'
import CommentList from './CommentList'
const PostList = () => {
    const [posts, setPosts] = useState({})
    const fetchPosts = async () => {
        try {
            const res = await axios.get('http://posts.com/posts')
            setPosts(res.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    const renderedElements = Object.values(posts).map((post) => {
        return (
            <div
                className="card"
                style={{
                    width: '30%',
                    marginBottom: '30px',
                }}
                key={post.id}
            >
                <div className="card-body">
                    <h1>{post?.title}</h1>
                    <CommentList comments={post.comments} />
                    <CreateComments postId={post.id} />
                </div>
            </div>
        )
    })
    return (
        <div className="d-flex flex-row flex-wrap justify-content-between">
            {renderedElements}
        </div>
    )
}

export default PostList
