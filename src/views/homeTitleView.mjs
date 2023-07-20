const homeTitleView = (dynamicValues) =>
    {
        const { siteHost, siteName, onlineVideoSharing, topPopularVideos } = dynamicValues,
            template =
`
        <title>${onlineVideoSharing} — ${siteName}</title>
        <meta name="description" content="${topPopularVideos}">

        <!-- Begin canonical URL -->
        <link rel="canonical" href="${siteHost}/">
        <!-- End canonical URL -->

        <!-- Begin Twitter card -->
        <meta name="twitter:card" content="summary">
        <meta name="twitter:site" content="@${siteName}">
        <meta name="twitter:creator" content="@webdevbynight">
        <meta name="twitter:title" content="${onlineVideoSharing} — ${siteName}">
        <meta name="twitter:description" content="${topPopularVideos}">
        <meta name="twitter:image" content="/images/freemiumtube.png">
        <meta name="twitter:image:alt" content="Logo ${siteName}">
        <!-- End Twitter card -->

        <!-- Begin Open Graph -->
        <meta property="og:url" content="${siteHost}/">
        <meta property="og:title" content="${onlineVideoSharing}">
        <meta property="og:description" content="${topPopularVideos}">
        <meta property="og:image" content="/images/freemiumtube.png">
        <meta property="og:image:alt" content="Logo ${siteName}">
        <meta property="og:type" content="website">
        <!-- End Open Graph -->
        
    </head>

    <body>
`;
            return template;
    };

export default homeTitleView;
