import * as Router from 'koa-router';
import models from '../models';
import * as uuid from 'node-uuid';
const router = new Router();
const config = require('../../config');

const auth = require('koa-basic-auth')({ name: config.authorization.username, pass: config.authorization.password });

async function redirect(ctx: Router.IRouterContext) {
    const {token, param} = ctx.params;
    const link = await models.link.findOne({ where: { token } });
    if (!link) {
        ctx.status = 404;
        return;
    }
    let ref = JSON.parse(link.references || '[]').filter((ref: {url: string, userAgent: string}) => {
        if (!ref.userAgent) {
            return true;
        } else {
            let regexp = new RegExp(ref.userAgent);
            return regexp.test(ctx.req.headers['user-agent']);
        }
    })[0];
    if (!ref) {
        ctx.status = 404;
        return;
    }
    if (param) {
        ref.url = ref.url.replace('${param}', param);
    }
    ctx.redirect(ref.url);
}

router.get('/:token', redirect);
router.get('/:token/:param', redirect);

/**
 * @api {GET} / List all links
 * @apiName ListLinks
 * @apiGroup Link
 */
router.get('/', auth, async (ctx) => {
    const links = await models.link.findAll();
    ctx.type = '.json';
    ctx.body = JSON.stringify(links.map((link) => (link.references = JSON.parse(link.references || '[]')) && link));
});

/**
 * @api {PUT} /:token Create or update link
 * @apiName PutLink
 * @apiGroup Link
 * @apiParam {String} token
 * @apiParam {Array} references
 */
router.put('/:token', auth, async (ctx: any) => {
    const {token} = ctx.params;
    const {body} = ctx.request;
    const [link, created] = await models.link.findOrCreate({ where: { token } });
    if (body.references) {
        link.set('references', JSON.stringify(body.references));
    }
    if (body.token) {
        link.set('token', body.token);
    }
    await link.save();
    ctx.body = 'OK';
});

/**
 * @api {DELETE} /:token Delete link
 * @apiName DeleteLink
 * @apiGroup Link
 */
router.delete('/:token', auth, async (ctx) => {
    const {token} = ctx.params;
    const link = await models.link.findOne({ where: { token } });
    if (!link) {
        ctx.status = 404;
    } else {
        await link.destroy();
    }
    ctx.status = 200;
});

/**
 * @api {POST} /:token/references Create reference
 * @apiName CreateReference
 * @apiGroup Reference
 */
router.post('/:token/references', auth, async (ctx: any) => {
    const {token} = ctx.params;
    const {url, userAgent} = ctx.request.body;
    const [link, created] = await models.link.findOrCreate({ where: { token } });
    const id = uuid.v4();
    let references = JSON.parse(link.references || '[]');
    references.push({id, userAgent, url});
    link.set('references', JSON.stringify(references));
    await link.save();
    ctx.status = 200;
});

/**
 * @api {DELETE} /:token/references/:refId Delete reference
 * @apiName DeleteReference
 * @apiGroup Reference
 */
router.delete('/:token/references/:refId', auth, async (ctx) => {
    const {token, refId} = ctx.params;
    const link = await models.link.findOne({ where: { token } });
    if (!link) {
        ctx.status = 404;
        return;
    }
    let references = JSON.parse(link.references || '[]').filter((ref: {id: string}) => ref.id != refId);
    link.set('references', JSON.stringify(references));
    await link.save();
    ctx.status = 200;
});

export default router;