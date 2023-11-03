// @ts-check

import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.colorize(),
        format.printf(opts => `${opts.level} ${opts.timestamp}: ${opts.message}`),
      ),
    }),
    new transports.File({
      dirname: 'logs',
      filename: 'error.log',
      level: 'error',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(opts => `${opts.level} ${opts.timestamp}: ${opts.message}`),
      ),
    }),
    new transports.File({
      dirname: 'logs',
      filename: 'full.log',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(opts => `${opts.level} ${opts.timestamp}: ${opts.message}`),
      ),
    }),
  ],
});

export {
  logger,
};
