import winston from 'winston';
import ip from 'ip';
import LogInfo from './LogInfo';

export function writeApiLog(url, res) {
  const logInfo = new LogInfo();
  logInfo.functionName = url;
  logInfo.request = res.config.data;
  logInfo.response = res.data;
  logInfo.userIp = ip.address();
  logInfo.userAgent = res.config.userAgent;

  return logInfo;
}

export function writeGraphQLLog(functionName, args, req, res) {
  const logInfo = new LogInfo();
  logInfo.functionName = functionName;
  logInfo.request = args;
  logInfo.response = res.result;
  logInfo.userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  logInfo.userAgent = req.headers['user-agent'];
  return logInfo;
}

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      level: 'info',
    }),
    new (require('winston-daily-rotate-file'))({
      name: 'error',
      filename: './error.log',
      datePattern: 'yyyy-MM-dd.',
      level: 'error',
    }),
    new (require('winston-daily-rotate-file'))({
      name: 'info',
      filename: './info.log',
      datePattern: 'yyyy-MM-dd.',
      level: process.env.ENV === 'development' ? 'debug' : 'info',
    }),
  ],
});

export default logger;
