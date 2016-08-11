import * as Router from 'koa-router';
import models from '../models';
const router = new Router();

router.get('/links/:token', async (ctx, next) => {
    const {token} = ctx.params;
    const link = await models.link.findOne({
        where: {
            linkToken: token
        }
    });
    if (!link) {
        ctx.status = 404;
    } else {
        ctx.redirect(link.linkUrl);
    }
});

export default router;


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