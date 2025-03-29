import  "express-async-errors"
import winston from"winston"
import 'winston-mongodb';

const logger = winston.createLogger({
        transports:[
            new winston.transports.MongoDB({
                db:"mongodb://localhost/p2p",
                metaKey : "meta",
                options: { useUnifiedTopology: true }
        })]
})

process.on('uncaughtException', (ex) => {
    logger.error('Uncaught Exception: ' + ex.message,{meta:ex});
});

process.on('unhandledRejection', (reason, promise) => {
      logger.error('Unhandled Rejection: ' + reason, { meta: reason });
      });

export default logger