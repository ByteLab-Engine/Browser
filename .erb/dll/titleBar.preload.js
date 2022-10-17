/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/electron-chrome-extensions-production/dist/browser-action.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/electron-chrome-extensions-production/dist/browser-action.js ***!
  \***********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = __webpack_require__(/*! electron */ "electron");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = __webpack_require__(/*! events */ "events");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nested_webpack_require_686__(moduleId) {
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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_686__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__nested_webpack_require_686__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__nested_webpack_require_686__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__nested_webpack_require_686__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__nested_webpack_require_686__.o(definition, key) && !__nested_webpack_require_686__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__nested_webpack_require_686__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__nested_webpack_require_686__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*******************************!*\
  !*** ./src/browser-action.ts ***!
  \*******************************/
__nested_webpack_require_686__.r(__webpack_exports__);
/* harmony export */ __nested_webpack_require_686__.d(__webpack_exports__, {
/* harmony export */   "injectBrowserAction": () => (/* binding */ injectBrowserAction)
/* harmony export */ });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_686__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__nested_webpack_require_686__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_686__(/*! events */ "events");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__nested_webpack_require_686__.n(events__WEBPACK_IMPORTED_MODULE_1__);


const injectBrowserAction = () => {
  const actionMap = new Map();
  const internalEmitter = new events__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
  const observerCounts = new Map();

  const invoke = (name, partition, ...args) => {
    return electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('crx-msg-remote', partition, name, ...args);
  };

  const browserAction = {
    addEventListener(name, listener) {
      internalEmitter.addListener(name, listener);
    },

    removeEventListener(name, listener) {
      internalEmitter.removeListener(name, listener);
    },

    getAction(extensionId) {
      return actionMap.get(extensionId);
    },

    async getState(partition) {
      const state = await invoke('browserAction.getState', partition);
      state.actions.forEach(action => actionMap.set(action.id, action));
      queueMicrotask(() => internalEmitter.emit('update', state));
      return state;
    },

    activate: (partition, details) => {
      return invoke('browserAction.activate', partition, details);
    },

    addObserver(partition) {
      let count = observerCounts.has(partition) ? observerCounts.get(partition) : 0;
      count += 1;
      observerCounts.set(partition, count);

      if (count === 1) {
        invoke('browserAction.addObserver', partition);
      }
    },

    removeObserver(partition) {
      let count = observerCounts.has(partition) ? observerCounts.get(partition) : 0;
      count = Math.max(count - 1, 0);
      observerCounts.set(partition, count);

      if (count === 0) {
        invoke('browserAction.removeObserver', partition);
      }
    }

  };
  electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.on('browserAction.update', () => {
    for (const partition of observerCounts.keys()) {
      try {
        browserAction.getState(partition);
      } catch (e) {
        console.log(e);
      }
    }
  }); // Function body to run in the main world.
  // IMPORTANT: This must be self-contained, no closure variables can be used!

  function mainWorldScript() {
    const DEFAULT_PARTITION = '_self';

    class BrowserActionElement extends HTMLButtonElement {
      get id() {
        return this.getAttribute('id') || '';
      }

      set id(id) {
        this.setAttribute('id', id);
      }

      get tab() {
        const tabId = parseInt(this.getAttribute('tab') || '', 10);
        return typeof tabId === 'number' && !isNaN(tabId) ? tabId : -1;
      }

      set tab(tab) {
        this.setAttribute('tab', `${tab}`);
      }

      get partition() {
        return this.getAttribute('partition');
      }

      set partition(partition) {
        if (partition) {
          this.setAttribute('partition', partition);
        } else {
          this.removeAttribute('partition');
        }
      }

      static get observedAttributes() {
        return ['id', 'tab', 'partition'];
      }

      update() {
        if (this.updateId) return;
        this.updateId = requestAnimationFrame(this.updateCallback.bind(this));
      }

      constructor() {
        super(); // TODO: event delegation

        this.updateId = void 0;
        this.badge = void 0;
        this.pendingIcon = void 0;
        this.addEventListener('click', this.onClick.bind(this));
        this.addEventListener('contextmenu', this.onContextMenu.bind(this));
      }

      connectedCallback() {
        if (this.isConnected) {
          this.update();
        }
      }

      disconnectedCallback() {
        if (this.updateId) {
          cancelAnimationFrame(this.updateId);
          this.updateId = undefined;
        }

        if (this.pendingIcon) {
          this.pendingIcon = undefined;
        }
      }

      attributeChangedCallback() {
        if (this.isConnected) {
          this.update();
        }
      }

      activate(event) {
        const rect = this.getBoundingClientRect();
        window.browserAction.activate(this.partition || DEFAULT_PARTITION, {
          eventType: event.type,
          extensionId: this.id,
          tabId: this.tab,
          anchorRect: {
            x: rect.left,
            y: rect.top,
            width: rect.width,
            height: rect.height
          }
        });
      }

      onClick(event) {
        this.activate(event);
      }

      onContextMenu(event) {
        event.stopImmediatePropagation();
        event.preventDefault();
        this.activate(event);
      }

      getBadge() {
        let {
          badge
        } = this;

        if (!badge) {
          this.badge = badge = document.createElement('div');
          badge.className = 'badge';
          badge.part = 'badge';
          this.appendChild(badge);
        }

        return badge;
      }

      updateIcon(info) {
        const iconSize = 32;
        const resizeType = 2;
        const timeParam = info.iconModified ? `&t=${info.iconModified}` : '';
        const iconUrl = `crx://extension-icon/${this.id}/${iconSize}/${resizeType}?tabId=${this.tab}${timeParam}`;
        const bgImage = `url(${iconUrl})`;

        if (this.pendingIcon) {
          this.pendingIcon = undefined;
        } // Preload icon to prevent it from blinking


        const img = this.pendingIcon = new Image();

        img.onload = () => {
          if (this.isConnected) {
            this.style.backgroundImage = bgImage;
            this.pendingIcon = undefined;
          }
        };

        img.src = iconUrl;
      }

      updateCallback() {
        this.updateId = undefined;
        const action = window.browserAction.getAction(this.id);
        const activeTabId = this.tab;
        const tabInfo = activeTabId > -1 ? action.tabs[activeTabId] : {};
        const info = { ...tabInfo,
          ...action
        };
        this.title = typeof info.title === 'string' ? info.title : '';
        this.updateIcon(info);

        if (info.text) {
          const badge = this.getBadge();
          badge.textContent = info.text;
          badge.style.color = '#fff'; // TODO: determine bg lightness?

          badge.style.backgroundColor = info.color;
        } else if (this.badge) {
          this.badge.remove();
          this.badge = undefined;
        }
      }

    }

    !customElements.get('browser-action') && customElements.define('browser-action', BrowserActionElement, {
      extends: 'button'
    });

    class BrowserActionListElement extends HTMLElement {
      get tab() {
        const tabId = parseInt(this.getAttribute('tab') || '', 10);
        return typeof tabId === 'number' && !isNaN(tabId) ? tabId : null;
      }

      set tab(tab) {
        if (typeof tab === 'number') {
          this.setAttribute('tab', `${tab}`);
        } else {
          this.removeAttribute('tab');
        }
      }

      get partition() {
        return this.getAttribute('partition');
      }

      set partition(partition) {
        if (partition) {
          this.setAttribute('partition', partition);
        } else {
          this.removeAttribute('partition');
        }
      }

      static get observedAttributes() {
        return ['tab', 'partition'];
      }

      constructor() {
        super();
        this.observing = false;

        this.fetchState = async () => {
          try {
            await window.browserAction.getState(this.partition || DEFAULT_PARTITION);
          } catch {
            console.error(`browser-action-list failed to update [tab: ${this.tab}, partition: '${this.partition}']`);
          }
        };

        this.update = state => {
          const tabId = typeof this.tab === 'number' && this.tab >= 0 ? this.tab : state.activeTabId || -1;
          state.actions.forEach(action => {
            var _this$shadowRoot;

            let browserActionNode = (_this$shadowRoot = this.shadowRoot) === null || _this$shadowRoot === void 0 ? void 0 : _this$shadowRoot.querySelector(`[id=${action.id}]`);

            if (!browserActionNode) {
              var _this$shadowRoot2;

              const node = document.createElement('button', {
                is: 'browser-action'
              });
              node.id = action.id;
              node.className = 'action';
              node.part = 'action';
              browserActionNode = node;
              (_this$shadowRoot2 = this.shadowRoot) === null || _this$shadowRoot2 === void 0 ? void 0 : _this$shadowRoot2.appendChild(browserActionNode);
            }

            if (this.partition) browserActionNode.partition = this.partition;
            browserActionNode.tab = tabId;
          });
        };

        const shadowRoot = this.attachShadow({
          mode: 'open'
        });
        const style = document.createElement('style');
        style.textContent = `
:host {
  display: flex;
  flex-direction: row;
  gap: 5px;
}

.action {
  width: 28px;
  height: 28px;
  background-color: transparent;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 70%;
  border: none;
  border-radius: 4px;
  padding: 0;
  position: relative;
  outline: none;
}

.action:hover {
  background-color: var(--browser-action-hover-bg, rgba(255, 255, 255, 0.3));
}

.badge {
  box-shadow: 0px 0px 1px 1px var(--browser-action-badge-outline, #444);
  box-sizing: border-box;
  max-width: 100%;
  height: 12px;
  padding: 0 2px;
  border-radius: 2px;
  position: absolute;
  bottom: 1px;
  right: 0;
  pointer-events: none;
  line-height: 1.5;
  font-size: 9px;
  font-weight: 400;
  overflow: hidden;
  white-space: nowrap;
}`;
        shadowRoot.appendChild(style);
      }

      connectedCallback() {
        if (this.isConnected) {
          try {
            this.startObserving();
            this.fetchState();
          } catch (e) {
            console.log('connectedCallback', e, this, this.partition, DEFAULT_PARTITION);
          }
        }
      }

      disconnectedCallback() {
        this.stopObserving();
      }

      attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;

        if (this.isConnected) {
          this.fetchState();
        }
      }

      startObserving() {
        try {
          if (this.observing) return;
          window.browserAction.addEventListener('update', this.update);
          window.browserAction.addObserver(this.partition || DEFAULT_PARTITION);
          this.observing = true;
        } catch (e) {
          console.log('startObserving', e, this, this.partition, DEFAULT_PARTITION);
        }
      }

      stopObserving() {
        if (!this.observing) return;
        window.browserAction.removeEventListener('update', this.update);
        window.browserAction.removeObserver(this.partition || DEFAULT_PARTITION);
        this.observing = false;
      }

    }

    !customElements.get('browser-action-list') && customElements.define('browser-action-list', BrowserActionListElement);
  }

  try {
    electron__WEBPACK_IMPORTED_MODULE_0__.contextBridge.exposeInMainWorld('browserAction', browserAction); // Must execute script in main world to modify custom component registry.

    electron__WEBPACK_IMPORTED_MODULE_0__.webFrame.executeJavaScript(`(${mainWorldScript}());`);
  } catch {
    // When contextIsolation is disabled, contextBridge will throw an error.
    // If that's the case, we're in the main world so we can just execute our
    // function.
    mainWorldScript();
  }
};
})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=browser-action.js.map

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("electron");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;
/*!**************************************!*\
  !*** ./src/main/preload/titleBar.ts ***!
  \**************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
/* eslint-disable no-multi-assign */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable import/prefer-default-export */
/* eslint-disable max-classes-per-file */
const electron_1 = __webpack_require__(/*! electron */ "electron");
const browser_action_1 = __webpack_require__(/*! electron-chrome-extensions-production/dist/browser-action */ "./node_modules/electron-chrome-extensions-production/dist/browser-action.js");
(0, browser_action_1.injectBrowserAction)();
electron_1.contextBridge.exposeInMainWorld('titleBar', {
    app: {
        close: () => {
            electron_1.ipcRenderer.send('close-app');
        },
        minimize: () => {
            electron_1.ipcRenderer.send('minimize-app');
        },
        maximize: () => {
            electron_1.ipcRenderer.send('maximize-app');
        },
        showMenu: () => {
            electron_1.ipcRenderer.send('show-app-menu');
        },
        showDownloadsPreview: () => {
            electron_1.ipcRenderer.send('show-downloads-preview');
        },
        showTabContextMenu: (params) => {
            electron_1.ipcRenderer.send('show-tab-context-menu', params);
        },
        isMaximized: () => {
            return electron_1.ipcRenderer.invoke('is-app-maximized');
        },
    },
    analytics: {
        event: (eventName, params) => {
            electron_1.ipcRenderer.send('analytics', { eventName, params });
        },
    },
    tools: {
        inspectElement: (point) => {
            electron_1.ipcRenderer.send('inspectElement', point);
        },
    },
    tabs: {
        select: (tabId) => {
            electron_1.ipcRenderer.send('tab-select', { tabId });
        },
        purge: (tabId) => {
            electron_1.ipcRenderer.send('tab-purge', { tabId });
        },
        save: (tabId) => {
            electron_1.ipcRenderer.send('save-tab', { tabId });
        },
        rename: (args) => {
            electron_1.ipcRenderer.send('rename-tab', args);
        },
    },
    listener: {
        openTab: (action) => {
            electron_1.ipcRenderer.on('open-tab', action);
        },
        renameTab: (action) => {
            electron_1.ipcRenderer.on('rename-tab', action);
        },
        closeTab: (action) => {
            electron_1.ipcRenderer.on('close-tab', action);
        },
        saveBoard: (action) => {
            electron_1.ipcRenderer.on('save-board', action);
        },
        closeActiveTab: (action) => {
            electron_1.ipcRenderer.on('close-active-tab', action);
        },
        selectNextBoard: (action) => {
            electron_1.ipcRenderer.on('select-next-board', action);
        },
        setWindowsCount: (action) => {
            electron_1.ipcRenderer.on('set-windows-count', action);
        },
        closeAllTab: (action) => {
            electron_1.ipcRenderer.on('close-all-tab', action);
        },
        closeOthersTab: (action) => {
            electron_1.ipcRenderer.on('close-others-tab', action);
        },
        downloadState: (action) => {
            electron_1.ipcRenderer.on('download-state', action);
        },
        removeExtension: (action) => {
            electron_1.ipcRenderer.on('remove-extension', action);
        },
        hideDownloadsPreview: (action) => {
            electron_1.ipcRenderer.on('hide-downloads-preview', action);
        },
        appClicked: (action) => {
            electron_1.ipcRenderer.on('app-clicked', action);
        },
    },
    off: {
        openTab: () => {
            electron_1.ipcRenderer.removeAllListeners('open-tab');
        },
        renameTab: () => {
            electron_1.ipcRenderer.removeAllListeners('rename-tab');
        },
        closeTab: () => {
            electron_1.ipcRenderer.removeAllListeners('close-tab');
        },
        saveBoard: () => {
            electron_1.ipcRenderer.removeAllListeners('save-board');
        },
        closeActiveTab: () => {
            electron_1.ipcRenderer.removeAllListeners('close-active-tab');
        },
        selectNextBoard: () => {
            electron_1.ipcRenderer.removeAllListeners('select-next-board');
        },
        setWindowsCount: () => {
            electron_1.ipcRenderer.removeAllListeners('set-windows-count');
        },
        closeAllTab: () => {
            electron_1.ipcRenderer.removeAllListeners('close-all-tab');
        },
        closeOthersTab: () => {
            electron_1.ipcRenderer.removeAllListeners('close-others-tab');
        },
        downloadState: () => {
            electron_1.ipcRenderer.removeAllListeners('download-state');
        },
        removeExtension: () => {
            electron_1.ipcRenderer.removeAllListeners('remove-extension');
        },
        hideDownloadsPreview: () => {
            electron_1.ipcRenderer.removeAllListeners('hide-downloads-preview');
        },
        appClicked: () => {
            electron_1.ipcRenderer.removeAllListeners('app-clicked');
        },
    },
    screens: {
        library: () => {
            electron_1.ipcRenderer.send('show-library');
        },
        settings: () => {
            electron_1.ipcRenderer.send('show-settings');
        },
    },
    os: {
        getPlatform: () => process.platform,
    },
});

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGl0bGVCYXIucHJlbG9hZC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxrQkFBa0I7QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixtQkFBTyxDQUFDLDBCQUFVOztBQUVuQyxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLG1CQUFPLENBQUMsc0JBQVE7O0FBRWpDLE9BQU87O0FBRVAsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsOEJBQW1CO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWlFLDhCQUFtQjtBQUNwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLDhCQUFtQjtBQUM5QjtBQUNBO0FBQ0E7QUFDQSxZQUFZLDhCQUFtQixhQUFhLFdBQVc7QUFDdkQ7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsOEJBQW1CO0FBQzlCO0FBQ0EsZ0JBQWdCLDhCQUFtQix3QkFBd0IsOEJBQW1CO0FBQzlFLG9EQUFvRCx3Q0FBd0M7QUFDNUY7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVcsOEJBQW1CO0FBQzlCLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsOEJBQW1CO0FBQzlCO0FBQ0Esa0VBQWtFLGlCQUFpQjtBQUNuRjtBQUNBLDJEQUEyRCxhQUFhO0FBQ3hFO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBbUI7QUFDbkIscUJBQXFCLDhCQUFtQjtBQUN4QztBQUNBLHNCQUFzQjtBQUN0QixpRUFBaUUsOEJBQW1CO0FBQ3BGLHNGQUFzRiw4QkFBbUI7QUFDekcsK0RBQStELDhCQUFtQjtBQUNsRixvRkFBb0YsOEJBQW1COzs7QUFHdkc7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLEdBQUcsR0FBRztBQUNOOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0NBQW9DLElBQUk7QUFDeEM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7O0FBRVY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esb0RB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LENBQUMsQ0FBQztRQUNwQyxDQUFDO0tBQ0Y7SUFDRCxFQUFFLEVBQUU7UUFDRixXQUFXLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVE7S0FDcEM7Q0FDRixDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZWxlY3Ryb24tY2hyb21lLWV4dGVuc2lvbnMtcHJvZHVjdGlvbi9kaXN0L2Jyb3dzZXItYWN0aW9uLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiZWxlY3Ryb25cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImV2ZW50c1wiIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi9wcmVsb2FkL3RpdGxlQmFyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKioqKiovICgoKSA9PiB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0XCJ1c2Ugc3RyaWN0XCI7XG4vKioqKioqLyBcdHZhciBfX3dlYnBhY2tfbW9kdWxlc19fID0gKHtcblxuLyoqKi8gXCJlbGVjdHJvblwiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIGV4dGVybmFsIFwiZWxlY3Ryb25cIiAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKi8gKChtb2R1bGUpID0+IHtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZWxlY3Ryb25cIik7XG5cbi8qKiovIH0pLFxuXG4vKioqLyBcImV2ZW50c1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiBleHRlcm5hbCBcImV2ZW50c1wiICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKi8gKChtb2R1bGUpID0+IHtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXZlbnRzXCIpO1xuXG4vKioqLyB9KVxuXG4vKioqKioqLyBcdH0pO1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHR2YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuLyoqKioqKi8gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG4vKioqKioqLyBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4vKioqKioqLyBcdFx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG4vKioqKioqLyBcdFx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG4vKioqKioqLyBcdFx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdFx0fVxuLyoqKioqKi8gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4vKioqKioqLyBcdFx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG4vKioqKioqLyBcdFx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG4vKioqKioqLyBcdFx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuLyoqKioqKi8gXHRcdFx0ZXhwb3J0czoge31cbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdH1cbi8qKioqKiovIFx0XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gXHQvKiB3ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCAqL1xuLyoqKioqKi8gXHQoKCkgPT4ge1xuLyoqKioqKi8gXHRcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuLyoqKioqKi8gXHRcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4vKioqKioqLyBcdFx0XHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuLyoqKioqKi8gXHRcdFx0XHQoKSA9PiAobW9kdWxlKTtcbi8qKioqKiovIFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuLyoqKioqKi8gXHRcdFx0cmV0dXJuIGdldHRlcjtcbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi8gXHR9KSgpO1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0Lyogd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzICovXG4vKioqKioqLyBcdCgoKSA9PiB7XG4vKioqKioqLyBcdFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG4vKioqKioqLyBcdFx0XHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG4vKioqKioqLyBcdFx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuLyoqKioqKi8gXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG4vKioqKioqLyBcdFx0XHRcdH1cbi8qKioqKiovIFx0XHRcdH1cbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi8gXHR9KSgpO1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0Lyogd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCAqL1xuLyoqKioqKi8gXHQoKCkgPT4ge1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSlcbi8qKioqKiovIFx0fSkoKTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8qIHdlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QgKi9cbi8qKioqKiovIFx0KCgpID0+IHtcbi8qKioqKiovIFx0XHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcbi8qKioqKiovIFx0XHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuLyoqKioqKi8gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbi8qKioqKiovIFx0XHRcdH1cbi8qKioqKiovIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovIFx0fSkoKTtcbi8qKioqKiovIFx0XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xudmFyIF9fd2VicGFja19leHBvcnRzX18gPSB7fTtcbi8vIFRoaXMgZW50cnkgbmVlZCB0byBiZSB3cmFwcGVkIGluIGFuIElJRkUgYmVjYXVzZSBpdCBuZWVkIHRvIGJlIGlzb2xhdGVkIGFnYWluc3Qgb3RoZXIgbW9kdWxlcyBpbiB0aGUgY2h1bmsuXG4oKCkgPT4ge1xuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL3NyYy9icm93c2VyLWFjdGlvbi50cyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbl9fd2VicGFja19yZXF1aXJlX18ucihfX3dlYnBhY2tfZXhwb3J0c19fKTtcbi8qIGhhcm1vbnkgZXhwb3J0ICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCB7XG4vKiBoYXJtb255IGV4cG9ydCAqLyAgIFwiaW5qZWN0QnJvd3NlckFjdGlvblwiOiAoKSA9PiAoLyogYmluZGluZyAqLyBpbmplY3RCcm93c2VyQWN0aW9uKVxuLyogaGFybW9ueSBleHBvcnQgKi8gfSk7XG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgZWxlY3Ryb25fX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIGVsZWN0cm9uICovIFwiZWxlY3Ryb25cIik7XG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgZWxlY3Ryb25fX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfX19kZWZhdWx0ID0gLyojX19QVVJFX18qL19fd2VicGFja19yZXF1aXJlX18ubihlbGVjdHJvbl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fKTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBldmVudHNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXyA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIGV2ZW50cyAqLyBcImV2ZW50c1wiKTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBldmVudHNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfX19kZWZhdWx0ID0gLyojX19QVVJFX18qL19fd2VicGFja19yZXF1aXJlX18ubihldmVudHNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXyk7XG5cblxuY29uc3QgaW5qZWN0QnJvd3NlckFjdGlvbiA9ICgpID0+IHtcbiAgY29uc3QgYWN0aW9uTWFwID0gbmV3IE1hcCgpO1xuICBjb25zdCBpbnRlcm5hbEVtaXR0ZXIgPSBuZXcgZXZlbnRzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18uRXZlbnRFbWl0dGVyKCk7XG4gIGNvbnN0IG9ic2VydmVyQ291bnRzID0gbmV3IE1hcCgpO1xuXG4gIGNvbnN0IGludm9rZSA9IChuYW1lLCBwYXJ0aXRpb24sIC4uLmFyZ3MpID0+IHtcbiAgICByZXR1cm4gZWxlY3Ryb25fX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy5pcGNSZW5kZXJlci5pbnZva2UoJ2NyeC1tc2ctcmVtb3RlJywgcGFydGl0aW9uLCBuYW1lLCAuLi5hcmdzKTtcbiAgfTtcblxuICBjb25zdCBicm93c2VyQWN0aW9uID0ge1xuICAgIGFkZEV2ZW50TGlzdGVuZXIobmFtZSwgbGlzdGVuZXIpIHtcbiAgICAgIGludGVybmFsRW1pdHRlci5hZGRMaXN0ZW5lcihuYW1lLCBsaXN0ZW5lcik7XG4gICAgfSxcblxuICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgbGlzdGVuZXIpIHtcbiAgICAgIGludGVybmFsRW1pdHRlci5yZW1vdmVMaXN0ZW5lcihuYW1lLCBsaXN0ZW5lcik7XG4gICAgfSxcblxuICAgIGdldEFjdGlvbihleHRlbnNpb25JZCkge1xuICAgICAgcmV0dXJuIGFjdGlvbk1hcC5nZXQoZXh0ZW5zaW9uSWQpO1xuICAgIH0sXG5cbiAgICBhc3luYyBnZXRTdGF0ZShwYXJ0aXRpb24pIHtcbiAgICAgIGNvbnN0IHN0YXRlID0gYXdhaXQgaW52b2tlKCdicm93c2VyQWN0aW9uLmdldFN0YXRlJywgcGFydGl0aW9uKTtcbiAgICAgIHN0YXRlLmFjdGlvbnMuZm9yRWFjaChhY3Rpb24gPT4gYWN0aW9uTWFwLnNldChhY3Rpb24uaWQsIGFjdGlvbikpO1xuICAgICAgcXVldWVNaWNyb3Rhc2soKCkgPT4gaW50ZXJuYWxFbWl0dGVyLmVtaXQoJ3VwZGF0ZScsIHN0YXRlKSk7XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfSxcblxuICAgIGFjdGl2YXRlOiAocGFydGl0aW9uLCBkZXRhaWxzKSA9PiB7XG4gICAgICByZXR1cm4gaW52b2tlKCdicm93c2VyQWN0aW9uLmFjdGl2YXRlJywgcGFydGl0aW9uLCBkZXRhaWxzKTtcbiAgICB9LFxuXG4gICAgYWRkT2JzZXJ2ZXIocGFydGl0aW9uKSB7XG4gICAgICBsZXQgY291bnQgPSBvYnNlcnZlckNvdW50cy5oYXMocGFydGl0aW9uKSA/IG9ic2VydmVyQ291bnRzLmdldChwYXJ0aXRpb24pIDogMDtcbiAgICAgIGNvdW50ICs9IDE7XG4gICAgICBvYnNlcnZlckNvdW50cy5zZXQocGFydGl0aW9uLCBjb3VudCk7XG5cbiAgICAgIGlmIChjb3VudCA9PT0gMSkge1xuICAgICAgICBpbnZva2UoJ2Jyb3dzZXJBY3Rpb24uYWRkT2JzZXJ2ZXInLCBwYXJ0aXRpb24pO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICByZW1vdmVPYnNlcnZlcihwYXJ0aXRpb24pIHtcbiAgICAgIGxldCBjb3VudCA9IG9ic2VydmVyQ291bnRzLmhhcyhwYXJ0aXRpb24pID8gb2JzZXJ2ZXJDb3VudHMuZ2V0KHBhcnRpdGlvbikgOiAwO1xuICAgICAgY291bnQgPSBNYXRoLm1heChjb3VudCAtIDEsIDApO1xuICAgICAgb2JzZXJ2ZXJDb3VudHMuc2V0KHBhcnRpdGlvbiwgY291bnQpO1xuXG4gICAgICBpZiAoY291bnQgPT09IDApIHtcbiAgICAgICAgaW52b2tlKCdicm93c2VyQWN0aW9uLnJlbW92ZU9ic2VydmVyJywgcGFydGl0aW9uKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfTtcbiAgZWxlY3Ryb25fX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy5pcGNSZW5kZXJlci5vbignYnJvd3NlckFjdGlvbi51cGRhdGUnLCAoKSA9PiB7XG4gICAgZm9yIChjb25zdCBwYXJ0aXRpb24gb2Ygb2JzZXJ2ZXJDb3VudHMua2V5cygpKSB7XG4gICAgICB0cnkge1xuICAgICAgICBicm93c2VyQWN0aW9uLmdldFN0YXRlKHBhcnRpdGlvbik7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7IC8vIEZ1bmN0aW9uIGJvZHkgdG8gcnVuIGluIHRoZSBtYWluIHdvcmxkLlxuICAvLyBJTVBPUlRBTlQ6IFRoaXMgbXVzdCBiZSBzZWxmLWNvbnRhaW5lZCwgbm8gY2xvc3VyZSB2YXJpYWJsZXMgY2FuIGJlIHVzZWQhXG5cbiAgZnVuY3Rpb24gbWFpbldvcmxkU2NyaXB0KCkge1xuICAgIGNvbnN0IERFRkFVTFRfUEFSVElUSU9OID0gJ19zZWxmJztcblxuICAgIGNsYXNzIEJyb3dzZXJBY3Rpb25FbGVtZW50IGV4dGVuZHMgSFRNTEJ1dHRvbkVsZW1lbnQge1xuICAgICAgZ2V0IGlkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2lkJykgfHwgJyc7XG4gICAgICB9XG5cbiAgICAgIHNldCBpZChpZCkge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnaWQnLCBpZCk7XG4gICAgICB9XG5cbiAgICAgIGdldCB0YWIoKSB7XG4gICAgICAgIGNvbnN0IHRhYklkID0gcGFyc2VJbnQodGhpcy5nZXRBdHRyaWJ1dGUoJ3RhYicpIHx8ICcnLCAxMCk7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdGFiSWQgPT09ICdudW1iZXInICYmICFpc05hTih0YWJJZCkgPyB0YWJJZCA6IC0xO1xuICAgICAgfVxuXG4gICAgICBzZXQgdGFiKHRhYikge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgndGFiJywgYCR7dGFifWApO1xuICAgICAgfVxuXG4gICAgICBnZXQgcGFydGl0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3BhcnRpdGlvbicpO1xuICAgICAgfVxuXG4gICAgICBzZXQgcGFydGl0aW9uKHBhcnRpdGlvbikge1xuICAgICAgICBpZiAocGFydGl0aW9uKSB7XG4gICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3BhcnRpdGlvbicsIHBhcnRpdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ3BhcnRpdGlvbicpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgICAgICByZXR1cm4gWydpZCcsICd0YWInLCAncGFydGl0aW9uJ107XG4gICAgICB9XG5cbiAgICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMudXBkYXRlSWQpIHJldHVybjtcbiAgICAgICAgdGhpcy51cGRhdGVJZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZUNhbGxiYWNrLmJpbmQodGhpcykpO1xuICAgICAgfVxuXG4gICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTsgLy8gVE9ETzogZXZlbnQgZGVsZWdhdGlvblxuXG4gICAgICAgIHRoaXMudXBkYXRlSWQgPSB2b2lkIDA7XG4gICAgICAgIHRoaXMuYmFkZ2UgPSB2b2lkIDA7XG4gICAgICAgIHRoaXMucGVuZGluZ0ljb24gPSB2b2lkIDA7XG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCB0aGlzLm9uQ29udGV4dE1lbnUuYmluZCh0aGlzKSk7XG4gICAgICB9XG5cbiAgICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICBpZiAodGhpcy5pc0Nvbm5lY3RlZCkge1xuICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgIGlmICh0aGlzLnVwZGF0ZUlkKSB7XG4gICAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGVJZCk7XG4gICAgICAgICAgdGhpcy51cGRhdGVJZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnBlbmRpbmdJY29uKSB7XG4gICAgICAgICAgdGhpcy5wZW5kaW5nSWNvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2soKSB7XG4gICAgICAgIGlmICh0aGlzLmlzQ29ubmVjdGVkKSB7XG4gICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBhY3RpdmF0ZShldmVudCkge1xuICAgICAgICBjb25zdCByZWN0ID0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgd2luZG93LmJyb3dzZXJBY3Rpb24uYWN0aXZhdGUodGhpcy5wYXJ0aXRpb24gfHwgREVGQVVMVF9QQVJUSVRJT04sIHtcbiAgICAgICAgICBldmVudFR5cGU6IGV2ZW50LnR5cGUsXG4gICAgICAgICAgZXh0ZW5zaW9uSWQ6IHRoaXMuaWQsXG4gICAgICAgICAgdGFiSWQ6IHRoaXMudGFiLFxuICAgICAgICAgIGFuY2hvclJlY3Q6IHtcbiAgICAgICAgICAgIHg6IHJlY3QubGVmdCxcbiAgICAgICAgICAgIHk6IHJlY3QudG9wLFxuICAgICAgICAgICAgd2lkdGg6IHJlY3Qud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IHJlY3QuaGVpZ2h0XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgb25DbGljayhldmVudCkge1xuICAgICAgICB0aGlzLmFjdGl2YXRlKGV2ZW50KTtcbiAgICAgIH1cblxuICAgICAgb25Db250ZXh0TWVudShldmVudCkge1xuICAgICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5hY3RpdmF0ZShldmVudCk7XG4gICAgICB9XG5cbiAgICAgIGdldEJhZGdlKCkge1xuICAgICAgICBsZXQge1xuICAgICAgICAgIGJhZGdlXG4gICAgICAgIH0gPSB0aGlzO1xuXG4gICAgICAgIGlmICghYmFkZ2UpIHtcbiAgICAgICAgICB0aGlzLmJhZGdlID0gYmFkZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICBiYWRnZS5jbGFzc05hbWUgPSAnYmFkZ2UnO1xuICAgICAgICAgIGJhZGdlLnBhcnQgPSAnYmFkZ2UnO1xuICAgICAgICAgIHRoaXMuYXBwZW5kQ2hpbGQoYmFkZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGJhZGdlO1xuICAgICAgfVxuXG4gICAgICB1cGRhdGVJY29uKGluZm8pIHtcbiAgICAgICAgY29uc3QgaWNvblNpemUgPSAzMjtcbiAgICAgICAgY29uc3QgcmVzaXplVHlwZSA9IDI7XG4gICAgICAgIGNvbnN0IHRpbWVQYXJhbSA9IGluZm8uaWNvbk1vZGlmaWVkID8gYCZ0PSR7aW5mby5pY29uTW9kaWZpZWR9YCA6ICcnO1xuICAgICAgICBjb25zdCBpY29uVXJsID0gYGNyeDovL2V4dGVuc2lvbi1pY29uLyR7dGhpcy5pZH0vJHtpY29uU2l6ZX0vJHtyZXNpemVUeXBlfT90YWJJZD0ke3RoaXMudGFifSR7dGltZVBhcmFtfWA7XG4gICAgICAgIGNvbnN0IGJnSW1hZ2UgPSBgdXJsKCR7aWNvblVybH0pYDtcblxuICAgICAgICBpZiAodGhpcy5wZW5kaW5nSWNvbikge1xuICAgICAgICAgIHRoaXMucGVuZGluZ0ljb24gPSB1bmRlZmluZWQ7XG4gICAgICAgIH0gLy8gUHJlbG9hZCBpY29uIHRvIHByZXZlbnQgaXQgZnJvbSBibGlua2luZ1xuXG5cbiAgICAgICAgY29uc3QgaW1nID0gdGhpcy5wZW5kaW5nSWNvbiA9IG5ldyBJbWFnZSgpO1xuXG4gICAgICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuaXNDb25uZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYmdJbWFnZTtcbiAgICAgICAgICAgIHRoaXMucGVuZGluZ0ljb24gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGltZy5zcmMgPSBpY29uVXJsO1xuICAgICAgfVxuXG4gICAgICB1cGRhdGVDYWxsYmFjaygpIHtcbiAgICAgICAgdGhpcy51cGRhdGVJZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3QgYWN0aW9uID0gd2luZG93LmJyb3dzZXJBY3Rpb24uZ2V0QWN0aW9uKHRoaXMuaWQpO1xuICAgICAgICBjb25zdCBhY3RpdmVUYWJJZCA9IHRoaXMudGFiO1xuICAgICAgICBjb25zdCB0YWJJbmZvID0gYWN0aXZlVGFiSWQgPiAtMSA/IGFjdGlvbi50YWJzW2FjdGl2ZVRhYklkXSA6IHt9O1xuICAgICAgICBjb25zdCBpbmZvID0geyAuLi50YWJJbmZvLFxuICAgICAgICAgIC4uLmFjdGlvblxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRpdGxlID0gdHlwZW9mIGluZm8udGl0bGUgPT09ICdzdHJpbmcnID8gaW5mby50aXRsZSA6ICcnO1xuICAgICAgICB0aGlzLnVwZGF0ZUljb24oaW5mbyk7XG5cbiAgICAgICAgaWYgKGluZm8udGV4dCkge1xuICAgICAgICAgIGNvbnN0IGJhZGdlID0gdGhpcy5nZXRCYWRnZSgpO1xuICAgICAgICAgIGJhZGdlLnRleHRDb250ZW50ID0gaW5mby50ZXh0O1xuICAgICAgICAgIGJhZGdlLnN0eWxlLmNvbG9yID0gJyNmZmYnOyAvLyBUT0RPOiBkZXRlcm1pbmUgYmcgbGlnaHRuZXNzP1xuXG4gICAgICAgICAgYmFkZ2Uuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gaW5mby5jb2xvcjtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmJhZGdlKSB7XG4gICAgICAgICAgdGhpcy5iYWRnZS5yZW1vdmUoKTtcbiAgICAgICAgICB0aGlzLmJhZGdlID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICAhY3VzdG9tRWxlbWVudHMuZ2V0KCdicm93c2VyLWFjdGlvbicpICYmIGN1c3RvbUVsZW1lbnRzLmRlZmluZSgnYnJvd3Nlci1hY3Rpb24nLCBCcm93c2VyQWN0aW9uRWxlbWVudCwge1xuICAgICAgZXh0ZW5kczogJ2J1dHRvbidcbiAgICB9KTtcblxuICAgIGNsYXNzIEJyb3dzZXJBY3Rpb25MaXN0RWxlbWVudCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgICAgIGdldCB0YWIoKSB7XG4gICAgICAgIGNvbnN0IHRhYklkID0gcGFyc2VJbnQodGhpcy5nZXRBdHRyaWJ1dGUoJ3RhYicpIHx8ICcnLCAxMCk7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdGFiSWQgPT09ICdudW1iZXInICYmICFpc05hTih0YWJJZCkgPyB0YWJJZCA6IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHNldCB0YWIodGFiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGFiID09PSAnbnVtYmVyJykge1xuICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCd0YWInLCBgJHt0YWJ9YCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ3RhYicpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGdldCBwYXJ0aXRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgncGFydGl0aW9uJyk7XG4gICAgICB9XG5cbiAgICAgIHNldCBwYXJ0aXRpb24ocGFydGl0aW9uKSB7XG4gICAgICAgIGlmIChwYXJ0aXRpb24pIHtcbiAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgncGFydGl0aW9uJywgcGFydGl0aW9uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgncGFydGl0aW9uJyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgICAgIHJldHVybiBbJ3RhYicsICdwYXJ0aXRpb24nXTtcbiAgICAgIH1cblxuICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMub2JzZXJ2aW5nID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5mZXRjaFN0YXRlID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCB3aW5kb3cuYnJvd3NlckFjdGlvbi5nZXRTdGF0ZSh0aGlzLnBhcnRpdGlvbiB8fCBERUZBVUxUX1BBUlRJVElPTik7XG4gICAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBicm93c2VyLWFjdGlvbi1saXN0IGZhaWxlZCB0byB1cGRhdGUgW3RhYjogJHt0aGlzLnRhYn0sIHBhcnRpdGlvbjogJyR7dGhpcy5wYXJ0aXRpb259J11gKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy51cGRhdGUgPSBzdGF0ZSA9PiB7XG4gICAgICAgICAgY29uc3QgdGFiSWQgPSB0eXBlb2YgdGhpcy50YWIgPT09ICdudW1iZXInICYmIHRoaXMudGFiID49IDAgPyB0aGlzLnRhYiA6IHN0YXRlLmFjdGl2ZVRhYklkIHx8IC0xO1xuICAgICAgICAgIHN0YXRlLmFjdGlvbnMuZm9yRWFjaChhY3Rpb24gPT4ge1xuICAgICAgICAgICAgdmFyIF90aGlzJHNoYWRvd1Jvb3Q7XG5cbiAgICAgICAgICAgIGxldCBicm93c2VyQWN0aW9uTm9kZSA9IChfdGhpcyRzaGFkb3dSb290ID0gdGhpcy5zaGFkb3dSb290KSA9PT0gbnVsbCB8fCBfdGhpcyRzaGFkb3dSb290ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfdGhpcyRzaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoYFtpZD0ke2FjdGlvbi5pZH1dYCk7XG5cbiAgICAgICAgICAgIGlmICghYnJvd3NlckFjdGlvbk5vZGUpIHtcbiAgICAgICAgICAgICAgdmFyIF90aGlzJHNoYWRvd1Jvb3QyO1xuXG4gICAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nLCB7XG4gICAgICAgICAgICAgICAgaXM6ICdicm93c2VyLWFjdGlvbidcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIG5vZGUuaWQgPSBhY3Rpb24uaWQ7XG4gICAgICAgICAgICAgIG5vZGUuY2xhc3NOYW1lID0gJ2FjdGlvbic7XG4gICAgICAgICAgICAgIG5vZGUucGFydCA9ICdhY3Rpb24nO1xuICAgICAgICAgICAgICBicm93c2VyQWN0aW9uTm9kZSA9IG5vZGU7XG4gICAgICAgICAgICAgIChfdGhpcyRzaGFkb3dSb290MiA9IHRoaXMuc2hhZG93Um9vdCkgPT09IG51bGwgfHwgX3RoaXMkc2hhZG93Um9vdDIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF90aGlzJHNoYWRvd1Jvb3QyLmFwcGVuZENoaWxkKGJyb3dzZXJBY3Rpb25Ob2RlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMucGFydGl0aW9uKSBicm93c2VyQWN0aW9uTm9kZS5wYXJ0aXRpb24gPSB0aGlzLnBhcnRpdGlvbjtcbiAgICAgICAgICAgIGJyb3dzZXJBY3Rpb25Ob2RlLnRhYiA9IHRhYklkO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHNoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7XG4gICAgICAgICAgbW9kZTogJ29wZW4nXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAgIHN0eWxlLnRleHRDb250ZW50ID0gYFxuOmhvc3Qge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBnYXA6IDVweDtcbn1cblxuLmFjdGlvbiB7XG4gIHdpZHRoOiAyOHB4O1xuICBoZWlnaHQ6IDI4cHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gIGJhY2tncm91bmQtc2l6ZTogNzAlO1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgcGFkZGluZzogMDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBvdXRsaW5lOiBub25lO1xufVxuXG4uYWN0aW9uOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYnJvd3Nlci1hY3Rpb24taG92ZXItYmcsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4zKSk7XG59XG5cbi5iYWRnZSB7XG4gIGJveC1zaGFkb3c6IDBweCAwcHggMXB4IDFweCB2YXIoLS1icm93c2VyLWFjdGlvbi1iYWRnZS1vdXRsaW5lLCAjNDQ0KTtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgbWF4LXdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEycHg7XG4gIHBhZGRpbmc6IDAgMnB4O1xuICBib3JkZXItcmFkaXVzOiAycHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiAxcHg7XG4gIHJpZ2h0OiAwO1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgbGluZS1oZWlnaHQ6IDEuNTtcbiAgZm9udC1zaXplOiA5cHg7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG59YDtcbiAgICAgICAgc2hhZG93Um9vdC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgICB9XG5cbiAgICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICBpZiAodGhpcy5pc0Nvbm5lY3RlZCkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0T2JzZXJ2aW5nKCk7XG4gICAgICAgICAgICB0aGlzLmZldGNoU3RhdGUoKTtcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY29ubmVjdGVkQ2FsbGJhY2snLCBlLCB0aGlzLCB0aGlzLnBhcnRpdGlvbiwgREVGQVVMVF9QQVJUSVRJT04pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgdGhpcy5zdG9wT2JzZXJ2aW5nKCk7XG4gICAgICB9XG5cbiAgICAgIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICAgICAgaWYgKG9sZFZhbHVlID09PSBuZXdWYWx1ZSkgcmV0dXJuO1xuXG4gICAgICAgIGlmICh0aGlzLmlzQ29ubmVjdGVkKSB7XG4gICAgICAgICAgdGhpcy5mZXRjaFN0YXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgc3RhcnRPYnNlcnZpbmcoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKHRoaXMub2JzZXJ2aW5nKSByZXR1cm47XG4gICAgICAgICAgd2luZG93LmJyb3dzZXJBY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcigndXBkYXRlJywgdGhpcy51cGRhdGUpO1xuICAgICAgICAgIHdpbmRvdy5icm93c2VyQWN0aW9uLmFkZE9ic2VydmVyKHRoaXMucGFydGl0aW9uIHx8IERFRkFVTFRfUEFSVElUSU9OKTtcbiAgICAgICAgICB0aGlzLm9ic2VydmluZyA9IHRydWU7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnc3RhcnRPYnNlcnZpbmcnLCBlLCB0aGlzLCB0aGlzLnBhcnRpdGlvbiwgREVGQVVMVF9QQVJUSVRJT04pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHN0b3BPYnNlcnZpbmcoKSB7XG4gICAgICAgIGlmICghdGhpcy5vYnNlcnZpbmcpIHJldHVybjtcbiAgICAgICAgd2luZG93LmJyb3dzZXJBY3Rpb24ucmVtb3ZlRXZlbnRMaXN0ZW5lcigndXBkYXRlJywgdGhpcy51cGRhdGUpO1xuICAgICAgICB3aW5kb3cuYnJvd3NlckFjdGlvbi5yZW1vdmVPYnNlcnZlcih0aGlzLnBhcnRpdGlvbiB8fCBERUZBVUxUX1BBUlRJVElPTik7XG4gICAgICAgIHRoaXMub2JzZXJ2aW5nID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICAhY3VzdG9tRWxlbWVudHMuZ2V0KCdicm93c2VyLWFjdGlvbi1saXN0JykgJiYgY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdicm93c2VyLWFjdGlvbi1saXN0JywgQnJvd3NlckFjdGlvbkxpc3RFbGVtZW50KTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgZWxlY3Ryb25fX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXy5jb250ZXh0QnJpZGdlLmV4cG9zZUluTWFpbldvcmxkKCdicm93c2VyQWN0aW9uJywgYnJvd3NlckFjdGlvbik7IC8vIE11c3QgZXhlY3V0ZSBzY3JpcHQgaW4gbWFpbiB3b3JsZCB0byBtb2RpZnkgY3VzdG9tIGNvbXBvbmVudCByZWdpc3RyeS5cblxuICAgIGVsZWN0cm9uX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18ud2ViRnJhbWUuZXhlY3V0ZUphdmFTY3JpcHQoYCgke21haW5Xb3JsZFNjcmlwdH0oKSk7YCk7XG4gIH0gY2F0Y2gge1xuICAgIC8vIFdoZW4gY29udGV4dElzb2xhdGlvbiBpcyBkaXNhYmxlZCwgY29udGV4dEJyaWRnZSB3aWxsIHRocm93IGFuIGVycm9yLlxuICAgIC8vIElmIHRoYXQncyB0aGUgY2FzZSwgd2UncmUgaW4gdGhlIG1haW4gd29ybGQgc28gd2UgY2FuIGp1c3QgZXhlY3V0ZSBvdXJcbiAgICAvLyBmdW5jdGlvbi5cbiAgICBtYWluV29ybGRTY3JpcHQoKTtcbiAgfVxufTtcbn0pKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX2V4cG9ydHNfXztcbi8qKioqKiovIH0pKClcbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJyb3dzZXItYWN0aW9uLmpzLm1hcCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVsZWN0cm9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV2ZW50c1wiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tbXVsdGktYXNzaWduICovXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLWV4cHJlc3Npb25zICovXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXG4vKiBlc2xpbnQtZGlzYWJsZSBtYXgtY2xhc3Nlcy1wZXItZmlsZSAqL1xuaW1wb3J0IHsgY29udGV4dEJyaWRnZSwgaXBjUmVuZGVyZXIsIElwY1JlbmRlcmVyRXZlbnQgfSBmcm9tICdlbGVjdHJvbic7XG5pbXBvcnQgeyBpbmplY3RCcm93c2VyQWN0aW9uIH0gZnJvbSAnZWxlY3Ryb24tY2hyb21lLWV4dGVuc2lvbnMtcHJvZHVjdGlvbi9kaXN0L2Jyb3dzZXItYWN0aW9uJztcblxuaW1wb3J0IHsgRXZlbnRQYXJhbXMgfSBmcm9tICd0eXBlcy9hbmFseXRpY3MnO1xuaW1wb3J0IHtcbiAgSXBjSW5zcGVjdEVsZW1lbnQsXG4gIElwY1JlbmFtZVRhYixcbiAgSXBjU2hvd1RhYkNvbnRleHRNZW51LFxufSBmcm9tICd0eXBlcy9pcGMnO1xuXG5pbmplY3RCcm93c2VyQWN0aW9uKCk7XG5cbmNvbnRleHRCcmlkZ2UuZXhwb3NlSW5NYWluV29ybGQoJ3RpdGxlQmFyJywge1xuICBhcHA6IHtcbiAgICBjbG9zZTogKCkgPT4ge1xuICAgICAgaXBjUmVuZGVyZXIuc2VuZCgnY2xvc2UtYXBwJyk7XG4gICAgfSxcbiAgICBtaW5pbWl6ZTogKCkgPT4ge1xuICAgICAgaXBjUmVuZGVyZXIuc2VuZCgnbWluaW1pemUtYXBwJyk7XG4gICAgfSxcbiAgICBtYXhpbWl6ZTogKCkgPT4ge1xuICAgICAgaXBjUmVuZGVyZXIuc2VuZCgnbWF4aW1pemUtYXBwJyk7XG4gICAgfSxcbiAgICBzaG93TWVudTogKCkgPT4ge1xuICAgICAgaXBjUmVuZGVyZXIuc2VuZCgnc2hvdy1hcHAtbWVudScpO1xuICAgIH0sXG4gICAgc2hvd0Rvd25sb2Fkc1ByZXZpZXc6ICgpID0+IHtcbiAgICAgIGlwY1JlbmRlcmVyLnNlbmQoJ3Nob3ctZG93bmxvYWRzLXByZXZpZXcnKTtcbiAgICB9LFxuICAgIHNob3dUYWJDb250ZXh0TWVudTogKHBhcmFtczogSXBjU2hvd1RhYkNvbnRleHRNZW51KSA9PiB7XG4gICAgICBpcGNSZW5kZXJlci5zZW5kKCdzaG93LXRhYi1jb250ZXh0LW1lbnUnLCBwYXJhbXMpO1xuICAgIH0sXG4gICAgaXNNYXhpbWl6ZWQ6ICgpID0+IHtcbiAgICAgIHJldHVybiBpcGNSZW5kZXJlci5pbnZva2UoJ2lzLWFwcC1tYXhpbWl6ZWQnKTtcbiAgICB9LFxuICB9LFxuICBhbmFseXRpY3M6IHtcbiAgICBldmVudDogKGV2ZW50TmFtZTogc3RyaW5nLCBwYXJhbXM6IEV2ZW50UGFyYW1zKSA9PiB7XG4gICAgICBpcGNSZW5kZXJlci5zZW5kKCdhbmFseXRpY3MnLCB7IGV2ZW50TmFtZSwgcGFyYW1zIH0pO1xuICAgIH0sXG4gIH0sXG4gIHRvb2xzOiB7XG4gICAgaW5zcGVjdEVsZW1lbnQ6IChwb2ludDogSXBjSW5zcGVjdEVsZW1lbnQpID0+IHtcbiAgICAgIGlwY1JlbmRlcmVyLnNlbmQoJ2luc3BlY3RFbGVtZW50JywgcG9pbnQpO1xuICAgIH0sXG4gIH0sXG4gIHRhYnM6IHtcbiAgICBzZWxlY3Q6ICh0YWJJZDogc3RyaW5nKSA9PiB7XG4gICAgICBpcGNSZW5kZXJlci5zZW5kKCd0YWItc2VsZWN0JywgeyB0YWJJZCB9KTtcbiAgICB9LFxuICAgIHB1cmdlOiAodGFiSWQ6IHN0cmluZykgPT4ge1xuICAgICAgaXBjUmVuZGVyZXIuc2VuZCgndGFiLXB1cmdlJywgeyB0YWJJZCB9KTtcbiAgICB9LFxuICAgIHNhdmU6ICh0YWJJZDogc3RyaW5nKSA9PiB7XG4gICAgICBpcGNSZW5kZXJlci5zZW5kKCdzYXZlLXRhYicsIHsgdGFiSWQgfSk7XG4gICAgfSxcbiAgICByZW5hbWU6IChhcmdzOiBJcGNSZW5hbWVUYWIpID0+IHtcbiAgICAgIGlwY1JlbmRlcmVyLnNlbmQoJ3JlbmFtZS10YWInLCBhcmdzKTtcbiAgICB9LFxuICB9LFxuICBsaXN0ZW5lcjoge1xuICAgIG9wZW5UYWI6IChhY3Rpb246IChldmVudDogSXBjUmVuZGVyZXJFdmVudCwgLi4uYXJnczogYW55W10pID0+IHZvaWQpID0+IHtcbiAgICAgIGlwY1JlbmRlcmVyLm9uKCdvcGVuLXRhYicsIGFjdGlvbik7XG4gICAgfSxcbiAgICByZW5hbWVUYWI6IChhY3Rpb246IChldmVudDogSXBjUmVuZGVyZXJFdmVudCwgLi4uYXJnczogYW55W10pID0+IHZvaWQpID0+IHtcbiAgICAgIGlwY1JlbmRlcmVyLm9uKCdyZW5hbWUtdGFiJywgYWN0aW9uKTtcbiAgICB9LFxuICAgIGNsb3NlVGFiOiAoYWN0aW9uOiAoZXZlbnQ6IElwY1JlbmRlcmVyRXZlbnQsIC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkKSA9PiB7XG4gICAgICBpcGNSZW5kZXJlci5vbignY2xvc2UtdGFiJywgYWN0aW9uKTtcbiAgICB9LFxuICAgIHNhdmVCb2FyZDogKGFjdGlvbjogKGV2ZW50OiBJcGNSZW5kZXJlckV2ZW50LCAuLi5hcmdzOiBhbnlbXSkgPT4gdm9pZCkgPT4ge1xuICAgICAgaXBjUmVuZGVyZXIub24oJ3NhdmUtYm9hcmQnLCBhY3Rpb24pO1xuICAgIH0sXG4gICAgY2xvc2VBY3RpdmVUYWI6IChcbiAgICAgIGFjdGlvbjogKGV2ZW50OiBJcGNSZW5kZXJlckV2ZW50LCAuLi5hcmdzOiBhbnlbXSkgPT4gdm9pZFxuICAgICkgPT4ge1xuICAgICAgaXBjUmVuZGVyZXIub24oJ2Nsb3NlLWFjdGl2ZS10YWInLCBhY3Rpb24pO1xuICAgIH0sXG4gICAgc2VsZWN0TmV4dEJvYXJkOiAoXG4gICAgICBhY3Rpb246IChldmVudDogSXBjUmVuZGVyZXJFdmVudCwgLi4uYXJnczogYW55W10pID0+IHZvaWRcbiAgICApID0+IHtcbiAgICAgIGlwY1JlbmRlcmVyLm9uKCdzZWxlY3QtbmV4dC1ib2FyZCcsIGFjdGlvbik7XG4gICAgfSxcbiAgICBzZXRXaW5kb3dzQ291bnQ6IChcbiAgICAgIGFjdGlvbjogKGV2ZW50OiBJcGNSZW5kZXJlckV2ZW50LCAuLi5hcmdzOiBhbnlbXSkgPT4gdm9pZFxuICAgICkgPT4ge1xuICAgICAgaXBjUmVuZGVyZXIub24oJ3NldC13aW5kb3dzLWNvdW50JywgYWN0aW9uKTtcbiAgICB9LFxuICAgIGNsb3NlQWxsVGFiOiAoXG4gICAgICBhY3Rpb246IChldmVudDogSXBjUmVuZGVyZXJFdmVudCwgLi4uYXJnczogYW55W10pID0+IHZvaWRcbiAgICApID0+IHtcbiAgICAgIGlwY1JlbmRlcmVyLm9uKCdjbG9zZS1hbGwtdGFiJywgYWN0aW9uKTtcbiAgICB9LFxuICAgIGNsb3NlT3RoZXJzVGFiOiAoXG4gICAgICBhY3Rpb246IChldmVudDogSXBjUmVuZGVyZXJFdmVudCwgLi4uYXJnczogYW55W10pID0+IHZvaWRcbiAgICApID0+IHtcbiAgICAgIGlwY1JlbmRlcmVyLm9uKCdjbG9zZS1vdGhlcnMtdGFiJywgYWN0aW9uKTtcbiAgICB9LFxuICAgIGRvd25sb2FkU3RhdGU6IChcbiAgICAgIGFjdGlvbjogKGV2ZW50OiBJcGNSZW5kZXJlckV2ZW50LCAuLi5hcmdzOiBhbnlbXSkgPT4gdm9pZFxuICAgICkgPT4ge1xuICAgICAgaXBjUmVuZGVyZXIub24oJ2Rvd25sb2FkLXN0YXRlJywgYWN0aW9uKTtcbiAgICB9LFxuICAgIHJlbW92ZUV4dGVuc2lvbjogKFxuICAgICAgYWN0aW9uOiAoZXZlbnQ6IElwY1JlbmRlcmVyRXZlbnQsIC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkXG4gICAgKSA9PiB7XG4gICAgICBpcGNSZW5kZXJlci5vbigncmVtb3ZlLWV4dGVuc2lvbicsIGFjdGlvbik7XG4gICAgfSxcbiAgICBoaWRlRG93bmxvYWRzUHJldmlldzogKFxuICAgICAgYWN0aW9uOiAoZXZlbnQ6IElwY1JlbmRlcmVyRXZlbnQsIC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkXG4gICAgKSA9PiB7XG4gICAgICBpcGNSZW5kZXJlci5vbignaGlkZS1kb3dubG9hZHMtcHJldmlldycsIGFjdGlvbik7XG4gICAgfSxcbiAgICBhcHBDbGlja2VkOiAoXG4gICAgICBhY3Rpb246IChldmVudDogSXBjUmVuZGVyZXJFdmVudCwgLi4uYXJnczogdW5rbm93bltdKSA9PiB2b2lkXG4gICAgKSA9PiB7XG4gICAgICBpcGNSZW5kZXJlci5vbignYXBwLWNsaWNrZWQnLCBhY3Rpb24pO1xuICAgIH0sXG4gIH0sXG4gIG9mZjoge1xuICAgIG9wZW5UYWI6ICgpID0+IHtcbiAgICAgIGlwY1JlbmRlcmVyLnJlbW92ZUFsbExpc3RlbmVycygnb3Blbi10YWInKTtcbiAgICB9LFxuICAgIHJlbmFtZVRhYjogKCkgPT4ge1xuICAgICAgaXBjUmVuZGVyZXIucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW5hbWUtdGFiJyk7XG4gICAgfSxcbiAgICBjbG9zZVRhYjogKCkgPT4ge1xuICAgICAgaXBjUmVuZGVyZXIucmVtb3ZlQWxsTGlzdGVuZXJzKCdjbG9zZS10YWInKTtcbiAgICB9LFxuICAgIHNhdmVCb2FyZDogKCkgPT4ge1xuICAgICAgaXBjUmVuZGVyZXIucmVtb3ZlQWxsTGlzdGVuZXJzKCdzYXZlLWJvYXJkJyk7XG4gICAgfSxcbiAgICBjbG9zZUFjdGl2ZVRhYjogKCkgPT4ge1xuICAgICAgaXBjUmVuZGVyZXIucmVtb3ZlQWxsTGlzdGVuZXJzKCdjbG9zZS1hY3RpdmUtdGFiJyk7XG4gICAgfSxcbiAgICBzZWxlY3ROZXh0Qm9hcmQ6ICgpID0+IHtcbiAgICAgIGlwY1JlbmRlcmVyLnJlbW92ZUFsbExpc3RlbmVycygnc2VsZWN0LW5leHQtYm9hcmQnKTtcbiAgICB9LFxuICAgIHNldFdpbmRvd3NDb3VudDogKCkgPT4ge1xuICAgICAgaXBjUmVuZGVyZXIucmVtb3ZlQWxsTGlzdGVuZXJzKCdzZXQtd2luZG93cy1jb3VudCcpO1xuICAgIH0sXG4gICAgY2xvc2VBbGxUYWI6ICgpID0+IHtcbiAgICAgIGlwY1JlbmRlcmVyLnJlbW92ZUFsbExpc3RlbmVycygnY2xvc2UtYWxsLXRhYicpO1xuICAgIH0sXG4gICAgY2xvc2VPdGhlcnNUYWI6ICgpID0+IHtcbiAgICAgIGlwY1JlbmRlcmVyLnJlbW92ZUFsbExpc3RlbmVycygnY2xvc2Utb3RoZXJzLXRhYicpO1xuICAgIH0sXG4gICAgZG93bmxvYWRTdGF0ZTogKCkgPT4ge1xuICAgICAgaXBjUmVuZGVyZXIucmVtb3ZlQWxsTGlzdGVuZXJzKCdkb3dubG9hZC1zdGF0ZScpO1xuICAgIH0sXG4gICAgcmVtb3ZlRXh0ZW5zaW9uOiAoKSA9PiB7XG4gICAgICBpcGNSZW5kZXJlci5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZS1leHRlbnNpb24nKTtcbiAgICB9LFxuICAgIGhpZGVEb3dubG9hZHNQcmV2aWV3OiAoKSA9PiB7XG4gICAgICBpcGNSZW5kZXJlci5yZW1vdmVBbGxMaXN0ZW5lcnMoJ2hpZGUtZG93bmxvYWRzLXByZXZpZXcnKTtcbiAgICB9LFxuICAgIGFwcENsaWNrZWQ6ICgpID0+IHtcbiAgICAgIGlwY1JlbmRlcmVyLnJlbW92ZUFsbExpc3RlbmVycygnYXBwLWNsaWNrZWQnKTtcbiAgICB9LFxuICB9LFxuICBzY3JlZW5zOiB7XG4gICAgbGlicmFyeTogKCkgPT4ge1xuICAgICAgaXBjUmVuZGVyZXIuc2VuZCgnc2hvdy1saWJyYXJ5Jyk7XG4gICAgfSxcbiAgICBzZXR0aW5nczogKCkgPT4ge1xuICAgICAgaXBjUmVuZGVyZXIuc2VuZCgnc2hvdy1zZXR0aW5ncycpO1xuICAgIH0sXG4gIH0sXG4gIG9zOiB7XG4gICAgZ2V0UGxhdGZvcm06ICgpID0+IHByb2Nlc3MucGxhdGZvcm0sXG4gIH0sXG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==