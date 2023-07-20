import fs from 'node:fs';
import gettext from 'gettext.js';

import videoModel from '../models/videoModel.mjs';

import accountVideosAddTitleView from '../views/accountVideosAddTitleView.mjs';
import accountVideosAddView from '../views/accountVideosAddView.mjs';

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
            accountVideosAddTitleViewParams =
            {
                lang,
                siteName,
                myAccount
            },
            accountVideosAddViewParams =
            {
                lang,
                myAccount,
                videos
            };

        pageFragments.push(indexControllers.getHeadPage());
        pageFragments.push(accountVideosAddTitleView(accountVideosAddTitleViewParams));
        pageFragments.push(await indexControllers.getheaderPage(req.originalUrl));
        pageFragments.push(accountVideosAddView(accountVideosAddViewParams));
        pageFragments.push(indexControllers.getFooterPage());
        
        return res.send(pageFragments.join(''));
    };

export default { getPage };
