import React, { useState } from 'react'
import axios from 'axios'
const PostCreate = () => {
    const [title, setTitle] = useState('')

    const onSubmit = async (event) => {
        try {
            event.preventDefault()
            await axios.post('http://posts.com/posts/create', {
                title: title,
            })
            setTitle('')
        } catch (err) {}
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default PostCreate
