import fs from 'node:fs';
import gettext from 'gettext.js';
import joi from 'joi';

import videoModel from '../models/videoModel.mjs';

import http404View from '../views/http404View.mjs';
import videoTitleView from '../views/videoTitleView.mjs';
import videoView from '../views/videoView.mjs';

import indexControllers from './index.mjs';

const getPage = async (req, res) =>
    {
        const i18n = gettext(),
            __dirname = indexControllers.getDirname('.'),
            generalConfig = indexControllers.getConfig(),
            { lang, locale, siteHost, siteName } = generalConfig,
            json = fs.readFileSync(`${__dirname}/../i18n/locales/${lang}/global.json`, 'utf-8'),
            pageFragments = [];
        
        i18n.setLocale(lang);
        i18n.loadJSON(json);
        
        const video = await videoModel.getVideoById(Number.parseInt(req.params.id, 10)),
            isVideoFound = !!Object.keys(video).length,
            videoTitleViewParams =
            {
                siteHost,
                siteName,
                video,
                isVideoFound,
                pageUrl: req.originalUrl
            },
            videoViewParams =
            {
                lang,
                locale,
                video
            },
            status = isVideoFound ? 200 : 404;

        pageFragments.push(indexControllers.getHeadPage());
        pageFragments.push(videoTitleView(videoTitleViewParams));
        pageFragments.push(await indexControllers.getheaderPage(req.originalUrl));
        if (isVideoFound) pageFragments.push(videoView(videoViewParams));
        else pageFragments.push(http404View());
        pageFragments.push(indexControllers.getFooterPage());
        
        return res.status(status).send(pageFragments.join(''));
    },
    add = async (req, res) =>
    {
        const { title, description } = req.body,
            id = Number.parseInt(req.body.id, 10),
            langId = Number.parseInt(req.body.langId, 10),
            status = Number.parseInt(req.body.status, 10),
            temporaryDirectory = `./public/uploads`,
            definitiveDirectory = `./public/uploads/${id}`,
            { filename } = req.file,
            schema = joi.object
            ({
                title: joi.string().max(255, 'utf8').required(),
                description: joi.string().required(),
                id: joi.number().positive().integer().required(),
                langId: joi.number().positive().integer().required(),
                status: joi.number().positive().integer().required(),
                filename: joi.string().required()
            }),
            { value, error } = schema.validate
            ({
                title,
                description,
                id,
                langId,
                status,
                filename
            });
        
        if (error)
        {
            console.error(error);
            return res.status(400).send(error);
        }
        fs.mkdirSync(definitiveDirectory, { recursive: true });
        fs.renameSync(`${temporaryDirectory}/${filename}`, `${definitiveDirectory}/${filename}.mp4`);
        const result = await videoModel.add(value.title, value.description, value.id, value.langId, value.status, `${filename}.mp4`);
        if (result.insertId) return res.sendStatus(201);
        fs.rmSync(`${definitiveDirectory}/${filename}.mp4`);
        return res.status(400).send('Something went wrong.');
    },
    increment = async (req, res) =>
    {
        const result = await videoModel.increment(Number.parseInt(req.params.id, 10)),
            { affectedRows } = result,
            status = affectedRows ? 204 : 404;

        return res.sendStatus(status);
    },
    remove = async (req, res) =>
    {
        const __dirname = indexControllers.getDirname('.'),
            { userId, src } = req.body,
            result = await videoModel.remove(Number.parseInt(req.params.id, 10)),
            { affectedRows } = result,
            status = affectedRows ? 204: 404;
        if (affectedRows) fs.rmSync(`${__dirname}../../public/uploads/${userId}/${src}`);

        return res.sendStatus(status);
    };

export default
{
    getPage,
    add,
    increment,
    remove
};
