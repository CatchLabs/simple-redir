import * as Router from 'koa-router';
import models from '../models';
const router = new Router();

async function redirect(ctx: Router.IRouterContext) {
    const {token, param} = ctx.params;
    const link = await models.link.findOne({
        where: {
            linkToken: token
        }
    });
    if (!link) {
        ctx.status = 404;
    } else {
        let url = link.linkUrl;
        if (param) {
            url = url.replace(/${param}/g, param);
        }
        ctx.redirect(url);
    }
}

router.get('/links/:token', redirect);
router.get('/links/:token/:param', redirect);

router.get('/links', async (ctx) => {
    const links = await models.link.findAll();
    ctx.type = '.json';
    ctx.body = JSON.stringify(links);
});

router.post('/links', async (ctx: any) => {
    const {linkToken, linkUrl} = ctx.request.body;
    if (!linkToken || !linkUrl) {
        throw new Error('Invalid linkToken or linkUrl');
    }
    const link = await models.link.create({linkToken, linkUrl});
    ctx.body = 'OK';
});

router.delete('/links/:token', async (ctx) => {
    const {token} = ctx.params;
    const link = await models.link.findOne({
        where: {
            linkToken: token
        }
    });
    if (!link) {
        ctx.status = 404;
    } else {
        link.destroy();
    }
    ctx.body = 'OK';
})

export default router;