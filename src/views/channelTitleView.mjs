const channelTitleView = (dynamicValues) =>
    {
        const { siteHost, siteName, channel, isChannelFound, pageUrl } = dynamicValues;
        let template = '';
        if (isChannelFound)
        {
            const { description, channelId } = channel;
            const channelTitle = channel.title !== null ? channel.title : channelId;
            template +=
`
        <title>${channelTitle} — ${siteName}</title>
        <meta name="description" content="${description}">

        <!-- Begin canonical URL -->
        <link rel="canonical" href="${siteHost}${pageUrl}">
        <!-- End canonical URL -->

        <!-- Begin Twitter card -->
        <meta name="twitter:card" content="summary">
        <meta name="twitter:site" content="@${siteName}">
        <meta name="twitter:creator" content="@webdevbynight">
        <meta name="twitter:title" content="${channelTitle} — ${siteName}">
        <meta name="twitter:description" content="${description}">
        <meta name="twitter:image" content="/images/freemiumtube.png">
        <meta name="twitter:image:alt" content="Logo ${siteName}">
        <!-- End Twitter card -->

        <!-- Begin Open Graph -->
        <meta property="og:url" content="${siteHost}${pageUrl}">
        <meta property="og:title" content="${channelTitle}">
        <meta property="og:description" content="${description}">
        <meta property="og:image" content="/images/freemiumtube.png">
        <meta property="og:image:alt" content="Logo ${siteName}">
        <meta property="og:type" content="profile">
        <!-- End Open Graph -->
`
        }
        else
        {
            template +=
`
        <title>404 — ${siteName}</title>
        <meta name="robots" content="noindex, nofollow, noarchive">
`;
        }
        template +=
`        
    </head>

    <body>
`;
        return template;
    };

export default channelTitleView;
