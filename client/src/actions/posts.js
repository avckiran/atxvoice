import {
    GET_POSTS,
    GET_POST,
    REMOVE_CURRENT_POST,
    POST_ADDED,
    POST_UPDATED,
    POST_DELETED
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
            const res = await axios.post('/api/posts', formData)
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
        const res = await axios.put(`/api/posts/${postId}`, formData)
        dispatch({
            type: POST_UPDATED
        })


    }catch(err){
        console.log(err);
    }
}

export const deletePost = postId => async dispatch => {
    try{
        const res = await axios.delete(`/api/posts/${postId}`)
        if(res){
            dispatch({
                type: POST_DELETED
            })
            unloadCurrentPost();
        }
    }catch(err){
        console.log(err);
    }
}