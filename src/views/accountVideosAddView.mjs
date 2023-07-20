import fs from 'node:fs';
import gettext from 'gettext.js';

import indexControllers from '../controllers/index.mjs';

const accountVideosAddView = (dynamicValues) =>
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
                        <li><a href="/account/videos">${i18n.__('My videos')}</a></li>
                        <li>${i18n.__('Upload a new video')}</li>
                    </ul>
                </nav>
                <form class="back-office-form upload" method="post" action="/account/videos/add" enctype="multipart/form-data">
                    <h2>${i18n.__('Upload a new video')}</h2>
                    <p>
                        <label for="upload-title">${i18n.__('Video title')}</label>
                        <input id="upload-title" name="title" type="text" maxlength="255" required>
                    </p>
                    <p>
                        <label for="upload-description">${i18n.__('Video description')}</label>
                        <textarea id="upload-description" name="description" required></textarea>
                    </p>
                    <p>
                        <label for="upload-file">${i18n.__('File')}</label>
                        <input id="upload-file" name="video" type="file" accept="video/mp4" required>
                    </p>
                    <p>
                        <input name="id" type="hidden" value="1">
                        <input name="langId" type="hidden" value="1">
                        <input name="status" type="hidden" value="7">
                        <input type="submit" value="${i18n.__('Upload')}">
                    </p>
                </form>
            </section>

`;
            return template;
    };

export default accountVideosAddView;
