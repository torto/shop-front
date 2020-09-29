/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    API_URL: string;
    REPOSITORIES_PATH: string;
  }
}