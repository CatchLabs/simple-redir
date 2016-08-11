import * as Koa from 'koa';
import router from './routes';
const app = new Koa();
const pkg = require('../package');

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (e) {
        ctx.status = e.status || 500;
        ctx.body = e.message || 'Internal Server Error';
    }
});

app.use(async (ctx) => {
    ctx.set('X-Redirect-Service-Version', pkg.version);
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(process.env.PORT || 3020);