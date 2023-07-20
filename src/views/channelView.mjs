import fs from 'node:fs';
import gettext from 'gettext.js';

import indexControllers from '../controllers/index.mjs';

const channelView = (dynamicValues) =>
{
    const { lang, newWindow, channel: { description, channelId, url }, videos } = dynamicValues,
        channelTitle = dynamicValues.channel.title !== null ? dynamicValues.video.channel.title : channelId,
        i18n = gettext(),
        __dirname = indexControllers.getDirname('.'),
        json = fs.readFileSync(`${__dirname}/../i18n/locales/${lang}/channel.json`, 'utf-8');
    
    i18n.setLocale(lang);
    i18n.loadJSON(json);

    let template =
`
            <!-- Begin channel presentation -->
            <article class="channel">
                <header>
                    <h1>${channelTitle} <span class="channel-id">@${channelId}</span></h1>
                    <img src="/images/avatar-default.svg" alt="${channelTitle}, avatar" width="50" height="50">
                </header>

`;
    if (videos.length)
    {
        template +=
`
                <!-- Begin channel videos -->
                <section id="videos" class="video-cards">
                    <h2>${i18n.__('Videos')}</h2>

`;
        for (const video of videos)
        {
            const { id, title, views } = video;
            template +=
`
                    <section class="video-card">
                        <h3>
                            <a href="/videos/${id}">
                                <img src="/images/default-poster.svg" alt="" width="320" height="180">
                                ${title}
                            </a>
                        </h3>
                        <p>${i18n._n('%1 view', '%1 views', views, views)}</p>
                    </section>

`;
        }
        template +=
`
                </section>
                <!-- End channel videos -->

`;
    }
    template +=
`
                <section id="about" class="about">
                    <h2>${i18n.__('About')}</h2>
                    <p>${description}</p>
                    <p class="link"><a href="${url}" target="_blank" title="${url} (${newWindow})">${url}</a></p>
                </section>
            </article>
            <!-- End channel presentation -->

`;
/*
            <!-- Begin channel presentation -->
            <article class="channel">
                <header>
                    <h1>Nom de la chaîne <span class="channel-id">@IdDeLaChaîne</span></h1>
                    <img src="images/avatar-default.svg" alt="Nom de la chaîne, avatar" width="50" height="50">
                </header>
                <!-- Begin channel videos -->
                <section id="videos" class="video-cards">
                    <h2>Vidéos</h2>
                    <section class="video-card">
                        <h3>
                            <a href="video.html">
                                <img src="images/default-poster.svg" alt="" width="320" height="180">
                                Intitulé de la vidéo
                            </a>
                        </h3>
                        <p>999&nbsp;999&nbsp;999 vues</p>
                    </section>
                    <section class="video-card">
                        <h3>
                            <a href="video.html">
                                <img src="images/default-poster.svg" alt="" width="320" height="180">
                                Intitulé de la vidéo
                            </a>
                        </h3>
                        <p>999&nbsp;999&nbsp;999 vues</p>
                    </section>
                    <section class="video-card">
                        <h3>
                            <a href="video.html">
                                <img src="images/default-poster.svg" alt="" width="320" height="180">
                                Intitulé de la vidéo
                            </a>
                        </h3>
                        <p>999&nbsp;999&nbsp;999 vues</p>
                    </section>
                    <section class="video-card">
                        <h3>
                            <a href="video.html">
                                <img src="images/default-poster.svg" alt="" width="320" height="180">
                                Intitulé de la vidéo
                            </a>
                        </h3>
                        <p>999&nbsp;999&nbsp;999 vues</p>
                    </section>
                    <section class="video-card">
                        <h3>
                            <a href="video.html">
                                <img src="images/default-poster.svg" alt="" width="320" height="180">
                                Intitulé de la vidéo
                            </a>
                        </h3>
                        <p>999&nbsp;999&nbsp;999 vues</p>
                    </section>
                    <section class="video-card">
                        <h3>
                            <a href="video.html">
                                <img src="images/default-poster.svg" alt="" width="320" height="180">
                                Intitulé de la vidéo
                            </a>
                        </h3>
                        <p>999&nbsp;999&nbsp;999 vues</p>
                    </section>
                </section>
                <!-- End channel videos -->
                <section id="about" class="about">
                    <h2>À propos</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel lorem in mauris volutpat elementum vel id libero. Maecenas non sollicitudin ante, vitae tincidunt justo. Sed at odio lacus. Maecenas sodales magna sit amet convallis mollis. Nam posuere ex magna. Cras ac accumsan est, vel ullamcorper enim. Morbi nunc ipsum, efficitur in commodo ut, facilisis id lectus. Nulla eleifend, ligula sed ultricies malesuada, velit augue eleifend mi, sit amet faucibus neque odio ac neque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam hendrerit in turpis ac congue.</p>
                    <p class="link"><a href="https://victor-brito.dev" target="_blank" title="https://victor-brito.dev (nouvelle fenêtre)">https://victor-brito.dev</a></p>
                </section>
            </article>
            <!-- End channel presentation -->

*/
    return template;
};

export default channelView;
