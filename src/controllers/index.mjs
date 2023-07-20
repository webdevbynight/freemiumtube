import fs from 'node:fs';
import url from 'node:url';
import gettext from 'gettext.js';

import headView from '../views/headView.mjs';
import headerView from '../views/headerView.mjs';
import footerView from '../views/footerView.mjs';

const getConfig = () =>
    {
        const config =
            {
                lang: 'en', // TODO: make it dynamic (user preference)
                siteName: 'FreemiumTube'
            };
        return config;
    },
    getDirname = (path) =>
    {
        return url.fileURLToPath(new URL(path, import.meta.url));
    },
    i18n = gettext(),
    __dirname = getDirname('.'),
    generalConfig = getConfig(),
    { lang, siteName } = generalConfig,
    json = fs.readFileSync(`${__dirname}/../i18n/locales/${lang}/global.json`, 'utf-8');

i18n.setLocale(lang);
i18n.loadJSON(json);

const getHeadPage = () =>
    {
        return headView(getConfig());
    },
    getheaderPage = () =>
    {
        const displayOtherLang = i18n.__('Display the site in another language'),
            search = i18n.__('Search'),
            searchVerb = i18n.__('To search'),
            myAccount = i18n.__('My account'),
            login = i18n.__('Log in'),
            headerViewParams =
            {
                lang,
                siteName,
                displayOtherLang,
                search,
                searchVerb,
                myAccount,
                login
            };
    
        return headerView(headerViewParams);
    },
    getFooterPage = () =>
    {
        const newWindow = i18n.__('new window'),
            developedWithLove = i18n.__('Developped with love by'),
            footerViewParams =
            {
                newWindow,
                developedWithLove
            };

        return footerView(footerViewParams);
    };

export default
{
    getDirname,
    getConfig,
    getHeadPage,
    getheaderPage,
    getFooterPage
};
