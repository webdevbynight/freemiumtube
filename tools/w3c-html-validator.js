import fs from 'node:fs';
import { w3cHtmlValidator } from 'w3c-html-validator';

// Global options
const options =
{
    ignoreLevel: 'warning'
}

// List all HTML pages to validate (except template ones)
const files = fs.readdirSync('.').filter(file => file.endsWith('.html') && !file.startsWith('template'));

// Validate
for (let file of files)
{
    const report = (results) => w3cHtmlValidator.reporter(results, { continueOnFail: true });
    Object.assign(options, { filename: file });
    w3cHtmlValidator.validate(options).then(report);
}