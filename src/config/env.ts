import dotenv from 'dotenv';
dotenv.config();

export const env = {
    BASE_URL: `${process.env.BASE_URL}:${process.env.APP_PORT}`,
    APP_PORT: process.env.APP_PORT,
    LINE_ACCESS_TOKEN: process.env.LINE_ACCESS_TOKEN,
    LINE_CHANNEL_SECRET: process.env.LINE_CHANNEL_SECRET
}