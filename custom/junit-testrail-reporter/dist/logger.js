"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const chalk = require("chalk");
exports.logger = {
    error: (...optionalParams) => {
        console.error(chalk.red(`[junit-testrail-reporter] `, ...optionalParams));
    },
    info: (...optionalParams) => {
        console.log(chalk.blue(`[junit-testrail-reporter] `, ...optionalParams));
    },
    success: (...optionalParams) => {
        console.log(chalk.green(`[junit-testrail-reporter] `, ...optionalParams));
    },
    warning: (...optionalParams) => {
        console.warn(chalk.yellow(`[junit-testrail-reporter] `, ...optionalParams));
    },
};
