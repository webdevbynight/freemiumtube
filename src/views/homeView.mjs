const homeView = (dynamicValues) =>
    {
        const { topPopularVideos } = dynamicValues,
            template =
`
            <!-- Begin most popular videos -->
            <section class="video-cards">
                <h2>${topPopularVideos}</h2>
                <section class="video-card">
                    <h3>
                        <a href="video.html">
                            <img src="images/default-poster.svg" alt="" width="320" height="180">
                            Intitulé de la vidéo
                        </a>
                    </h3>
                    <p>
                        <a href="channel.html">
                            <img class="avatar" src="images/avatar-default.svg" alt="Auteur, avatar" width="25" height="25">
                            Auteur
                        </a>
                    </p>
                    <p>999&nbsp;999&nbsp;999 vues</p>
                </section>
                <section class="video-card">
                    <h3>
                        <a href="video.html">
                            <img src="images/default-poster.svg" alt="" width="320" height="180">
                            Intitulé de la vidéo
                        </a>
                    </h3>
                    <p>
                        <a href="channel.html">
                            <img class="avatar" src="images/avatar-default.svg" alt="Auteur, avatar" width="25" height="25">
                            Auteur
                        </a>
                    </p>
                    <p>999&nbsp;999&nbsp;999 vues</p>
                </section>
                <section class="video-card">
                    <h3>
                        <a href="video.html">
                            <img src="images/default-poster.svg" alt="" width="320" height="180">
                            Intitulé de la vidéo
                        </a>
                    </h3>
                    <p>
                        <a href="channel.html">
                            <img class="avatar" src="images/avatar-default.svg" alt="Auteur, avatar" width="25" height="25">
                            Auteur
                        </a>
                    </p>
                    <p>999&nbsp;999&nbsp;999 vues</p>
                </section>
                <section class="video-card">
                    <h3>
                        <a href="video.html">
                            <img src="images/default-poster.svg" alt="" width="320" height="180">
                            Intitulé de la vidéo
                        </a>
                    </h3>
                    <p>
                        <a href="channel.html">
                            <img class="avatar" src="images/avatar-default.svg" alt="Auteur, avatar" width="25" height="25">
                            Auteur
                        </a>
                    </p>
                    <p>999&nbsp;999&nbsp;999 vues</p>
                </section>
                <section class="video-card">
                    <h3>
                        <a href="video.html">
                            <img src="images/default-poster.svg" alt="" width="320" height="180">
                            Intitulé de la vidéo
                        </a>
                    </h3>
                    <p>
                        <a href="channel.html">
                            <img class="avatar" src="images/avatar-default.svg" alt="Auteur, avatar" width="25" height="25">
                            Auteur
                        </a>
                    </p>
                    <p>999&nbsp;999&nbsp;999 vues</p>
                </section>
                <section class="video-card">
                    <h3>
                        <a href="video.html">
                            <img src="images/default-poster.svg" alt="" width="320" height="180">
                            Intitulé de la vidéo
                        </a>
                    </h3>
                    <p>
                        <a href="channel.html">
                            <img class="avatar" src="images/avatar-default.svg" alt="Auteur, avatar" width="25" height="25">
                            Auteur
                        </a>
                    </p>
                    <p>999&nbsp;999&nbsp;999 vues</p>
                </section>
            </section>
            <!-- End most popular videos -->

`;
        return template;
    };

export default homeView;
