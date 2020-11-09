const util = require("util");

window.ipcRenderer = require("electron").ipcRenderer;
window.exec = require("child_process").exec;
window.executeCommand = util.promisify(require("child_process").exec);
