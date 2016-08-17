import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import router from './routes';
const app = new Koa();
const pkg = require('../package');

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (e) {
        if (e.status === 401) {
            ctx.set('WWW-Authenticate', 'Basic');
        } else {
            console.error(e);
        }
        ctx.status = e.status || 500;
        ctx.body = e.message || 'Internal Server Error';
    }
});

app.use(bodyParser());

app.use(async (ctx, next) => {
    ctx.set('X-Redirect-Service-Version', pkg.version);
    await next();
});

app.use(router.routes());
app.use(router.allowedMethods());

const port = process.env.PORT || 3020;
app.listen(port);

console.log(`Redirect Service listening on port ${port}.`);