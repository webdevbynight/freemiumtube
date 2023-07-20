const footerView = (dynamicValues) =>
    {
        const { newWindow, developedWithLove } = dynamicValues,
            template =
`
        </main>
        <!-- End content -->

        <!-- Begin footer -->
        <footer id="footer">
            <p>${developedWithLove} <a href="https://victor-brito.dev/" title="Victor Brito (${newWindow})" hreflang="fr" target="_blank">Victor Brito</a></p>
        </footer>
        <!-- End footer -->

        <!-- Begin scripts -->
        <script src="/js/scripts.js"></script>
        <!-- End scripts -->

    </body>
</html>
`;
        return template;
    };

export default footerView;
