import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import * as fs from 'fs';

export interface EnvConfig {
  [key: string]: any;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  /* 
    add property in .env
   */

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string().valid(['dev']).default('dev'),
      DB_HOST: Joi.string().required(),
      DB_PORT: Joi.number(),
      DB_USERNAME: Joi.string().required(),
      DB_PASSWORD: Joi.string().empty('').default(''),
      DB_DATABASE: Joi.string().required(),
      MIGRATION_RUN: Joi.bool().default(true),
      SYNCHRONIZE: Joi.bool().default(true),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    } else {
      return validatedEnvConfig;
    }
  }

  get DB_HOST(): string {
    return this.envConfig.DB_HOST;
  }

  get DB_PORT(): number {
    return Number(this.envConfig.DB_PORT);
  }

  get DB_USERNAME(): string {
    return this.envConfig.DB_USERNAME;
  }

  get DB_PASSWORD(): string {
    return this.envConfig.DB_PASSWORD;
  }

  get DB_DATABASE(): string {
    return this.envConfig.DB_DATABASE;
  }

  get MIGRATION_RUN(): boolean {
    return this.envConfig.MIGRATION_RUN;
  }

  get SYNCHRONIZE(): boolean {
    return this.envConfig.SYNCHRONIZE;
  }
}
