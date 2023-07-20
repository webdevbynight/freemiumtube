import fs from 'node:fs';
import gettext from 'gettext.js';

import indexControllers from '../controllers/index.mjs';

const videoView = (dynamicValues) =>
{
    const { lang, locale, video: { title, description, src, channelId, views, published } } = dynamicValues,
        channelTitle = dynamicValues.video.channelTitle !== null ? dynamicValues.video.channelTitle : channelId,
        i18n = gettext(),
        __dirname = indexControllers.getDirname('.'),
        json = fs.readFileSync(`${__dirname}/../i18n/locales/${lang}/video.json`, 'utf-8');
    
    i18n.setLocale(lang);
    i18n.loadJSON(json);

    const template =
`
            <!-- Begin video presentation -->
            <article class="video">
                <header>
                    <h1>${title}</h1>
                    <p>
                        <a href="/channels/${channelId}">
                            <img class="avatar" src="/images/avatar-default.svg" alt="${channelTitle}, avatar" width="50" height="50">
                            ${channelTitle}
                        </a>
                    </p>
                    <p>${i18n.__('Published on')} <time datetime="${new Date(published * 1000).toISOString()}">${new Date(published * 1000).toLocaleDateString(`${lang}-${locale}`, { year: 'numeric', month: 'long', day: 'numeric' })}</time></p>
                    <p>${i18n._n('%1 view', '%1 views', views, views)}</p>
                </header>
                <video width="1920" controls preload="metadata" poster="/images/default-poster.svg">
                    <source src="/videos/${src}" type="video/mp4">
                    <span>${i18n.__('Oops! something went wrong…')}</span>
                </video>
                <p>${description}</p>

            </article>
            <!-- End video presentation -->

`;
    return template;
};

export default videoView;
