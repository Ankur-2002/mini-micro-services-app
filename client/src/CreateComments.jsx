import React, { useState } from 'react'
import axios from 'axios'
const CreateComments = ({ postId }) => {
    const [comment, setComment] = useState('')

    const onSubmit = async (event) => {
        try {
            event.preventDefault()
            await axios.post(`http://posts.com/posts/${postId}/comments`, {
                content: comment,
            })
            setComment('')
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>New Comment</label>
                    <input
                        className="form-control"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default CreateComments
