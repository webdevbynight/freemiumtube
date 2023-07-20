import fs from 'node:fs';
import gettext from 'gettext.js';

import indexControllers from './index.mjs';
import headView from '../views/headView.mjs';
import titleView from '../views/titleView.mjs';
import headerView from '../views/headerView.mjs';
import accountView from '../views/accountView.mjs';
import footerView from '../views/footerView.mjs';

const getPage = async (req, res) =>
    {
        const i18n = gettext(),
            __dirname = indexControllers.getDirname('.'),
            generalConfig = indexControllers.getConfig(),
            { lang, siteName } = generalConfig,
            json = fs.readFileSync(`${__dirname}/../i18n/locales/${lang}/global.json`, { encoding: 'utf-8' }),
            page = [];
        
        i18n.setLocale(lang);
        i18n.loadJSON(json);
        
        const newWindow = i18n.__('new window'),
            displayOtherLang = i18n.__('Display the site in another language'),
            search = i18n.__('Search'),
            searchVerb = i18n.__('To search'),
            myAccount = i18n.__('My account'),
            login = i18n.__('Log in'),
            about = i18n.__('About'),
            developedWithLove = i18n.__('Developped with love by'),
            titleViewParams =
            {
                siteName,
                myAccount
            },
            headerViewParams =
            {
                lang,
                siteName,
                displayOtherLang,
                search,
                searchVerb,
                myAccount,
                login
            },
            accountViewParams =
            {
                lang,
                siteName,
                myAccount,
                displayOtherLang
            },
            footerViewParams =
            {
                newWindow,
                about,
                developedWithLove
            };

        page.push(headView(generalConfig));
        page.push(titleView(titleViewParams));
        page.push(headerView(headerViewParams));
        page.push(accountView(accountViewParams));
        page.push(footerView(footerViewParams));
        
        return res.send(page.join(''));
    };

export default { getPage };
