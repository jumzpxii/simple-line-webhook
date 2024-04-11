import { middleware, webhook } from '@line/bot-sdk';
import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import { env } from './config/env';
import path, { resolve } from 'path';
import { client, middlewareConfig } from './core/client'
import { handleAudio, handleImage, handleLocation, handleSticker, handleText, handleVideo, replyText } from './utils/MessageType';
import { GoldToday } from './utils/GoldApi';

const app: Application = express();
app.use('/static', express.static(path.join(__dirname, '/static')));
app.use('/downloaded', express.static(path.join(__dirname, '/downloaded')));
app.use(morgan('dev'))

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Express!');
});

app.post('/webhook', middleware(middlewareConfig), (req: Request, res: Response) => {
    if (req.body.destination) {
        console.log("Destination User ID: " + req.body.destination);
    }

    // req.body.events should be an array of events
    if (!Array.isArray(req.body.events)) {
        return res.status(500).end();
    }

    // handle events separately
    Promise.all(req.body.events.map(handleEvent))
        .then(() => res.end())
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
});

// callback function to handle a single event
function handleEvent(event: webhook.Event | any) {
    console.log('event :', event)
    if (event.replyToken && event.replyToken.match(/^(.)\1*$/)) {
        return console.log("Test hook recieved: " + JSON.stringify(event.message));
    }

    switch (event.type) {
        case 'message':
            const message = event.message;
            switch (message.type) {
                case 'text':
                    if (message.text === 'getid1') {
                        return client.replyMessage({
                            replyToken: event.replyToken,
                            messages: [{
                                type: 'text',
                                text: 'hello you',
                                quoteToken: event.message.quoteToken
                            }]
                        })
                    } else if (message.text === 'ราคาทอง') {
                        return GoldToday(event.replyToken)
                    } else {
                        return handleText(message, event.replyToken, event.source);
                    }
                case 'image':
                    return handleImage(message, event.replyToken);
                case 'video':
                    return handleVideo(message, event.replyToken);
                case 'audio':
                    return handleAudio(message, event.replyToken);
                case 'location':
                    return handleLocation(message, event.replyToken);
                case 'sticker':
                    return handleSticker(message, event.replyToken);
                default:
                    throw new Error(`Unknown message: ${JSON.stringify(message)}`);
            }

        case 'follow':
            return replyText(event.replyToken, 'Got followed event');

        case 'unfollow':
            return console.log(`Unfollowed this bot: ${JSON.stringify(event)}`);

        case 'join':
            return replyText(event.replyToken, `Joined ${event.source.type}`);

        case 'leave':
            return console.log(`Left: ${JSON.stringify(event)}`);

        case 'postback':
            let data = event.postback.data;
            if (data === 'DATE' || data === 'TIME' || data === 'DATETIME') {
                data += `(${JSON.stringify(event.postback.params)})`;
            }
            return replyText(event.replyToken, `Got postback: ${data}`);

        case 'beacon':
            return replyText(event.replyToken, `Got beacon: ${event.beacon.hwid}`);

        default:
            throw new Error(`Unknown event: ${JSON.stringify(event)}`);
    }
}

app.listen(env.APP_PORT, () => {
    console.log(`Server running at http://localhost:${env.APP_PORT}`);
});