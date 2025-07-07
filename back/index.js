const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const path = require('path');

// import routes
const indexRoute = require("./API/index.js");
const adminRoute = require("./API/admin.js")
const pl_route = require("./API/project_leader.js")
const head_route = require('./API/head.js')
const commitee_route = require('./API/commitee.js')
require('./models/proposalModel.js');


//middleware
const verifyToken = require('./middlewares/verifyToken.js');
const requireActiveRole = require('./middlewares/requireActiveRole.js');

// init express
const app = express();
//production
app.use(session({
    secret: 'casonlynajanongbaw',
    saveUninitialized: true,
    resave: false,
    store: new MemoryStore({
        checkPeriod: 86400000
    }),
    cookie: { maxAge: 86400000 }
}));



app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});
// use express json
app.use(express.json());

app.get('/hello1',(req,res)=>{
    res.json({"text":"hello backend"})
})
// use cors
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

// use router
app.use('/',indexRoute);
app.use('/pl',verifyToken, requireActiveRole(1),pl_route)
app.use('/admin',verifyToken, requireActiveRole(4),adminRoute)
app.use('/head',verifyToken, requireActiveRole(2),head_route)  
app.use('/commitee',verifyToken, requireActiveRole(3),commitee_route)

//use file
app.use('/Files', express.static(path.join(__dirname, '/Files')));

// Production API End-Point  https://asds-cas.mfu.ac.th/api/ == Develop Phase API End-Point  https://localhost:5000/

app.listen(5000, () => console.log('[Develop Phase] Server running at http://localhost:5000/'));

