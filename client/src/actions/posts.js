import {
    GET_POSTS,
    GET_POST,
    REMOVE_CURRENT_POST
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