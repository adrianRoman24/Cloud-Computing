const simpleLog = (toLog, color, messages) => {
    let fullMessage = "";
    for (let i = 0; i < messages.length; i += 1) {
        const message = messages[i];
        if (typeof message === "object") {
        fullMessage = `${fullMessage}${JSON.stringify(message)}`;
        } else {
        fullMessage =  `${fullMessage}${message}`;
        }
    }
    console.log(color, `${toLog} ${fullMessage}`);
}

const logger = {
    log: (...messages) => {
        let toLog = `[LOG] [${new Date().toISOString()}]`;
        simpleLog(toLog, "\x1b[34m", messages);
    },
    info: (...messages) => {
        let toLog = `[INFO] [${new Date().toISOString()}]`;
        simpleLog(toLog, "\x1b[32m", messages);
    },
    warn: (...messages) => {
        let toLog = `[WARN] [${new Date().toISOString()}]`;
        simpleLog(toLog, "\x1b[33m", messages);
    },
    error: (...messages) => {
        let toLog = `[ERROR] [${new Date().toISOString()}]`;
        simpleLog(toLog, "\x1b[31m", messages);
    },
}

const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports.logger = logger;
module.exports.sleep = sleep;