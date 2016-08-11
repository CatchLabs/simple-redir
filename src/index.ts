import * as Koa from 'koa';
const app = new Koa();
const pkg = require('../package');

app.use(async (ctx) => {
    ctx.set('X-Redirect-Service-Version', pkg.version);
});

app.listen(process.env.PORT || 3020);