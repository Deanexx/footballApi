const express = require('express'),
    cors = require('cors'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    routerPoll = require('./router/pollRouter')
    routerGoalie = require('./router/goalieRouter')
    routerFootballers = require('./router/footballersRouter')

const app = express();


/*   Middleware  */
app.use(cookieParser());

if(process.env.NODE_ENV === 'development')
    app.use(morgan('dev'));

app.use(express.json());
app.use(cors({
    origin: 'https://football-vote-app.herokuapp.com',
    optionsSuccessStatus: 200,
    credentials: true // allowing setting cookies
}))

/*   Routes     */
app.use("/poll", routerPoll)
app.use("/footballers", routerFootballers)
app.use("/goalie", routerGoalie)

module.exports = app;