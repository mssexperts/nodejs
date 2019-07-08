const winston = require('winston');

const logger = new winston.Logger({
  transports: [
    new (winston.transports.File)({
      filename: 'logs/application.log',
      level: 'error',
      timestamp: () => (Date.now()),
      formatter: ({
        meta,
        message,
        level,
        timestamp,
      }) => {
        const { correlationId, detail } = meta;

        return JSON.stringify({
          application: { name: 'CorePlatform.TemplateEngine', type: '', appSpecificLogs: { sessionId: '' } },
          timestamp: timestamp(),
          correlationId,
          log: { type: level, message, detail },
          requestContext: {
            // TODO
            tokenType: '', requestPath: '', host: '', parameters: '', cookies: '', claims: '',
          },
        });
      },
      json: false,
    }),
  ],
});

module.exports = logger;
