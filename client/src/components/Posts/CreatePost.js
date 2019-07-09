import React, {useState, useEffect} from 'react';
import ReactQuill from 'react-quill';
import {connect} from 'react-redux';
import {addPost, coverImgUpload} from '../../actions/posts';
import {loadUser} from '../../actions/user';
import 'react-quill/dist/quill.snow.css';
import {Link} from 'react-router-dom';

const CreatePost = ({addPost, loadUser, coverImgUpload, filePath}) => {

    useEffect(()=>{
        loadUser();
    },[loadUser]);

    const [formData, setFormData] = useState({
        title:'',
        cover_img: '',
        content:''
    });

    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');

    const contentUpdate = e => {
        setFormData({...formData, content: e})
    }

    const formSubmit = e => {
        e.preventDefault();
        // console.log("form data", formData);
        // console.log("file path", filePath);
        addPost(formData, filePath);
    }

    const onFileChange = e => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }

    const uploadPicture = e => {
        coverImgUpload(file);
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
                {/* <input 
                    type="text" 
                    name="cover_img" 
                    placeholder="Cover image..."
                    className="form-control mt-3"
                    value={formData.cover_img}
                    onChange={e => setFormData({...formData, cover_img:e.target.value})}
                    /> */}
                
                <div className="d-flex custom-file mt-3 align-center">
                    <div className="col-md-9">
                        <input onChange={e=> onFileChange(e)} name="picture" type="file" className="custom-file-input"  accept="image/png, image/jpeg"/>
                        <label htmlFor="image" className="custom-file-label">{fileName}</label>
                    </div>
                    <div className="col-md-3">
                        <button type="button" onClick={uploadPicture} className="d-inline btn btn-dark">Upload</button>
                    </div>
                </div>
                <ReactQuill 
                    onChange={e => contentUpdate(e)}
                    className="mt-4"
                    style={{'height':'300px'}}
                    // value={formData.content}
                    modules={modules}
                    formats={formats}
                    placeholder="write your text here..."
                />
                {/* <Link to="/">  */}
                <button type="Submit" className="btn btn-outline-dark btn-block btn-sm mt-5">Submit</button> 
                {/* </Link> */}
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    // fileName: state.coverImgDetails.fileName,
    filePath: state.posts.coverImgDetails.filePath
})

export default connect(mapStateToProps, {addPost, loadUser, coverImgUpload})(CreatePost);
