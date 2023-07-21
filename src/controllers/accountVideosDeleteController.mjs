import fs from 'node:fs';
import gettext from 'gettext.js';

import videoModel from '../models/videoModel.mjs';

import accountVideosDeleteTitleView from '../views/accountVideosDeleteTitleView.mjs';
import accountVideosDeleteView from '../views/accountVideosDeleteView.mjs';

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
            accountVideosDeleteTitleViewParams =
            {
                lang,
                siteName,
                myAccount,
                video
            },
            accountVideosDeleteViewParams =
            {
                lang,
                myAccount,
                video
            };

        pageFragments.push(indexControllers.getHeadPage());
        pageFragments.push(accountVideosDeleteTitleView(accountVideosDeleteTitleViewParams));
        pageFragments.push(await indexControllers.getheaderPage(req.originalUrl));
        pageFragments.push(accountVideosDeleteView(accountVideosDeleteViewParams));
        pageFragments.push(indexControllers.getFooterPage());
        
        return res.send(pageFragments.join(''));
    };

export default { getPage };
