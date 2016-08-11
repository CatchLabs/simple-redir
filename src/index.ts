import * as Koa from 'koa';
const app = new Koa();
app.listen(process.env.PORT || 3020);