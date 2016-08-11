import * as Koa from 'koa';
import router from './routes';
const app = new Koa();
const pkg = require('../package');

app.use(async (ctx) => {
    ctx.set('X-Redirect-Service-Version', pkg.version);
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(process.env.PORT || 3020);