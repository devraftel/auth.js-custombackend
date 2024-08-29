declare namespace NodeJS {
  interface ProcessEnv {
    AUTH_SECRET: string;

    SESSION_PASSWORD: string;

    SERVICE_AUTH_URL: string;
  }
}
