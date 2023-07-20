import fs from 'node:fs';
import gettext from 'gettext.js';

import indexControllers from '../controllers/index.mjs';

const accountVideosView = (dynamicValues) =>
    {
        const { lang, myAccount, videos } = dynamicValues,
            i18n = gettext(),
            __dirname = indexControllers.getDirname('.'),
            json = fs.readFileSync(`${__dirname}/../i18n/locales/${lang}/account.json`, 'utf-8');
        
        i18n.setLocale(lang);
        i18n.loadJSON(json);

        let template =
`
            <section class="back-office-account">
                <nav class="breadcrumb">
                    <ul>
                        <li><a href="/account">${myAccount}</a></li>
                        <li>${i18n.__('My videos')}</li>
                    </ul>
                </nav>
                <h2>${i18n.__('My videos')}</h2>
                <div class="videos">
                    <p><a href="/account/videos/add">${i18n.__('Upload a new video')}</a></p>

`;
        if (videos.length)
        {
            for (const video of videos)
            {
                const { id, title } = video;
                template +=
`
                    <section>
                        <h3>${title}</h3>
                        <ul>
                            <li><a class="edit" href="/account/videos/${id}">${i18n.__('Edit')}</a></li>
                            <li><a class="remove" href="/account/videos/${id}/delete">${i18n.__('Delete')}</a></li>
                        </ul>
                    </section>

`;
            }
        }
        template +=
`
                </div>
            </section>

`;
            return template;
    };

export default accountVideosView;
