import fs from 'node:fs';
import gettext from 'gettext.js';

import videoModel from '../models/videoModel.mjs';

import accountVideosUpdateTitleView from '../views/accountVideosUpdateTitleView.mjs';
import accountVideosUpdateView from '../views/accountVideosUpdateView.mjs';

import indexControllers from './index.mjs';

const getPage = async (req, res) =>
    {
        const i18n = gettext(),
            __dirname = indexControllers.getDirname('.'),
            { lang, siteName } = indexControllers.getConfig(),
            json = fs.readFileSync(`${__dirname}/../i18n/locales/${lang}/global.json`, 'utf-8'),
            pageFragments = [];
        
        i18n.setLocale(lang);
        i18n.loadJSON(json);
        
        const myAccount = i18n.__('My account'),
            video = await videoModel.getVideoById(Number.parseInt(req.params.id, 10)),
            accountVideosUpdateTitleViewParams =
            {
                lang,
                siteName,
                myAccount,
                video
            },
            accountVideosUpdateViewParams =
            {
                lang,
                myAccount,
                video
            };

        pageFragments.push(indexControllers.getHeadPage());
        pageFragments.push(accountVideosUpdateTitleView(accountVideosUpdateTitleViewParams));
        pageFragments.push(await indexControllers.getheaderPage(req.originalUrl));
        pageFragments.push(accountVideosUpdateView(accountVideosUpdateViewParams));
        pageFragments.push(indexControllers.getFooterPage());
        
        return res.send(pageFragments.join(''));
    };

export default { getPage };
