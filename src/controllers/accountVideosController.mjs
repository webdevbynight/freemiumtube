import fs from 'node:fs';
import gettext from 'gettext.js';

import videoModel from '../models/videoModel.mjs';

import accountVideosTitleView from '../views/accountVideosTitleView.mjs';
import accountVideosView from '../views/accountVideosView.mjs';

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
            videos = await videoModel.getAllVideosFromChannel(1), // TODO: retrieve the ID of the account user
            accountVideosTitleViewParams =
            {
                lang,
                siteName,
                myAccount
            },
            accountVideosViewParams =
            {
                lang,
                myAccount,
                videos
            };

        pageFragments.push(indexControllers.getHeadPage());
        pageFragments.push(accountVideosTitleView(accountVideosTitleViewParams));
        pageFragments.push(await indexControllers.getheaderPage(req.originalUrl));
        pageFragments.push(accountVideosView(accountVideosViewParams));
        pageFragments.push(indexControllers.getFooterPage());
        
        return res.send(pageFragments.join(''));
    };

export default { getPage };
