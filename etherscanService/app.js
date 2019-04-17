var Koa = require('koa')
  , logger = require('koa-logger')
  , json = require('koa-json')
  , bodyParser = require('koa-bodyparser')
  , cors = require('koa2-cors')
  , router = require('koa-router')()
  , onerror = require('koa-onerror');


//router
var queryEtherServer = require('./routes/queryEtherServer');
var queryTokenServer = require('./routes/queryTokenServer');
var listenBlocksTransactions = require('./routes/listenBlocksTransactions');
var fabricServer = require('./routes/fabricServer');
var dbServer = require('./routes/dbServer');

//配置路由
router.get('/',(ctx)=>{

  ctx.body='这是一个首页';
})
//
var app = new Koa();
// error handler
onerror(app);

/*
  /admin   配置子路由  层级路由

 /admin/user
 */
router.use('/eth',queryEtherServer);
/*
 /api/newslist   新闻列表的api
 */
router.use('/token',queryTokenServer);

router.use('/listen',listenBlocksTransactions);

router.use('/fabric',fabricServer);
router.use('/db',dbServer);


//
app.use(cors({
  origin: function (ctx) {
    return "*";
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
//
app.use(bodyParser());
//
app.use(router.routes());   /*启动路由*/
app.use(router.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app;
