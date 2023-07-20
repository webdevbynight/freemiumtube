import fs from 'node:fs';
import gettext from 'gettext.js';

import indexControllers from '../controllers/index.mjs';

const homeView = (dynamicValues) =>
    {
        const { lang, topPopularVideosList, topPopularVideos } = dynamicValues;
        let template =
`
            <!-- Begin most popular videos -->
            <section class="video-cards">
                <h2>${topPopularVideos}</h2>

`;
        if (topPopularVideosList.length)
        {
            const i18n = gettext(),
                __dirname = indexControllers.getDirname('.'),
                json = fs.readFileSync(`${__dirname}/../i18n/locales/${lang}/video.json`, 'utf-8');
            
            i18n.setLocale(lang);
            i18n.loadJSON(json);

            for (const video of topPopularVideosList)
            {
                const { id, title, channelId, views } = video,
                channelTitle = (video.channelTitle !== null) ? video.channelTitle : channelId;
            template +=
`
                <section class="video-card">
                    <h3>
                        <a href="/watch/${id}">
                            <img src="/images/default-poster.svg" alt="" width="320" height="180">
                            ${title}
                        </a>
                    </h3>
                    <p>
                        <a href="/channels/${channelId}">
                            <img class="avatar" src="/images/avatar-default.svg" alt="${channelTitle}, avatar" width="25" height="25">
                            ${channelTitle}
                        </a>
                    </p>
                    <p>${i18n._n('%1 view', '%1 views', views, views)}</p>
                </section>

`;
            }
        }
        template +=
`
            </section>
            <!-- End most popular videos -->

`;
        return template;
    };

export default homeView;
