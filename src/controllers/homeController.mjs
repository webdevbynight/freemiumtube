import fs from 'node:fs';
import gettext from 'gettext.js';

import indexControllers from './index.mjs';
import homeTitleView from '../views/homeTitleView.mjs';
import homeView from '../views/homeView.mjs';

const getPage = async (req, res) =>
    {
        const i18n = gettext(),
            __dirname = indexControllers.getDirname('.'),
            generalConfig = indexControllers.getConfig(),
            { lang, siteHost, siteName } = generalConfig,
            json = fs.readFileSync(`${__dirname}/../i18n/locales/${lang}/global.json`, 'utf-8'),
            pageFragments = [];
        
        i18n.setLocale(lang);
        i18n.loadJSON(json);
        
        const onlineVideoSharing = i18n.__('Online video sharing'),
            topPopularVideos = i18n.__('Top popular videos'),
            homeTitleViewParams =
            {
                siteHost,
                siteName,
                onlineVideoSharing,
                topPopularVideos
            },
            homeViewParams =
            {
                topPopularVideos
            };

        pageFragments.push(indexControllers.getHeadPage());
        pageFragments.push(homeTitleView(homeTitleViewParams));
        pageFragments.push(indexControllers.getheaderPage());
        pageFragments.push(homeView(homeViewParams));
        pageFragments.push(indexControllers.getFooterPage());
        
        return res.send(pageFragments.join(''));
    };

export default { getPage };