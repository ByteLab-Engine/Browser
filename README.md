<div align="center">
<h1>ByteLab Browser</h1>

ByteLab Browser is an extendable and customizable web browser built on `Electron`, `React`, and other new web technologies.
</div>

<h3>Features:</h3>
- **Modern UI:** With a UI built on React, it is easy to customize ByteLab Browser and add new features.

- **Ghostery Adblocker:** ByteLab Browser uses [Ghostery Adblocker](https://github.com/ghostery/adblocker) to block all ads and trackers, speeding up the browsing experience.

- **Chromium under the hood:** Electron is based on Chromium, which allows ByteLab browser to use features like Chrome Dev Tools and support all websites.

- **Chrome Extensions:** ByteLab browser supports many Chrome extensions with the ability to download from the Chrome Web Store `*(WIP)`

- `And more, like tab groups, settings, a bookmarks bar, find in page, search history, download page ... `

<h3> Why Electron? </h3>
Many web browsers are built on Chromium. Chromium is a powerful web engine, but it is complex and hard to work on.

Using a framework like Electron allows us to make an easy-to-develop and customize web browser that has the power of Chromium. 

Performance is also as fast or faster than Chromium based web browsers thanks to Electron's low overhead.


<h3>Screenshots</h3>
Coming soon

<h3> Development </h3>

Prerequsites: [`The latest version of Node JS (or 18.7.0)`](https://nodejs.org/en/) and [`Yarn`](https://yarnpkg.com/getting-started/migration)


#### Windows

Make sure you have build tools installed. You can install them by running this command as **administrator**:

```bash
$ npm i -g windows-build-tools
```

```bash
$ yarn # Install needed depedencies.
$ yarn rebuild # Rebuild native modules using Electron headers.
$ yarn dev # Run Wexond in development mode
```

#### More commands

```bash
$ yarn compile-win32 # Package Wexond for Windows
$ yarn compile-linux # Package Wexond for Linux
$ yarn compile-darwin # Package Wexond for macOS
$ yarn lint # Runs linter
$ yarn lint-fix # Runs linter and automatically applies fixes
```

More commands can be found in [`package.json`](package.json).


<h3>Credits</h3>
- Wexond Web Browser 
- Skye Web Browser
- Electron JS, Node, and other dependencies
 
<h3>License</h3>
GPL 3.0

By sending a Pull Request, you agree that your code may be relicensed or sublicensed.
