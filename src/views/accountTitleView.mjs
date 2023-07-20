const accountTitleView = (dynamicValues) =>
    {
        const { siteName, myAccount } = dynamicValues,
            template =
`
        <title>${myAccount} — ${siteName}</title>
        <meta name="robots" content="noindex, nofollow, noarchive">
    </head>

    <body>
`;
            return template;
    };

export default accountTitleView;
