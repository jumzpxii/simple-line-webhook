import {
    ClientConfig,
    messagingApi,
    MiddlewareConfig,
} from '@line/bot-sdk';
import { env } from '../config/env';

export const clientConfig: ClientConfig = {
    channelAccessToken: env.LINE_ACCESS_TOKEN || '',
};

export const middlewareConfig: MiddlewareConfig = {
    channelAccessToken: env.LINE_ACCESS_TOKEN,
    channelSecret: env.LINE_CHANNEL_SECRET || '',
};

export const blobClient = new messagingApi.MessagingApiBlobClient({
    channelAccessToken: `${env.LINE_ACCESS_TOKEN}`,
});

export const client = new messagingApi.MessagingApiClient(clientConfig);
