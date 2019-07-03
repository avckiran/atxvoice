import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {getPost, deletePost} from '../../actions/posts';
import {Link} from 'react-router-dom';
import Moment from 'react-moment'
import 'react-quill/dist/quill.snow.css';

const Post = ({match, getPost, posts, userInfo, deletePost}) => {
    useEffect(()=>{
        getPost(match.params.id);
    },[getPost])

    const postStyle = {
        background: posts.onePost ? `url(${posts.onePost.cover_img})` : 'lightgrey',
        // background:'lightgrey',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover' ,
        // backgroundAttachment: 'fixed',
        minHeight: '350px',
    }

    const deleteCurrentPost = () => {
        if (window.confirm('Are you sure you wish to delete this item?')) {
            deletePost(match.params.id);
        }
    }

  


    return (
        <div className="container mt-3">
            {posts.onePost? 
            <div className="mx-md-5 mx-sm-2">
                <Link to="/" className="mb-3">Back to posts</Link>
            <h2 className="mb-4 text-dark text-center display-4"> {posts.onePost.title} </h2>
                <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex">
                        <div className="mr-2">
                                <img src={posts.onePost.user.profileImage} width="50px" alt="" className="img-fluid border border-dark rounded-circle"/>
                        </div>
                        <div className="text-left">
                            {`${posts.onePost.user.firstName} ${posts.onePost.user.lastName} `} 
                            <br/>
                            <p className="text-dark"> <small><Moment format="MMM DD, YY" >{posts.onePost.createdDate}</Moment> </small> </p>
                        </div>
                    </div>
                    {(posts.onePost.user._id === userInfo._id) ? (
                    <div> 
                        <Link to={`/post/edit/${match.params.id}`} className="mr-2 btn btn-outline-dark btn-sm"> <i className="fas fa-pencil-alt"></i> Edit</Link>
                        <Link to="/" onClick ={deleteCurrentPost} className="btn btn-outline-danger btn-sm"><i className="fas fa-trash-alt"></i>{' '}Delete</Link> 
                    </div>
                        ) : (<div> </div>)}
             
                </div>

                <img src={posts.onePost.cover_img} className="img-fluid rounded mx-auto mb-5 d-block w-100" style={{'objectFit': 'cover', 'maxHeight':'300px'}}alt="Responsive image"></img>
                {/* <div className="mt-0 mb-1" style={postStyle}> </div> */}
                {/* <ReactQuill value={posts.onePost.content} /> */}
                {/* {posts.onePost.content}  */}
                <div className="mx-md-4" dangerouslySetInnerHTML={{ __html: posts.onePost.content }} />

                {/* <p className="text-secondary text-justify">{posts.onePost.content}</p> */}
            </div> 
            : <div> Loading... </div>}
        </div>
    )

  
}

const mapStateToProps = state => ({
    posts: state.posts,
    userInfo: state.user.userInfo
})

export default connect(mapStateToProps, {getPost, deletePost})(Post);
