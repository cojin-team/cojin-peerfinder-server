# Cojin Peerfinder server
This is the server where is centralized the peer discovery system, the oficial instance for Cojin is https://cojin-peerfinder.glitch.me

## Host your own peerfinder free (in glitch)

### Bleding edge server (Not recomended for production):
- 1: Create a new glitch project
- 2: Click on tools, then click on import/export
- 3: Select import from github
- 4: In the popup, paste this: `cojin-team/cojin-peerfinder-server`
- 5: (Optional) Create the `.env` file and fill it your custom config, this will overwrite the default config

### Production ready server:

> Sooner or later, an install script will exist

- 1: Create a new glitch project
- 2: Open the terminal
- 3: Wipe the entire project
- 4: Go to the [Last release](https://github.com/cojin-team/cojin-peerfinder-server/releases/latest)
- 5: Right click on source code (tar.gz) and copy link
- 6: In glitch, download the link with wget
- 7: Unpack the code using `tar -xf (soruce code file)`
- 8: (Optional) Create the `.env` file and fill it your custom config, this will overwrite the default config

## Installation for other hostings
- 1: clone this repo
- 2: go to the repo folder
- 3: run `npm install`

To start the server, run `npm start`
