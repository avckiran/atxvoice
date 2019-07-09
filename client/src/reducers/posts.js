import {
    GET_POSTS,
    GET_POST,
    REMOVE_CURRENT_POST,
    POST_ADDED,
    POST_LIKED,
    POST_UNLIKED,
    COMMENT_ADDED,
    COMMENT_DELETED,
    COVER_IMG_UPLOADED
} from '../actions/types';

const initialState = {
    loading: true,
    coverImgUploaded: false,
    coverImgDetails:{
        filePath:'',
        fileName:''
    }
}

export default function(state=initialState, action){
    const {type, payload} = action;
    
    switch(type){
        case GET_POSTS : 
            return{
                ...state,
                posts: payload,
                loading: false
            }
        
        case GET_POST: 
            return{
                ...state,
                onePost: payload
            }
        
        case POST_ADDED: 
            return{
                ...state,
                posts: [payload, ...state.posts]
            }
        
        case REMOVE_CURRENT_POST:
            return{
                ...state,
                onePost: null
            }
        
        case POST_LIKED:
        case POST_UNLIKED:
        case COMMENT_ADDED:
        case COMMENT_DELETED:
            return{
                ...state, 
                onePost: payload
            }
        
        case COVER_IMG_UPLOADED:
            return{
                ...state,
                coverImgUploaded: true,
                coverImgDetails: payload
            }

        default: return state
    }
}