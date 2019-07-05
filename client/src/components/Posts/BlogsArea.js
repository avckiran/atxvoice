import React, {useEffect, Fragment} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getPosts} from '../../actions/posts';
import Spinner from '../Spinner';

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
                    <div className="d-flex my-1">
                        <div className="my-auto">
                            <img src={user_profile_img} alt="" style={userImgStyle}/>
                        </div>
                        <div>
                            {user_name}
                        </div>
                    </div>
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
            <div className="text-right">
                <Link to="/post/new" className="btn btn-dark mb-3 align-right">Create New Post</Link>
            </div>
            {posts.loading? <div> <Spinner /> </div>: 
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
