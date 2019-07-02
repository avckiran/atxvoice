import React, {useEffect, Fragment} from 'react';
import {connect} from 'react-redux';
import {Redirect, Link} from 'react-router-dom';
import {getPosts} from '../actions/posts';

const BlogsArea = ({posts, getPosts}) => {

    useEffect(() => {
        getPosts();
    },[getPosts])

    // To display a media object type cards
    const smallCard = (id, cover_img, title, created_date, user_name, user_profile_img) => {
        return(
            <div key={id} className="d-flex m-3">
                <div className='m-2'> 
                    <img src={cover_img} alt="" className="img-fluid" style={imgStyle}/>
                </div>
                <div className='m-2'>
                    <h5>{title}</h5>
                    <small className="text-muted">{created_date}</small>
                    <p>by <span className='p-3'>
                    <img src={user_profile_img} alt="" style={userImgStyle}/>
                    {user_name}
                    </span></p>
                    <Link className="btn btn-outline-dark btn-sm" to={`/post/${id}`}> Read More</Link>
                </div>
            </div>
        )
    }

    const imgStyle = {
        width: 'auto',
        height: 'auto',
        maxWidth: '150px',
        cursor: 'pointer'
    }

    const userImgStyle = {
        width:'auto',
        height:'auto',
        maxWidth:'20px'
    }


    return (
        <div>
            {posts.loading? <div> Loading </div>: 
                <Fragment>
                {posts.posts.map(post => (
                    smallCard(post._id, post.cover_img, post.title, post.createdDate, post.user.firstName, post.user.profileImage)
                ))}
                
                </Fragment>
            }
        </div>
    )


    
}

const mapStateToProps = state => ({
    posts: state.posts
})

export default connect(mapStateToProps, {getPosts})(BlogsArea);
