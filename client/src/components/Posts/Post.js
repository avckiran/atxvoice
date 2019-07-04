import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {getPost, deletePost, likePost, addComment, deleteComment} from '../../actions/posts';
import {Link} from 'react-router-dom';
import Moment from 'react-moment'
import 'react-quill/dist/quill.snow.css';

const Post = ({match, getPost, posts, userInfo, deletePost, likePost, addComment, deleteComment}) => {
    useEffect(()=>{
        getPost(match.params.id);
    },[getPost])

    const [comment, setComment] = useState('');

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

    const likeThisPost = () => {
        likePost(match.params.id);
    }
  
    const commentSubmit = e => {
        e.preventDefault();
        addComment(match.params.id, comment);
        setComment('');
    }

    const deleteThisComment = comment_id => {
        deleteComment(match.params.id, comment_id)
    }


    return (
        <div className="container mt-3">
            {posts.onePost? 
            <div className="mx-md-5 mx-sm-2">
                <Link to="/" className="mb-3">Back to posts</Link>
            <h2 className="mb-4 text-dark text-center display-4"> {posts.onePost.title} </h2>
                <div className="mt-3 d-flex align-items-center justify-content-between">
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

                <img src={posts.onePost.cover_img} className="img-fluid rounded mx-auto mt-4 mb-5 d-block w-100" style={{'objectFit': 'cover', 'maxHeight':'300px'}}alt="Responsive image"></img>
                <div className="mx-md-4" dangerouslySetInnerHTML={{ __html: posts.onePost.content }} />
                <hr/>
                {/* Like Post functionality  */}
                <div className="d-flex align-items-center justify-content-between">
                    <div>
                        Likes : {posts.onePost.likes.length}
                        <div>
                            {posts.onePost.likes.map(like => (
                                <img key={like.user} src={like.profile_img} width="20px" alt={like.email} className="ml-2 img-fluid border border-dark rounded-circle"/>
                            ))}
                        </div>
                    </div>
                    <div>
                        {posts.onePost.likes.filter(like => (like.user === userInfo._id)).length>0 ? (
                            <div>
                                <button onClick={likeThisPost} className="btn btn-outline-danger btn-sm">Unlike</button>
                            </div>
                        ) : ( 
                        <button onClick={likeThisPost} className="btn btn-outline-dark btn-sm">Like this post</button>
                        ) }
                    </div>
                </div>
                <hr/>
                {/* Comments functionality */}
                <form onSubmit={e => commentSubmit(e)} className="form mb-4">
                    <div className="form-group">
                        <i className="far fa-comment-dots"></i> <label htmlFor="comment">Add comment</label>
                        <textarea 
                            className="form-control" 
                            name="comment" 
                            value={comment}
                            onChange = {e => setComment(e.target.value)}
                            rows="2"></textarea>
                    </div>
                    <button className="btn btn-outline-dark btn-sm">Add Comment</button>
                </form>
                
                {/* Display comments */}
                <div className="mt-3">
                {posts.onePost.comments.map(comment => (
                    <div className="card my-3">
                        <div className="card-header d-flex align-items-center bg-white border-bottom-0">
                            <div>
                                <img src={comment.profile_img} width="30px" alt={comment.email} className="ml-2 img-fluid border border-dark rounded-circle"/>
                            </div>
                            <div className="ml-3">
                                <span><small className="text-muted">{comment.name} <br/>
                                <Moment parse="x" format="MMM DD, h:MM A"> {comment.created_date} </Moment>
                                </small></span>
                            </div>
                            {comment.user === userInfo._id ? (  
                                <div className="ml-auto">
                                    {/* <button className="mr-2 btn btn-outline-dark btn-sm border-0"> <i className="fas fa-pencil-alt"></i></button> */}
                                    <button onClick={() => deleteThisComment(comment.id)} className="btn btn-outline-danger btn-sm border-0"><i className="fas fa-trash-alt"></i>{' '}</button> 
                                </div>
                                ) : (<div> </div>)}
                          
                        </div>
                        <div className="card-body ml-5">
                            {comment.comment}
                        </div>
                    </div>


                ))}

                </div>               

            </div> 
            : <div> Loading... </div>}

    

        </div>
    )

  
}

const mapStateToProps = state => ({
    posts: state.posts,
    userInfo: state.user.userInfo
})

export default connect(mapStateToProps, {getPost, deletePost, likePost, addComment, deleteComment})(Post);
