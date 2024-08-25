const express = require('express');
const connectDb = require('./Config/databaseConnect');
const app = express();
const cookieParser = require('cookie-parser');

const authRoute = require('./Routes/authRoute');
const messageRoute = require('./Routes/messageRoute');
const userRoute = require('./Routes/userRoute');

require('dotenv').config();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/message', messageRoute);
app.use('/api/users', userRoute);



app.listen(PORT, () => {
    console.log(`Server started at ${PORT} `);
    // database connection
    connectDb();
});


// cloudinaryConnect();

app.get('/', (req,res) => {
    res.send('This is Ramlal homepage');
})