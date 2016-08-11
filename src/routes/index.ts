import * as Router from 'koa-router';
import models from '../models';
const router = new Router();

router.get('/links/:token', async (ctx, next) => {
    const {token} = ctx.params;
    const link = await models.Link.findOne({
        where: {
            linkToken: token
        }
    });
    if (!link) {
        ctx.status = 404;
    } else {
        ctx.redirect(link.linkUrl)
    }
});

export default router;


router.get('/:linkToken', async function (req, res, next) {
    try {
        let linkObject = await models.Link.findOne({
            where: {
                linkToken: req.params.linkToken
            }
        });
        if (!linkObject) {
            return next();
        }
        res.header('X-Redir', linkObject.linkUrl);
        res.redirect(linkObject.linkUrl);
    } catch (e) {
        console.error(e);
        res.status(500);
        res.render('error', {
            message: e.message || '出错啦',
            error: e
        });
    }
});

router.get('/create', async function (req, res, next) {
    try {
        if (!req.query.linkToken || !req.query.linkUrl) {
            return res.json({
                code: 1,
                msg: '参数错误'
            });
        }
        let linkObject = await models.Link.create({
            linkToken: req.query.linkToken,
            linkUrl: req.query.linkUrl
        });
        res.json({
            version,
            err: 0,
            msg: 'SUCCESS',
            linkObject
        });
    } catch (e) {
        console.error(e);
        res.status(500);
        res.render('error', {
            message: e.message || '出错啦',
            error: e
        });
    }
});