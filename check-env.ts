import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import schema from './src/config/validation.schema';

const envFile = process.argv[2] || '.env';

function loadEnvFile(filePath: string): Record<string, any> {
  const absolutePath = path.resolve(filePath);

  if (!fs.existsSync(absolutePath)) {
    console.error(`❌ Файл конфігурації "${filePath}" не знайдено.`);
    process.exit(1);
  }

  const env = dotenv.parse(fs.readFileSync(absolutePath));
  return env;
}

function validateEnv(env: Record<string, any>): void {
  const { error } = schema.validate(env, { abortEarly: false });

  if (error) {
    console.error('❌ Помилки в .env файлі:');
    error.details.forEach((detail) => {
      console.error(` - ${detail.message}`);
    });
    process.exit(1);
  }

  console.log(`✅ Конфігурація ${envFile} валідна.`);
}

const env = loadEnvFile(envFile);
validateEnv(env);
