import {
    GET_POSTS,
    GET_POST,
    REMOVE_CURRENT_POST,
    POST_ADDED
} from './types';
import axios from 'axios';
import { loadUser } from './user';

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
        loadUser();
        try{
            const config = {
                headers: {'Content-Type': 'application/json'}
            }
            const res = await axios.post('/api/posts', formData, config )
            console.log(res.data);
        }catch(err){
            console.log(err);
        }
    }
    
}