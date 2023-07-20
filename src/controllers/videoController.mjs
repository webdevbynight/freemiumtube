import fs from 'node:fs';
import gettext from 'gettext.js';

import videoModel from '../models/videoModel.mjs';

import http404View from '../views/http404View.mjs';
import videoTitleView from '../views/videoTitleView.mjs';
import videoView from '../views/videoView.mjs';

import indexControllers from './index.mjs';

const getPage = async (req, res) =>
    {
        const i18n = gettext(),
            __dirname = indexControllers.getDirname('.'),
            generalConfig = indexControllers.getConfig(),
            { lang, locale, siteHost, siteName } = generalConfig,
            json = fs.readFileSync(`${__dirname}/../i18n/locales/${lang}/global.json`, 'utf-8'),
            pageFragments = [];
        
        i18n.setLocale(lang);
        i18n.loadJSON(json);
        
        const video = await videoModel.getVideoById(Number.parseInt(req.params.id, 10)),
            isVideoFound = !!Object.keys(video).length,
            videoTitleViewParams =
            {
                siteHost,
                siteName,
                video,
                isVideoFound,
                pageUrl: req.originalUrl
            },
            videoViewParams =
            {
                lang,
                locale,
                video
            },
            status = isVideoFound ? 200 : 404;

        pageFragments.push(indexControllers.getHeadPage());
        pageFragments.push(videoTitleView(videoTitleViewParams));
        pageFragments.push(await indexControllers.getheaderPage(req.originalUrl));
        if (isVideoFound) pageFragments.push(videoView(videoViewParams));
        else pageFragments.push(http404View());
        pageFragments.push(indexControllers.getFooterPage());
        
        return res.status(status).send(pageFragments.join(''));
    };

export default { getPage };
