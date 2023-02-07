import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../redux/features/postSlice'
function MainPage() {
    const dispatch = useDispatch()
    const data = useSelector(state => state.post.posts) || 'Not found'
    console.log(data)

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])
    return (
        <div className='py-20'>
            <div className="container mx-auto px-5">
                <ul className="list-disc">
                    {
                        data && data.map(post => (
                            <li key={post._id}>
                                Author: {post.username}<br />
                                Title: {post.title}<br />
                                Text: {post.text}<br />
                                Post Image: <img src={`http://localhost:4444/${post.imageUrl}`} alt='Not found' />
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div >
    )
}

export default MainPage