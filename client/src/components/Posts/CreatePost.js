import React, {useState, useEffect} from 'react';
import ReactQuill from 'react-quill';
import {connect} from 'react-redux';
import {addPost} from '../../actions/posts';
import {loadUser} from '../../actions/user';
import 'react-quill/dist/quill.snow.css';

const CreatePost = ({addPost, loadUser}) => {

    useEffect(()=>{
        loadUser();
    },[loadUser]);

    const [formData, setFormData] = useState({
        title:'',
        cover_img: '',
        content:''
    });

    const contentUpdate = e => {
        setFormData({...formData, content: e})
    }

    const formSubmit = e => {
        e.preventDefault();
        addPost(formData);
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
        <div className="container mt-4">
            <div className="text-center h4">Create a New Post</div>
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
                <ReactQuill 
                    onChange={e => contentUpdate(e)}
                    className="mt-4"
                    style={{'height':'300px'}}
                    // value={formData.content}
                    modules={modules}
                    formats={formats}
                    placeholder="write your text here..."
                />
                <button className="btn btn-outline-dark btn-block btn-sm mt-5">Submit</button>
            </form>
        </div>
    )
}

export default connect(null, {addPost, loadUser})(CreatePost);
