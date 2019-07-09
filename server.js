const express = require('express');
const connectDB = require('./config/db');
const fileUpload = require('express-fileupload');
const app = express();
const path = require('path');

//configuring middleware for body-parser
app.use(express.json({extended:false}));
app.use(fileUpload());
// app.use(express.static(path.join(__dirname, "client/build")))
//connect Database
connectDB();


//Route Definitions
app.use('/api/user', require('./routes/user'));
app.use('/api/test', require('./routes/test'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/tweets', require('./routes/tweets'));
app.use('/api/events', require('./routes/events'));
app.use('/api/weather', require('./routes/weather'));

//File Upload end point

app.post('/upload', (req,res)=>{
    if(req.files === null){
        return res.json({status:400, msg: "No file uploaded"})
    }
    const file = req.files.file;
    const fileName = Date.now()+'_'+file.name;
    file.mv(`${__dirname}/client/public/uploads/${fileName}`, err => {
        if(err){
            console.error(err);
            return res.status(500).send(err);
        }
        res.json({fileName: file.name, filePath: `/uploads/${fileName}`});
    });
})

//Serve static assets in production
if(process.env.NODE_ENV === 'production') {
    //Static folder
    app.use(express.static('client/build'))

    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.use(express.static(path.join(__dirname, "client/build")))



// //Unhandled Route
// app.get('*', (req,res)=>{
//     res.status(404).json({ msg: "Unhandled Route, 404 Not found!"});
// })

//Starting server
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));
