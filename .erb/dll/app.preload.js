/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*********************************!*\
  !*** ./src/main/preload/app.ts ***!
  \*********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const electron_1 = __webpack_require__(/*! electron */ "electron");
electron_1.contextBridge.exposeInMainWorld('app', {
    analytics: {
        event: (eventName, params) => {
            electron_1.ipcRenderer.send('analytics-event', { eventName, params });
        },
        page: (pageName, params) => {
            electron_1.ipcRenderer.send('analytics-page', { pageName, params });
        },
    },
    board: {
        close: () => {
            electron_1.ipcRenderer.send('close-active-board');
        },
        selectNext: () => {
            electron_1.ipcRenderer.send('select-next-board');
        },
        setWindowsCount: (args) => {
            electron_1.ipcRenderer.send('set-windows-count', args);
        },
    },
    bookmark: {
        findInBookmarks: (str) => {
            return electron_1.ipcRenderer.invoke('find-in-bookmarks', str);
        },
        editBookmark: (bookmark) => {
            return electron_1.ipcRenderer.invoke('edit-bookmark', bookmark);
        },
        getBookmarksProviders: () => {
            return electron_1.ipcRenderer.invoke('get-bookmarks-providers');
        },
        getBookmarksFromProvider: (provider) => {
            return electron_1.ipcRenderer.invoke('get-bookmarks-from-provider', provider);
        },
        importBookmarks: (bookmarks) => {
            return electron_1.ipcRenderer.invoke('import-bookmarks', bookmarks);
        },
        getBookmarksTags: () => {
            return electron_1.ipcRenderer.invoke('get-bookmarks-tags');
        },
        isBookmarked: (url) => {
            return electron_1.ipcRenderer.invoke('is-bookmarked', url);
        },
        addBookmark: (args) => {
            return electron_1.ipcRenderer.invoke('add-bookmark', args);
        },
        removeBookmark: (url) => {
            return electron_1.ipcRenderer.invoke('remove-bookmark', url);
        },
        getAllBookmarks: () => {
            return electron_1.ipcRenderer.invoke('get-all-bookmarks');
        },
    },
    browser: {
        select: (webContentsId) => {
            electron_1.ipcRenderer.send('select-browser', webContentsId);
        },
        selectBrowserView: () => {
            electron_1.ipcRenderer.send('select-browserView');
        },
        certificateErrorAnswer: (args) => {
            electron_1.ipcRenderer.send('certificate-error-answer', args);
        },
        requestCapture: (webContentsId) => {
            return electron_1.ipcRenderer.invoke('request-capture', webContentsId);
        },
        getUrlToOpen: () => {
            return electron_1.ipcRenderer.invoke('get-url-to-open');
        },
        permissionResponse: (args) => {
            electron_1.ipcRenderer.send('permission-response', args);
        },
    },
    config: {
        get: (key) => electron_1.ipcRenderer.invoke('get-store-value', key),
        set: (args) => electron_1.ipcRenderer.invoke('set-store-value', args),
    },
    download: {
        removeDownload: (id) => {
            return electron_1.ipcRenderer.invoke('remove-download', id);
        },
        addDownload: (args) => {
            return electron_1.ipcRenderer.invoke('add-download', args);
        },
        getAllDownloads: () => {
            return electron_1.ipcRenderer.invoke('get-all-downloads');
        },
        clearDownloads: () => {
            return electron_1.ipcRenderer.invoke('clear-downloads');
        },
        hideDownloadsPreview: () => {
            electron_1.ipcRenderer.send('hide-downloads-preview');
        },
    },
    extension: {
        getAllExtensions: () => {
            return electron_1.ipcRenderer.invoke('get-all-extensions');
        },
        deleteExtension: (id) => {
            return electron_1.ipcRenderer.invoke('delete-extension', id);
        },
        installExtension: (id) => {
            return electron_1.ipcRenderer.invoke('install-extension', id);
        },
    },
    history: {
        addHistory: (args) => {
            return electron_1.ipcRenderer.invoke('add-history', args);
        },
        findInHistory: (str) => {
            return electron_1.ipcRenderer.invoke('find-in-history', str);
        },
        removeHistory: (id) => {
            return electron_1.ipcRenderer.invoke('remove-history', id);
        },
        clearHistory: () => {
            return electron_1.ipcRenderer.invoke('clear-history');
        },
        getAllHistory: () => {
            return electron_1.ipcRenderer.invoke('get-all-history');
        },
    },
    listener: {
        newWindow: (action) => {
            electron_1.ipcRenderer.on('new-window', action);
        },
        loadBoard: (action) => {
            electron_1.ipcRenderer.on('load-board', action);
        },
        purge: (action) => {
            electron_1.ipcRenderer.on('purge', action);
        },
        renameBoard: (action) => {
            electron_1.ipcRenderer.on('rename-board', action);
        },
        closeWebview: (action) => {
            electron_1.ipcRenderer.on('close-webview', action);
        },
        closeAllWebview: (action) => {
            electron_1.ipcRenderer.on('close-all-webview', action);
        },
        closeOthersWebview: (action) => {
            electron_1.ipcRenderer.on('close-others-webview', action);
        },
        showAppMenu: (action) => {
            electron_1.ipcRenderer.on('show-app-menu', action);
        },
        certificateError: (action) => {
            electron_1.ipcRenderer.on('certificate-error', action);
        },
        downloading: (action) => {
            electron_1.ipcRenderer.on('downloading', action);
        },
        showDownloadsPreview: (action) => {
            electron_1.ipcRenderer.on('show-downloads-preview', action);
        },
        distributeWindowsEvenly: (action) => {
            electron_1.ipcRenderer.on('distribute-windows-evenly', action);
        },
        setDefaultWindowSize: (action) => {
            electron_1.ipcRenderer.on('set-default-window-size', action);
        },
        permissionRequest: (action) => {
            electron_1.ipcRenderer.on('permission-request', action);
        },
    },
    off: {
        newWindow: () => {
            electron_1.ipcRenderer.removeAllListeners('new-window');
        },
        loadBoard: () => {
            electron_1.ipcRenderer.removeAllListeners('load-board');
        },
        purge: () => {
            electron_1.ipcRenderer.removeAllListeners('purge');
        },
        renameBoard: () => {
            electron_1.ipcRenderer.removeAllListeners('rename-board');
        },
        closeWebview: () => {
            electron_1.ipcRenderer.removeAllListeners('close-webview');
        },
        closeAllWebview: () => {
            electron_1.ipcRenderer.removeAllListeners('close-all-webview');
        },
        closeOthersWebview: () => {
            electron_1.ipcRenderer.removeAllListeners('close-others-webview');
        },
        showAppMenu: () => {
            electron_1.ipcRenderer.removeAllListeners('show-app-menu');
        },
        certificateError: () => {
            electron_1.ipcRenderer.removeAllListeners('certificate-error');
        },
        downloading: () => {
            electron_1.ipcRenderer.removeAllListeners('downloading');
        },
        showDownloadsPreview: () => {
            electron_1.ipcRenderer.removeAllListeners('show-downloads-preview');
        },
        distributeWindowsEvenly: () => {
            electron_1.ipcRenderer.removeAllListeners('distribute-windows-evenly');
        },
        setDefaultWindowSize: () => {
            electron_1.ipcRenderer.removeAllListeners('set-default-window-size');
        },
        permissionRequest: () => {
            electron_1.ipcRenderer.removeAllListeners('permission-request');
        },
    },
    tools: {
        inspectElement: (point) => {
            electron_1.ipcRenderer.send('inspectElement', point);
        },
        toggleDarkMode: () => {
            electron_1.ipcRenderer.invoke('dark-mode:toggle');
        },
        changeLanguage: (locale) => {
            return electron_1.ipcRenderer.invoke('change-language', locale);
        },
        showItemInFolder: (filepath) => {
            electron_1.ipcRenderer.send('show-item-in-folder', filepath);
        },
        showLeftbarContextMenu: (params) => {
            electron_1.ipcRenderer.send('show-leftbar-context-menu', params);
        },
        showBoardContextMenu: (params) => {
            electron_1.ipcRenderer.send('show-board-context-menu', params);
        },
        clicked: () => {
            electron_1.ipcRenderer.send('app-clicked');
        },
        findInKnownDomains: (input) => {
            return electron_1.ipcRenderer.invoke('find-in-known-domains', input);
        },
    },
});

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsQ0FBQztRQUNsQyxDQUFDO1FBQ0Qsa0JBQWtCLEVBQUUsQ0FBQyxLQUFhLEVBQStCLEVBQUU7WUFDakUsT0FBTyxzQkFBVyxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM1RCxDQUFDO0tBQ0Y7Q0FDRixDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImVsZWN0cm9uXCIiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy8uL3NyYy9tYWluL3ByZWxvYWQvYXBwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVsZWN0cm9uXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJpbXBvcnQgeyBjb250ZXh0QnJpZGdlLCBpcGNSZW5kZXJlciwgSXBjUmVuZGVyZXJFdmVudCwgTWVudX0gZnJvbSAnZWxlY3Ryb24nO1xuaW1wb3J0IHsgVEZ1bmN0aW9uIH0gZnJvbSAncmVhY3QtaTE4bmV4dCc7XG5cbmltcG9ydCB7IEV2ZW50UGFyYW1zIH0gZnJvbSAndHlwZXMvYW5hbHl0aWNzJztcbmltcG9ydCB7IEJvb2ttYXJrLCBQcm92aWRlciwgVGFnIH0gZnJvbSAndHlwZXMvYm9va21hcmtzJztcbmltcG9ydCB7IERvd25sb2FkIH0gZnJvbSAndHlwZXMvZG93bmxvYWRzJztcbmltcG9ydCB7IEV4dGVuc2lvbiB9IGZyb20gJ3R5cGVzL2V4dGVuc2lvbnMnO1xuaW1wb3J0IHsgTG9jYWxlIH0gZnJvbSAndHlwZXMvaTE4bic7XG5pbXBvcnQge1xuICBJcGNBZGRCb29rbWFyayxcbiAgSXBjQWRkRG93bmxvYWQsXG4gIElwY0FkZEhpc3RvcnksXG4gIElwY0NlcnRpZmljYXRlRXJyb3JBbnN3ZXIsXG4gIElwY0luc3BlY3RFbGVtZW50LFxuICBJcGNQZXJtaXNzaW9uUmVzcG9uc2UsXG4gIElwY1NldFN0b3JlVmFsdWUsXG4gIElwY1NldFdpbmRvd3NDb3VudCxcbiAgSXBjU2hvd0JvYXJkQ29udGV4dE1lbnUsXG4gIElwY1Nob3dMZWZ0YmFyQ29udGV4dE1lbnUsXG59IGZyb20gJ3R5cGVzL2lwYyc7XG5pbXBvcnQgeyBEb21haW5TdWdnZXN0aW9uIH0gZnJvbSAndHlwZXMvc3VnZ2VzdGlvbnMnO1xuXG5cbmNvbnRleHRCcmlkZ2UuZXhwb3NlSW5NYWluV29ybGQoJ2FwcCcsIHtcbiAgYW5hbHl0aWNzOiB7XG4gICAgZXZlbnQ6IChldmVudE5hbWU6IHN0cmluZywgcGFyYW1zOiBFdmVudFBhcmFtcykgPT4ge1xuICAgICAgaXBjUmVuZGVyZXIuc2VuZCgnYW5hbHl0aWNzLWV2ZW50JywgeyBldmVudE5hbWUsIHBhcmFtcyB9KTtcbiAgICB9LFxuICAgIHBhZ2U6IChwYWdlTmFtZTogc3RyaW5nLCBwYXJhbXM6IEV2ZW50UGFyYW1zKSA9PiB7XG4gICAgICBpcGNSZW5kZXJlci5zZW5kKCdhbmFseXRpY3MtcGFnZScsIHsgcGFnZU5hbWUsIHBhcmFtcyB9KTtcbiAgICB9LFxuICB9LFxuICBib2FyZDoge1xuICAgIGNsb3NlOiAoKSA9PiB7XG4gICAgICBpcGNSZW5kZXJlci5zZW5kKCdjbG9zZS1hY3RpdmUtYm9hcmQnKTtcbiAgICB9LFxuICAgIHNlbGVjdE5leHQ6ICgpID0+IHtcbiAgICAgIGlwY1JlbmRlcmVyLnNlbmQoJ3NlbGVjdC1uZXh0LWJvYXJkJyk7XG4gICAgfSxcbiAgICBzZXRXaW5kb3dzQ291bnQ6IChhcmdzOiBJcGNTZXRXaW5kb3dzQ291bnQpID0+IHtcbiAgICAgIGlwY1JlbmRlcmVyLnNlbmQoJ3NldC13aW5kb3dzLWNvdW50JywgYXJncyk7XG4gICAgfSxcbiAgfSxcbiAgYm9va21hcms6IHtcbiAgICBmaW5kSW5Cb29rbWFya3M6IChzdHI6IHN0cmluZyk6IFByb21pc2U8Qm9va21hcmtbXT4gPT4ge1xuICAgICAgcmV0dXJuIGlwY1JlbmRlcmVyLmludm9rZSgnZmluZC1pbi1ib29rbWFya3MnLCBzdHIpO1xuICAgIH0sXG4gICAgZWRpdEJvb2ttYXJrOiAoYm9va21hcms6IFBhcnRpYWw8Qm9va21hcms+KTogUHJvbWlzZTxCb29rbWFyaz4gPT4ge1xuICAgICAgcmV0dXJuIGlwY1JlbmRlcmVyLmludm9rZSgnZWRpdC1ib29rbWFyaycsIGJvb2ttYXJrKTtcbiAgICB9LFxuICAgIGdldEJvb2ttYXJrc1Byb3ZpZGVyczogKCk6IFByb21pc2U8UHJvdmlkZXJbXT4gPT4ge1xuICAgICAgcmV0dXJuIGlwY1JlbmRlcmVyLmludm9rZSgnZ2V0LWJvb2ttYXJrcy1wcm92aWRlcnMnKTtcbiAgICB9LFxuICAgIGdldEJvb2ttYXJrc0Zyb21Qcm92aWRlcjogKHByb3ZpZGVyOiBQcm92aWRlcik6IFByb21pc2U8Qm9va21hcmtbXT4gPT4ge1xuICAgICAgcmV0dXJuIGlwY1JlbmRlcmVyLmludm9rZSgnZ2V0LWJvb2ttYXJrcy1mcm9tLXByb3ZpZGVyJywgcHJvdmlkZXIpO1xuICAgIH0sXG4gICAgaW1wb3J0Qm9va21hcmtzOiAoYm9va21hcmtzOiBQYXJ0aWFsPEJvb2ttYXJrPltdKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICByZXR1cm4gaXBjUmVuZGVyZXIuaW52b2tlKCdpbXBvcnQtYm9va21hcmtzJywgYm9va21hcmtzKTtcbiAgICB9LFxuICAgIGdldEJvb2ttYXJrc1RhZ3M6ICgpOiBQcm9taXNlPFRhZ1tdPiA9PiB7XG4gICAgICByZXR1cm4gaXBjUmVuZGVyZXIuaW52b2tlKCdnZXQtYm9va21hcmtzLXRhZ3MnKTtcbiAgICB9LFxuICAgIGlzQm9va21hcmtlZDogKHVybDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiA9PiB7XG4gICAgICByZXR1cm4gaXBjUmVuZGVyZXIuaW52b2tlKCdpcy1ib29rbWFya2VkJywgdXJsKTtcbiAgICB9LFxuICAgIGFkZEJvb2ttYXJrOiAoYXJnczogSXBjQWRkQm9va21hcmspOiBQcm9taXNlPEJvb2ttYXJrPiA9PiB7XG4gICAgICByZXR1cm4gaXBjUmVuZGVyZXIuaW52b2tlKCdhZGQtYm9va21hcmsnLCBhcmdzKTtcbiAgICB9LFxuICAgIHJlbW92ZUJvb2ttYXJrOiAodXJsOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgIHJldHVybiBpcGNSZW5kZXJlci5pbnZva2UoJ3JlbW92ZS1ib29rbWFyaycsIHVybCk7XG4gICAgfSxcbiAgICBnZXRBbGxCb29rbWFya3M6ICgpOiBQcm9taXNlPEJvb2ttYXJrW10+ID0+IHtcbiAgICAgIHJldHVybiBpcGNSZW5kZXJlci5pbnZva2UoJ2dldC1hbGwtYm9va21hcmtzJyk7XG4gICAgfSxcbiAgfSxcbiAgYnJvd3Nlcjoge1xuICAgIHNlbGVjdDogKHdlYkNvbnRlbnRzSWQ6IG51bWJlcikgPT4ge1xuICAgICAgaXBjUmVuZGVyZXIuc2VuZCgnc2VsZWN0LWJyb3dzZXInLCB3ZWJDb250ZW50c0lkKTtcbiAgICB9LFxuICAgIHNlbGVjdEJyb3dzZXJWaWV3OiAoKSA9PiB7XG4gICAgICBpcGNSZW5kZXJlci5zZW5kKCdzZWxlY3QtYnJvd3NlclZpZXcnKTtcbiAgICB9LFxuICAgIGNlcnRpZmljYXRlRXJyb3JBbnN3ZXI6IChhcmdzOiBJcGNDZXJ0aWZpY2F0ZUVycm9yQW5zd2VyKSA9PiB7XG4gICAgICBpcGNSZW5kZXJlci5zZW5kKCdjZXJ0aWZpY2F0ZS1lcnJvci1hbnN3ZXInLCBhcmdzKTtcbiAgICB9LFxuICAgIHJlcXVlc3RDYXB0dXJlOiAod2ViQ29udGVudHNJZDogbnVtYmVyKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcbiAgICAgIHJldHVybiBpcGNSZW5kZXJlci5pbnZva2UoJ3JlcXVlc3QtY2FwdHVyZScsIHdlYkNvbnRlbnRzSWQpO1xuICAgIH0sXG4gICAgZ2V0VXJsVG9PcGVuOiAoKTogUHJvbWlzZTxzdHJpbmcgfCB1bmRlZmluZWQ+ID0+IHtcbiAgICAgIHJldHVybiBpcGNSZW5kZXJlci5pbnZva2UoJ2dldC11cmwtdG8tb3BlbicpO1xuICAgIH0sXG4gICAgcGVybWlzc2lvblJlc3BvbnNlOiAoYXJnczogSXBjUGVybWlzc2lvblJlc3BvbnNlKSA9PiB7XG4gICAgICBpcGNSZW5kZXJlci5zZW5kKCdwZXJtaXNzaW9uLXJlc3BvbnNlJywgYXJncyk7XG4gICAgfSxcbiAgfSxcbiAgY29uZmlnOiB7XG4gICAgZ2V0OiAoa2V5OiBzdHJpbmcpOiBQcm9taXNlPHVua25vd24+ID0+XG4gICAgICBpcGNSZW5kZXJlci5pbnZva2UoJ2dldC1zdG9yZS12YWx1ZScsIGtleSksXG4gICAgc2V0OiAoYXJnczogSXBjU2V0U3RvcmVWYWx1ZSk6IFByb21pc2U8dm9pZD4gPT5cbiAgICAgIGlwY1JlbmRlcmVyLmludm9rZSgnc2V0LXN0b3JlLXZhbHVlJywgYXJncyksXG4gIH0sXG4gIGRvd25sb2FkOiB7XG4gICAgcmVtb3ZlRG93bmxvYWQ6IChpZDogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICByZXR1cm4gaXBjUmVuZGVyZXIuaW52b2tlKCdyZW1vdmUtZG93bmxvYWQnLCBpZCk7XG4gICAgfSxcbiAgICBhZGREb3dubG9hZDogKGFyZ3M6IElwY0FkZERvd25sb2FkKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICByZXR1cm4gaXBjUmVuZGVyZXIuaW52b2tlKCdhZGQtZG93bmxvYWQnLCBhcmdzKTtcbiAgICB9LFxuICAgIGdldEFsbERvd25sb2FkczogKCk6IFByb21pc2U8RG93bmxvYWRbXT4gPT4ge1xuICAgICAgcmV0dXJuIGlwY1JlbmRlcmVyLmludm9rZSgnZ2V0LWFsbC1kb3dubG9hZHMnKTtcbiAgICB9LFxuICAgIGNsZWFyRG93bmxvYWRzOiAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICByZXR1cm4gaXBjUmVuZGVyZXIuaW52b2tlKCdjbGVhci1kb3dubG9hZHMnKTtcbiAgICB9LFxuICAgIGhpZGVEb3dubG9hZHNQcmV2aWV3OiAoKSA9PiB7XG4gICAgICBpcGNSZW5kZXJlci5zZW5kKCdoaWRlLWRvd25sb2Fkcy1wcmV2aWV3Jyk7XG4gICAgfSxcbiAgfSxcbiAgZXh0ZW5zaW9uOiB7XG4gICAgZ2V0QWxsRXh0ZW5zaW9uczogKCk6IFByb21pc2U8RXh0ZW5zaW9uW10+ID0+IHtcbiAgICAgIHJldHVybiBpcGNSZW5kZXJlci5pbnZva2UoJ2dldC1hbGwtZXh0ZW5zaW9ucycpO1xuICAgIH0sXG4gICAgZGVsZXRlRXh0ZW5zaW9uOiAoaWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgcmV0dXJuIGlwY1JlbmRlcmVyLmludm9rZSgnZGVsZXRlLWV4dGVuc2lvbicsIGlkKTtcbiAgICB9LFxuICAgIGluc3RhbGxFeHRlbnNpb246IChpZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICByZXR1cm4gaXBjUmVuZGVyZXIuaW52b2tlKCdpbnN0YWxsLWV4dGVuc2lvbicsIGlkKTtcbiAgICB9LFxuICB9LFxuICBoaXN0b3J5OiB7XG4gICAgYWRkSGlzdG9yeTogKGFyZ3M6IElwY0FkZEhpc3RvcnkpOiBQcm9taXNlPEhpc3Rvcnk+ID0+IHtcbiAgICAgIHJldHVybiBpcGNSZW5kZXJlci5pbnZva2UoJ2FkZC1oaXN0b3J5JywgYXJncyk7XG4gICAgfSxcbiAgICBmaW5kSW5IaXN0b3J5OiAoc3RyOiBzdHJpbmcpOiBQcm9taXNlPEhpc3RvcnlbXT4gPT4ge1xuICAgICAgcmV0dXJuIGlwY1JlbmRlcmVyLmludm9rZSgnZmluZC1pbi1oaXN0b3J5Jywgc3RyKTtcbiAgICB9LFxuICAgIHJlbW92ZUhpc3Rvcnk6IChpZDogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICByZXR1cm4gaXBjUmVuZGVyZXIuaW52b2tlKCdyZW1vdmUtaGlzdG9yeScsIGlkKTtcbiAgICB9LFxuICAgIGNsZWFySGlzdG9yeTogKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgcmV0dXJuIGlwY1JlbmRlcmVyLmludm9rZSgnY2xlYXItaGlzdG9yeScpO1xuICAgIH0sXG4gICAgZ2V0QWxsSGlzdG9yeTogKCk6IFByb21pc2U8SGlzdG9yeVtdPiA9PiB7XG4gICAgICByZXR1cm4gaXBjUmVuZGVyZXIuaW52b2tlKCdnZXQtYWxsLWhpc3RvcnknKTtcbiAgICB9LFxuICB9LFxuICBsaXN0ZW5lcjoge1xuICAgIG5ld1dpbmRvdzogKFxuICAgICAgYWN0aW9uOiAoZXZlbnQ6IElwY1JlbmRlcmVyRXZlbnQsIC4uLmFyZ3M6IHVua25vd25bXSkgPT4gdm9pZFxuICAgICkgPT4ge1xuICAgICAgaXBjUmVuZGVyZXIub24oJ25ldy13aW5kb3cnLCBhY3Rpb24pO1xuICAgIH0sXG4gICAgbG9hZEJvYXJkOiAoXG4gICAgICBhY3Rpb246IChldmVudDogSXBjUmVuZGVyZXJFdmVudCwgLi4uYXJnczogdW5rbm93bltdKSA9PiB2b2lkXG4gICAgKSA9PiB7XG4gICAgICBpcGNSZW5kZXJlci5vbignbG9hZC1ib2FyZCcsIGFjdGlvbik7XG4gICAgfSxcbiAgICBwdXJnZTogKGFjdGlvbjogKGV2ZW50OiBJcGNSZW5kZXJlckV2ZW50LCAuLi5hcmdzOiB1bmtub3duW10pID0+IHZvaWQpID0+IHtcbiAgICAgIGlwY1JlbmRlcmVyLm9uKCdwdXJnZScsIGFjdGlvbik7XG4gICAgfSxcbiAgICByZW5hbWVCb2FyZDogKFxuICAgICAgYWN0aW9uOiAoZXZlbnQ6IElwY1JlbmRlcmVyRXZlbnQsIC4uLmFyZ3M6IHVua25vd25bXSkgPT4gdm9pZFxuICAgICkgPT4ge1xuICAgICAgaXBjUmVuZGVyZXIub24oJ3JlbmFtZS1ib2FyZCcsIGFjdGlvbik7XG4gICAgfSxcbiAgICBjbG9zZVdlYnZpZXc6IChcbiAgICAgIGFjdGlvbjogKGV2ZW50OiBJcGNSZW5kZXJlckV2ZW50LCAuLi5hcmdzOiB1bmtub3duW10pID0+IHZvaWRcbiAgICApID0+IHtcbiAgICAgIGlwY1JlbmRlcmVyLm9uKCdjbG9zZS13ZWJ2aWV3JywgYWN0aW9uKTtcbiAgICB9LFxuICAgIGNsb3NlQWxsV2VidmlldzogKFxuICAgICAgYWN0aW9uOiAoZXZlbnQ6IElwY1JlbmRlcmVyRXZlbnQsIC4uLmFyZ3M6IHVua25vd25bXSkgPT4gdm9pZFxuICAgICkgPT4ge1xuICAgICAgaXBjUmVuZGVyZXIub24oJ2Nsb3NlLWFsbC13ZWJ2aWV3JywgYWN0aW9uKTtcbiAgICB9LFxuICAgIGNsb3NlT3RoZXJzV2VidmlldzogKFxuICAgICAgYWN0aW9uOiAoZXZlbnQ6IElwY1JlbmRlcmVyRXZlbnQsIC4uLmFyZ3M6IHVua25vd25bXSkgPT4gdm9pZFxuICAgICkgPT4ge1xuICAgICAgaXBjUmVuZGVyZXIub24oJ2Nsb3NlLW90aGVycy13ZWJ2aWV3JywgYWN0aW9uKTtcbiAgICB9LFxuICAgIHNob3dBcHBNZW51OiAoXG4gICAgICBhY3Rpb246IChldmVudDogSXBjUmVuZGVyZXJFdmVudCwgLi4uYXJnczogdW5rbm93bltdKSA9PiB2b2lkXG4gICAgKSA9PiB7XG4gICAgICBpcGNSZW5kZXJlci5vbignc2hvdy1hcHAtbWVudScsIGFjdGlvbik7XG4gICAgfSxcbiAgICBjZXJ0aWZpY2F0ZUVycm9yOiAoXG4gICAgICBhY3Rpb246IChldmVudDogSXBjUmVuZGVyZXJFdmVudCwgLi4uYXJnczogdW5rbm93bltdKSA9PiB2b2lkXG4gICAgKSA9PiB7XG4gICAgICBpcGNSZW5kZXJlci5vbignY2VydGlmaWNhdGUtZXJyb3InLCBhY3Rpb24pO1xuICAgIH0sXG4gICAgZG93bmxvYWRpbmc6IChcbiAgICAgIGFjdGlvbjogKGV2ZW50OiBJcGNSZW5kZXJlckV2ZW50LCAuLi5hcmdzOiB1bmtub3duW10pID0+IHZvaWRcbiAgICApID0+IHtcbiAgICAgIGlwY1JlbmRlcmVyLm9uKCdkb3dubG9hZGluZycsIGFjdGlvbik7XG4gICAgfSxcbiAgICBzaG93RG93bmxvYWRzUHJldmlldzogKFxuICAgICAgYWN0aW9uOiAoZXZlbnQ6IElwY1JlbmRlcmVyRXZlbnQsIC4uLmFyZ3M6IHVua25vd25bXSkgPT4gdm9pZFxuICAgICkgPT4ge1xuICAgICAgaXBjUmVuZGVyZXIub24oJ3Nob3ctZG93bmxvYWRzLXByZXZpZXcnLCBhY3Rpb24pO1xuICAgIH0sXG4gICAgZGlzdHJpYnV0ZVdpbmRvd3NFdmVubHk6IChcbiAgICAgIGFjdGlvbjogKGV2ZW50OiBJcGNSZW5kZXJlckV2ZW50LCAuLi5hcmdzOiB1bmtub3duW10pID0+IHZvaWRcbiAgICApID0+IHtcbiAgICAgIGlwY1JlbmRlcmVyLm9uKCdkaXN0cmlidXRlLXdpbmRvd3MtZXZlbmx5JywgYWN0aW9uKTtcbiAgICB9LFxuICAgIHNldERlZmF1bHRXaW5kb3dTaXplOiAoXG4gICAgICBhY3Rpb246IChldmVudDogSXBjUmVuZGVyZXJFdmVudCwgLi4uYXJnczogdW5rbm93bltdKSA9PiB2b2lkXG4gICAgKSA9PiB7XG4gICAgICBpcGNSZW5kZXJlci5vbignc2V0LWRlZmF1bHQtd2luZG93LXNpemUnLCBhY3Rpb24pO1xuICAgIH0sXG4gICAgcGVybWlzc2lvblJlcXVlc3Q6IChcbiAgICAgIGFjdGlvbjogKGV2ZW50OiBJcGNSZW5kZXJlckV2ZW50LCAuLi5hcmdzOiB1bmtub3duW10pID0+IHZvaWRcbiAgICApID0+IHtcbiAgICAgIGlwY1JlbmRlcmVyLm9uKCdwZXJtaXNzaW9uLXJlcXVlc3QnLCBhY3Rpb24pO1xuICAgIH0sXG4gIH0sXG4gIG9mZjoge1xuICAgIG5ld1dpbmRvdzogKCkgPT4ge1xuICAgICAgaXBjUmVuZGVyZXIucmVtb3ZlQWxsTGlzdGVuZXJzKCduZXctd2luZG93Jyk7XG4gICAgfSxcbiAgICBsb2FkQm9hcmQ6ICgpID0+IHtcbiAgICAgIGlwY1JlbmRlcmVyLnJlbW92ZUFsbExpc3RlbmVycygnbG9hZC1ib2FyZCcpO1xuICAgIH0sXG4gICAgcHVyZ2U6ICgpID0+IHtcbiAgICAgIGlwY1JlbmRlcmVyLnJlbW92ZUFsbExpc3RlbmVycygncHVyZ2UnKTtcbiAgICB9LFxuICAgIHJlbmFtZUJvYXJkOiAoKSA9PiB7XG4gICAgICBpcGNSZW5kZXJlci5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbmFtZS1ib2FyZCcpO1xuICAgIH0sXG4gICAgY2xvc2VXZWJ2aWV3OiAoKSA9PiB7XG4gICAgICBpcGNSZW5kZXJlci5yZW1vdmVBbGxMaXN0ZW5lcnMoJ2Nsb3NlLXdlYnZpZXcnKTtcbiAgICB9LFxuICAgIGNsb3NlQWxsV2VidmlldzogKCkgPT4ge1xuICAgICAgaXBjUmVuZGVyZXIucmVtb3ZlQWxsTGlzdGVuZXJzKCdjbG9zZS1hbGwtd2VidmlldycpO1xuICAgIH0sXG4gICAgY2xvc2VPdGhlcnNXZWJ2aWV3OiAoKSA9PiB7XG4gICAgICBpcGNSZW5kZXJlci5yZW1vdmVBbGxMaXN0ZW5lcnMoJ2Nsb3NlLW90aGVycy13ZWJ2aWV3Jyk7XG4gICAgfSxcbiAgICBzaG93QXBwTWVudTogKCkgPT4ge1xuICAgICAgaXBjUmVuZGVyZXIucmVtb3ZlQWxsTGlzdGVuZXJzKCdzaG93LWFwcC1tZW51Jyk7XG4gICAgfSxcbiAgICBjZXJ0aWZpY2F0ZUVycm9yOiAoKSA9PiB7XG4gICAgICBpcGNSZW5kZXJlci5yZW1vdmVBbGxMaXN0ZW5lcnMoJ2NlcnRpZmljYXRlLWVycm9yJyk7XG4gICAgfSxcbiAgICBkb3dubG9hZGluZzogKCkgPT4ge1xuICAgICAgaXBjUmVuZGVyZXIucmVtb3ZlQWxsTGlzdGVuZXJzKCdkb3dubG9hZGluZycpO1xuICAgIH0sXG4gICAgc2hvd0Rvd25sb2Fkc1ByZXZpZXc6ICgpID0+IHtcbiAgICAgIGlwY1JlbmRlcmVyLnJlbW92ZUFsbExpc3RlbmVycygnc2hvdy1kb3dubG9hZHMtcHJldmlldycpO1xuICAgIH0sXG4gICAgZGlzdHJpYnV0ZVdpbmRvd3NFdmVubHk6ICgpID0+IHtcbiAgICAgIGlwY1JlbmRlcmVyLnJlbW92ZUFsbExpc3RlbmVycygnZGlzdHJpYnV0ZS13aW5kb3dzLWV2ZW5seScpO1xuICAgIH0sXG4gICAgc2V0RGVmYXVsdFdpbmRvd1NpemU6ICgpID0+IHtcbiAgICAgIGlwY1JlbmRlcmVyLnJlbW92ZUFsbExpc3RlbmVycygnc2V0LWRlZmF1bHQtd2luZG93LXNpemUnKTtcbiAgICB9LFxuICAgIHBlcm1pc3Npb25SZXF1ZXN0OiAoKSA9PiB7XG4gICAgICBpcGNSZW5kZXJlci5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3Blcm1pc3Npb24tcmVxdWVzdCcpO1xuICAgIH0sXG4gIH0sXG4gIHRvb2xzOiB7XG4gICAgaW5zcGVjdEVsZW1lbnQ6IChwb2ludDogSXBjSW5zcGVjdEVsZW1lbnQpID0+IHtcbiAgICAgIGlwY1JlbmRlcmVyLnNlbmQoJ2luc3BlY3RFbGVtZW50JywgcG9pbnQpO1xuICAgIH0sXG4gICAgdG9nZ2xlRGFya01vZGU6ICgpID0+IHtcbiAgICAgIGlwY1JlbmRlcmVyLmludm9rZSgnZGFyay1tb2RlOnRvZ2dsZScpO1xuICAgIH0sXG4gICAgY2hhbmdlTGFuZ3VhZ2U6IChsb2NhbGU6IExvY2FsZSk6IFByb21pc2U8VEZ1bmN0aW9uPiA9PiB7XG4gICAgICByZXR1cm4gaXBjUmVuZGVyZXIuaW52b2tlKCdjaGFuZ2UtbGFuZ3VhZ2UnLCBsb2NhbGUpO1xuICAgIH0sXG4gICAgc2hvd0l0ZW1JbkZvbGRlcjogKGZpbGVwYXRoOiBzdHJpbmcpID0+IHtcbiAgICAgIGlwY1JlbmRlcmVyLnNlbmQoJ3Nob3ctaXRlbS1pbi1mb2xkZXInLCBmaWxlcGF0aCk7XG4gICAgfSxcbiAgICBzaG93TGVmdGJhckNvbnRleHRNZW51OiAocGFyYW1zOiBJcGNTaG93TGVmdGJhckNvbnRleHRNZW51KSA9PiB7XG4gICAgICBpcGNSZW5kZXJlci5zZW5kKCdzaG93LWxlZnRiYXItY29udGV4dC1tZW51JywgcGFyYW1zKTtcbiAgICB9LFxuICAgIHNob3dCb2FyZENvbnRleHRNZW51OiAocGFyYW1zOiBJcGNTaG93Qm9hcmRDb250ZXh0TWVudSkgPT4ge1xuICAgICAgaXBjUmVuZGVyZXIuc2VuZCgnc2hvdy1ib2FyZC1jb250ZXh0LW1lbnUnLCBwYXJhbXMpO1xuICAgIH0sXG4gICAgY2xpY2tlZDogKCkgPT4ge1xuICAgICAgaXBjUmVuZGVyZXIuc2VuZCgnYXBwLWNsaWNrZWQnKTtcbiAgICB9LFxuICAgIGZpbmRJbktub3duRG9tYWluczogKGlucHV0OiBzdHJpbmcpOiBQcm9taXNlPERvbWFpblN1Z2dlc3Rpb25bXT4gPT4ge1xuICAgICAgcmV0dXJuIGlwY1JlbmRlcmVyLmludm9rZSgnZmluZC1pbi1rbm93bi1kb21haW5zJywgaW5wdXQpO1xuICAgIH0sXG4gIH0sXG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==