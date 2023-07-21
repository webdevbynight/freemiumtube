# FreemiumTube

This repository is an individual project made for a checkpoint during a course at Wild Code School.

It has been made with vanilla JavaScript for the front-end part and Node.js and Express for the back-end part.

## Setup and use

### Setup

- Clone this repository
- Run command `npm run setup`
- Create a `.env` file to configure the environment (the [`.env.sample`](./.env.sample) file can help you)

### Available commands

- `browser-sync`: starts a server running at `192.168.1.11` and synchronising browsers (pratical to test the responsiveness of the project)
- `validate-html`: checks whether the static HTML templates are valid HTML 5 files
- `migrate`: runs the database migration script
- `dev`: runs the server in a development environment
- `start`: runs the server (needs to be shut down and rerun in case of changes)
