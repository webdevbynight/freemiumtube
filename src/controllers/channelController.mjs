import fs from 'node:fs';
import gettext from 'gettext.js';

import channelModel from '../models/channelModel.mjs';
import videoModel from '../models/videoModel.mjs';

import http404View from '../views/http404View.mjs';
import channelTitleView from '../views/channelTitleView.mjs';
import channelView from '../views/channelView.mjs';

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
        
        const channel = await channelModel.getChannelByName(req.params.channel),
            videos = await videoModel.getAllVideosFromChannel(channel.id),
            isChannelFound = !!Object.keys(channel).length,
            newWindow = i18n.__('new window'),
            channelTitleViewParams =
            {
                siteHost,
                siteName,
                channel,
                isChannelFound,
                pageUrl: req.originalUrl
            },
            channelViewParams =
            {
                lang,
                newWindow,
                channel,
                videos
            },
            status = isChannelFound ? 200 : 404;

        pageFragments.push(indexControllers.getHeadPage());
        pageFragments.push(channelTitleView(channelTitleViewParams));
        pageFragments.push(await indexControllers.getheaderPage(req.originalUrl));
        if (isChannelFound) pageFragments.push(channelView(channelViewParams));
        else pageFragments.push(http404View());
        pageFragments.push(indexControllers.getFooterPage());
        console.log('channels::after', channel.id, typeof channel.id, videos);
        
        return res.status(status).send(pageFragments.join(''));
    };

export default { getPage };
