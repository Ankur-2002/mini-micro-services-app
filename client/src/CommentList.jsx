import React, { useEffect, useState } from 'react'
import axios from 'axios'

const CommentList = ({ postId, comments: commentsData }) => {
    const [comments, setComments] = useState(commentsData)
    const fetchCommentByPostId = async () => {
        try {
            const res = await axios.get(
                'http://posts.com/posts/' + postId + '/comments'
            )
            setComments(res.data)
        } catch (error) {
            console.error(error)
        }
    }

    // useEffect(() => {
    //     fetchCommentByPostId()
    // }, [])

    const renderedElements = comments?.map((comment) => {
        return <li key={comment.id}>{comment.content}</li>
    })
    return <ul>{renderedElements}</ul>
}

export default CommentList
