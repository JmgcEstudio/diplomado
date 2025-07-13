import app from './app.js';
import logger from './logs/logger.js';
import 'dotenv/config';
import config  from './config/env.js';
import { sequelize } from './database/database.js';

async function main() {

  await sequelize.sync({force:false});
    const port=config.PORT;
    app.listen(port);
    logger.info('  Servidor iniciado en el puerto : '+ port);
    logger.error(' Este es un mensaje de error');
    logger.warn('  Este es un mensaje de advertencia');
    logger.fatal(' Este es un mensaje fatal');
}

main();