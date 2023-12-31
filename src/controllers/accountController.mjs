import fs from 'node:fs';
import gettext from 'gettext.js';

import accountTitleView from '../views/accountTitleView.mjs';
import accountView from '../views/accountView.mjs';

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
        
        const displayOtherLang = i18n.__('Display the site in another language'),
            myAccount = i18n.__('My account'),
            accountTitleViewParams =
            {
                siteName,
                myAccount
            },
            accountViewParams =
            {
                lang,
                myAccount
            };

        pageFragments.push(indexControllers.getHeadPage());
        pageFragments.push(accountTitleView(accountTitleViewParams));
        pageFragments.push(await indexControllers.getheaderPage(req.originalUrl));
        pageFragments.push(accountView(accountViewParams));
        pageFragments.push(indexControllers.getFooterPage());
        
        return res.send(pageFragments.join(''));
    };

export default { getPage };
