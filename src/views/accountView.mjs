const accountView = (dynamicValues) =>
    {
        const { lang, siteName, myAccount, displayOtherLang } = dynamicValues,
            template =
`
            <section class="back-office-account">
                <h2>${myAccount}</h2>
                <ul class="dashboard">
                    <li><a href="/account/info">Mes informations</a></li>
                    <li><a href="/account/videos">Mes vidéos</a></li>
                    <li><a href="/account/delete">Supprimer mon compte</a></li>
                </ul>
            </section>

        </main>
        <!-- End content -->
`;
            return template;
    };

export default accountView;