import React, {useState, useEffect}  from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {editPost} from '../../actions/posts';


const EditPost = ({match, onePost, editPost}) => {
    const [formData, setFormData] = useState({
        title:'',
        cover_img: '',
        content:''
    });

   useEffect(()=>{
        setFormData({
            title: onePost? onePost.title : '',
            cover_img: onePost? onePost.cover_img :'',
            content: onePost? onePost.content: ''
        })
   },[setFormData])


    const contentUpdate = e => {
        setFormData({...formData, content: e})
    }

    const formSubmit = e => {
        e.preventDefault();
        editPost(match.params.id, formData);
    }

    const modules = {
        toolbar: [
            ['bold','italic','underline','strike','blockquote'],
            [{'list':'ordered'}, {'list':'bullet'}],
            ['code-block','link','image','video'],
            ['clean']
        ]
    }
    const formats=[
        'bold','italic','underline','strike','blockquote',
        'list','bullet','link','image','video','code-block'
    ]

    return (
        <div className="container mt-3">
            <Link to={`/post/${match.params.id}`} className="mb-3">Back</Link> <br/>
            <div className="text-center h4">Edit Post</div>
            <form onSubmit={e=> formSubmit(e)} className="mx-3">
                <input 
                    type="text" 
                    name="title" 
                    placeholder="Title of the post"
                    className="form-control mt-3" 
                    value={formData.title} 
                    onChange={e => setFormData({...formData, title:e.target.value})}
                />
                <input 
                    type="text" 
                    name="cover_img" 
                    placeholder="Cover image..."
                    className="form-control mt-3"
                    value={formData.cover_img}
                    onChange={e => setFormData({...formData, cover_img:e.target.value})}
                    />
                <div className="mb-3">
                    <ReactQuill 
                        onChange={e => contentUpdate(e)}
                        className="mt-4"
                        style={{'height':'300px'}}
                        defaultValue={onePost? onePost.content : ''}
                        modules={modules}
                        formats={formats}
                        placeholder="write your text here..."
                        />
                </div>
                <button className="btn btn-outline-dark btn-block btn-sm mt-5">Submit</button>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    onePost: state.posts.onePost
})

export default connect(mapStateToProps, {editPost})(EditPost);
