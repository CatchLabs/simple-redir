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
            url = url.replace('${param}', param);
        }
        ctx.redirect(url);
    }
}

router.get('/:token', redirect);
router.get('/:token/:param', redirect);

/**
 * @api {GET} / List all links
 * @apiName ListLinks
 * @apiGroup Link
 */
router.get('/', async (ctx) => {
    const links = await models.link.findAll();
    ctx.type = '.json';
    ctx.body = JSON.stringify(links);
});

/**
 * @api {PUT} /:token Create or update link
 * @apiName PutLink
 * @apiGroup Link
 * @apiParam {String} url Target url
 * @apiParam {String} token
 */
router.put('/:token', async (ctx: any) => {
    const {token} = ctx.params;
    const {body} = ctx.request;
    const link = await models.link.findOne({
        where: {
            linkToken: token
        }
    });
    if (!link) {
        await models.link.create({linkToken: token, linkUrl: body.url});
    } else {
        if (body.url) {
            link.set('linkUrl', body.url);
        }
        if (body.token) {
            link.set('linkToken', body.token);
        }
        await link.save();
    }
    ctx.body = 'OK';
});

/**
 * @api {DELETE} /:token Delete link
 * @apiName DeleteLink
 * @apiGroup Link
 */
router.delete('/:token', async (ctx) => {
    const {token} = ctx.params;
    const link = await models.link.findOne({
        where: {
            linkToken: token
        }
    });
    if (!link) {
        ctx.status = 404;
    } else {
        await link.destroy();
    }
    ctx.body = 'OK';
})

export default router;