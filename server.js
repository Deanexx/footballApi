const dotenv = require('dotenv'),
    app = require('./app'),
    mongoose = require('mongoose')

dotenv.config({
    path: './config.env'
})

mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log("Database is connected"))

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('App is started running on a port ' + port);
});