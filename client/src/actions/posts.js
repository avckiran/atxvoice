import {
    GET_POSTS,
    GET_POST,
    REMOVE_CURRENT_POST,
    POST_ADDED,
    POST_UPDATED,
    POST_DELETED,
    POST_LIKED,
    POST_UNLIKED,
    COMMENT_ADDED,
    COMMENT_DELETED,
    UNKNOWN_ERROR
} from './types';
import axios from 'axios';

export const getPosts = () => async dispatch => {
    try{
        const res = await axios.get('/api/posts');
        const payload = res.data.filter(post => post.cover_img);
        dispatch({
            type: GET_POSTS,
            payload
        })
    }catch(err){
        console.log(err);
    }
}

export const getPost = postId => async dispatch => {
    try{
        const res = await axios.get(`/api/posts/${postId}`)
        dispatch({
            type: GET_POST,
            payload: res.data
        })
    }catch(err){
        console.log(err);
    }
}

export const unloadCurrentPost = () => async dispatch => {
    dispatch({
        type: REMOVE_CURRENT_POST
    })
}

export const addPost = formData => async dispatch => {
    if(formData){
        try{
            await axios.post('/api/posts', formData)
            dispatch({
                type: POST_ADDED
            })
        }catch(err){
            console.log(err);
        }
    }
    
}

export const editPost = (postId, formData) => async dispatch => {
    try{
        await axios.put(`/api/posts/${postId}`, formData)
        dispatch({
            type: POST_UPDATED,

        })

    }catch(err){
        console.log(err);
    }
}

export const deletePost = postId => async dispatch => {
    try{
        const res = await axios.delete(`/api/posts/${postId}`)
        if(res.data.msg === 'Post deleted successfully'){
            dispatch({
                type: POST_DELETED
            })
            unloadCurrentPost();
        }else{
            dispatch({
                type: UNKNOWN_ERROR
            })
        }
    }catch(err){
        console.log(err);
    }
}

export const likePost = postId => async dispatch => {
    try{
        const res = await axios.put(`/api/posts/like/${postId}`)
        if(res) {
            const post = await axios.get(`/api/posts/${postId}`)
            // console.log('res', res);
            // console.log('post', post);
            if(res.data.msg === 'Post liked'){
                dispatch({
                    type: POST_LIKED,
                    payload: post.data
                })
            }else{
                dispatch({
                    type: POST_UNLIKED,
                    payload: post.data
                })
            }
        }


    }catch(err){
        console.log(err);
    }
}

export const addComment = (postId, comment) => async dispatch => {
    try{
        const res = await axios.put(`/api/posts/comment/${postId}`, {comment})
        // console.log(res);
        if(res.data.msg){
            const post = await axios.get(`/api/posts/${postId}`)
            dispatch({
                type: COMMENT_ADDED,
                payload: post.data
            })
        }

    }catch(err){
        console.log(err);
    }
}

export const deleteComment = (postId, commentId) => async dispatch => {
    try{
        const res = await axios.delete(`/api/posts/${postId}/comment/${commentId}`);
        if(res.data.msg){
            const post = await axios.get(`/api/posts/${postId}`)
            dispatch({
                type: COMMENT_DELETED,
                payload: post.data
            })
        }
    }catch(err){
        console.log(err);
    }
}