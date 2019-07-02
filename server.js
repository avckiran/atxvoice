const express = require('express');
const connectDB = require('./config/db')
const app = express();

//configuring middleware for body-parser
app.use(express.json({extended:false}));

//connect Database
connectDB();

// root route
app.get('/', (req,res) =>{
    res.send("API is running");
})

//Route Definitions
app.use('/api/user', require('./routes/user'));
app.use('/api/test', require('./routes/test'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/tweets', require('./routes/tweets'));


//Unhandled Route
app.get('*', (req,res)=>{
    res.status(404).json({ msg: "Unhandled Route, 404 Not found!"});
})

//Starting server
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));
