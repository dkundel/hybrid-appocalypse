# Hybrid Appocalypse

This is the repository for a talk about developing Hybrid Apps (with a focus on Desktop).

The slides are written using Reveal.js and are loaded inside an Electron shell to achieve their full functionality.

If you are looking for resources about hybrid app development check out the [RESOURCES.md](RESOURCES.md) file.

This talk has been presented at:
- [Devfest Austria 2016 in Vienna](http://devfest.at)
- [Microsoft Technology Summit Germany 2016](https://www.microsoft.com/germany/technical-summit/default.aspx)
- [Topconf Düsseldorf 2017](https://www.topconf.com/conference/duesseldorf-2017/)

## Setup Instructions

0. Make sure you have [Node.js](https://nodejs.org) with NPM installed as well as Git.

1. Clone the repository and install dependencies:
```bash
git clone git@github.com:dkundel/hybrid-appocalypse.git
cd hybrid-appocalypse
npm install
```

2. Start the Electron app. If you want to load a specific presentation specify it by adding ` -- devfest-at-16` to the command:
```bash
npm start
```

3. If you want to load the slides without Electron (limited functionality) you can run the following command and open [localhost:3000](http://localhost:3000)
```bash
npm run serve 
```

## Contributors

Dominik Kundel <dominik.kundel@gmail.com>

## License

MIT