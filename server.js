const express = require('express');
const connectDB = require('./config/db');
const fileUpload = require('express-fileupload');
const app = express();
const path = require('path');

app.use(express.json({extended:false}));
app.use(fileUpload());
// app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.static(path.join(__dirname, '/public')));

connectDB();

app.get('/', (req,res) =>{
    res.render('index.html');
})

// app.use('/api/user', require('./routes/user'));
// app.use('/api/test', require('./routes/test'));
// app.use('/api/posts', require('./routes/posts'));
// app.use('/api/tweets', require('./routes/tweets'));
// app.use('/api/events', require('./routes/events'));
// app.use('/api/weather', require('./routes/weather'));



// app.post('/upload', (req,res)=>{
//     if(req.files === null){
//         return res.json({status:400, msg: "No file uploaded"})
//     }
//     const file = req.files.file;
//     const fileName = Date.now()+'_'+file.name;
//     file.mv(`${__dirname}/client/public/uploads/${fileName}`, err => {
//         if(err){
//             console.error(err);
//             return res.status(500).send(err);
//         }
//         res.json({fileName: file.name, filePath: `/uploads/${fileName}`});
//     });
// })

app.get('*', (req,res)=>{
    res.status(404).send('Page Not Found')
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));
