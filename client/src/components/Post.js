import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {getPost} from '../actions/posts';


const Post = ({match, getPost, posts}) => {
    useEffect(()=>{
        getPost(match.params.id);
    },[getPost])

    const postStyle = {
        background: posts.onePost ? `url(${posts.onePost.cover_img})` : 'lightgrey',
        // background:'lightgrey',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover' ,
        backgroundAttachment: 'fixed',
        minHeight: '250px',
    }

    return (
        <div className="container mt-5">
            {posts.onePost? 
            <div className="mx-5">
                <div className="p-5 mt-0 mb-4" style={postStyle}> </div>
                {/* <div className="p-5 mt-0 mb-4"> </div> */}
                <h2 className="mb-3 text-dark"> {posts.onePost.title} </h2>
                <p className="text-secondary text-justify">{posts.onePost.content}</p>
                <p className="text-secondary text-justify">{posts.onePost.content}</p>
            </div> 
            : <div> Loading... </div>}
        </div>
    )

  
}

const mapStateToProps = state => ({
    posts: state.posts
})

export default connect(mapStateToProps, {getPost})(Post);
