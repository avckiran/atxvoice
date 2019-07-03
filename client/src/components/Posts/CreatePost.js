import React, {useState} from 'react';
import ReactQuill from 'react-quill';
import {connect} from 'react-redux';
import {addPost} from '../../actions/posts';
import 'react-quill/dist/quill.snow.css';


const CreatePost = ({addPost}) => {

    const [formData, setFormData] = useState({
        title:'',
        coverImg: '',
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
            [{'font': []}, {size:[]} ],
            ['bold','italic','underline','strike','blockquote'],
            [{'list':'ordered'}, {'list':'bullet'}],
            ['code-block','link','image','video'],
            ['clean']
        ]
    }
    const formats=[
        'header','font','size','bold','italic','underline','strike','blockquote',
        'list','bullet','link','image','video','code-block'
    ]

    return (
        <div className="container mt-4">
            <div className="text-center h4">Create a New Post</div>
            <form onSubmit={e=> formSubmit(e)} className="mx-3">
                <label htmlFor="title" className="mt-3"> Title : </label>
                <input 
                    type="text" 
                    name="title" 
                    className="form-control" 
                    value={formData.title} 
                    onChange={e => setFormData({...formData, title:e.target.value})}
                />
                <label htmlFor="cover_img" className="mt-3"> Cover Image: </label>
                <input 
                    type="text" 
                    name="cover_img" 
                    className="form-control"
                    value={formData.coverImg}
                    onChange={e => setFormData({...formData, coverImg:e.target.value})}
                    />
                <label htmlFor="content" className="mt-4">Post</label>
                <ReactQuill 
                    onChange={e => contentUpdate(e)}
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

export default connect(null, {addPost})(CreatePost);
