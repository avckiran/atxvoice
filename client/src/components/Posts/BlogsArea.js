import React, {useEffect, Fragment} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getPosts} from '../../actions/posts';
import Spinner from '../Spinner';
import Moment from 'react-moment';



const BlogsArea = ({posts, getPosts, isAuthenticated}) => {

    useEffect(() => {
        getPosts();
    },[getPosts]);


    const smallCard2 = (id, cover_img, title, created_date, user_name, desc) => {
        return(
            <div className="m-2 p-2 pb-3 border-bottom">
                <li className="media mt-3">
                <Link to={`/post/${id}`}>
                    <img className="img-fluid mr-3" style={imgStyle} src={cover_img} alt='blog cover' />
                </Link>
                <div className="media-body">
                    <Link to={`/post/${id}`} className="text-dark">
                    <h5>{title}</h5>
                    </Link>
                        <p> {desc} </p>
                        <div className="d-flex align-items-center justify-content-between mt-4">
                            <div>
                                {/* <img src={user_profile_img} width="30px" alt="" className="img-fluid border rounded-circle"/> */}
                                <small><em><div className="d-md-inline d-sm-block nav-link text-dark pl-1">{user_name}</div></em></small>
                            </div>
                            <div>
                                <small><Moment format="MMM DD, YY">{created_date}</Moment></small>
                                
                            </div>
                        </div>
                </div>
                </li>
            </div>
        )
    }

    const imgStyle = {
        width: '100px',
        height: '100px',
        // maxWidth: '150px',
        objectFit: 'cover',
        cursor: 'pointer'
    }

    const link = (
        isAuthenticated ? '/post/new' : '/login'
    )

    return (
        <div>
            <div className="text-left">
                <Link to={link} className="btn btn-dark mb-3 align-left">Create New Post</Link>
            </div>
            {posts.loading? <div> <Spinner /> </div>: 
                <Fragment>
                {posts.posts.reverse().map(post => (
                    <div key={post._id}>
                        {smallCard2(post._id, post.cover_img, post.title, post.createdDate, post.user.firstName+' '+post.user.lastName, 
                        post.content.replace(/(<([^>]+)>)/ig,'').substr(0,50).replace(/&.*;/g,'')+'...')
                        // striptags(post.content).substr(0,50)+'...')
                        // replace(/(<([^>]+)>)/ig,'')
                        // replace(/<[^>]+>/g, '')
                        }
                    </div>
                ))}
                
                </Fragment>
            }
        </div>
    )


    
}

const mapStateToProps = state => ({
    posts: state.posts,
    isAuthenticated: state.user.isAuthenticated
})

export default connect(mapStateToProps, {getPosts})(BlogsArea);
