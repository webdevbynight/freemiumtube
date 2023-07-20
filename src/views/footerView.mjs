const footerView = (dynamicValues) =>
    {
        const { newWindow, about, developedWithLove } = dynamicValues,
            template =
`       <!-- Begin footer -->
        <footer id="footer">
            <nav>
                <ul>
                    <li><a href="/about">${about}</a></li>
                </ul>
            </nav>
            <p>${developedWithLove} <a href="https://victor-brito.dev/" title="Victor Brito (${newWindow})" hreflang="fr" target="_blank">Victor Brito</a></p>
        </footer>
        <!-- End footer -->

        <!-- Begin scripts -->
        <script src="js/scripts.js"></script>
        <!-- End scripts -->

    </body>
</html>
`;
        return template;
    };

export default footerView;
