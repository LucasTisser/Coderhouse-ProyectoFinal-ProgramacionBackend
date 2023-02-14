import log4js from "log4js";

log4js.configure({
  appenders: {
    terminal: { type: "console" },
    warnFile: { type: "file", filename: "./log/warn.log" },
    errorFile: { type: "file", filename: "./log/error.log" },
    loggerInfo: { type: "logLevelFilter", appender: "terminal", level: "info" },
    loggerWarn: {
      type: "logLevelFilter",
      appender: "warnFile",
      level: "warn",
      maxLevel: "warn",
    },
    loggerError: {
      type: "logLevelFilter",
      appender: "errorFile",
      level: "error",
      maxLevel: "error",
    },
  },
  categories: {
    default: { appenders: ["terminal"], level: "all" },
    prod: {
      appenders: ["terminal", "loggerWarn", "loggerError"],
      level: "info",
    },
  },
});

let logger = null;

logger = log4js.getLogger("prod");

export default logger;
