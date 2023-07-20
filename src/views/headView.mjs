const headView = (dynamicValues) =>
    {
        const { lang, siteName } = dynamicValues,
            template =
`<!DOCTYPE html>
<html lang="${lang}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="format-detection" content="telephone=no">
        <meta name="google" content="notranslate">
        <meta name="apple-mobile-web-app-title" content="${siteName}">
        <meta name="application-name" content="${siteName}">
        <meta name="msapplication-config" content="/browserconfig.xml">
        <meta name="msapplication-TileColor" content="#ffffff">
        <meta name="theme-color" content="#68c5fa">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="mask-icon" href="/apple-mask-icon.svg" type="image/svg+xml" color="#68c5fa">
        <link rel="manifest" href="/site.webmanifest">
        <link rel="stylesheet" href="/css/styles.css" type="text/css" media="screen, print">
        <link rel="author" href="/humans.txt" type="text/plain">
`;
        return template;
    };

export default headView;
