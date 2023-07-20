import url from 'node:url';

const getDirname = (path) =>
    {
        return url.fileURLToPath(new URL(path, import.meta.url));
    },
    getConfig = () =>
    {
        const config =
            {
                lang: 'en', // TODO: make it dynamic (user preference)
                siteName: 'FreemiumTube'
            };
        return config;
    };

export default { getDirname, getConfig };
