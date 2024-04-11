import cp from 'child_process';
import path from "path";
import { blobClient, client } from "../core/client";
import { env } from "process";
import { pipeline } from 'stream';
import fs from 'fs'
import util from 'util'

// simple reply function
export const replyText = (token: string, texts: any) => {
    texts = Array.isArray(texts) ? texts : [texts];
    return client.replyMessage(
        {
            replyToken: token,
            messages: texts.map((text: any) => ({ type: 'text', text }))
        }
    );
};

export function handleText(message: object | any, replyToken: any, source: object | any) {
    const buttonsImageURL = `${env.BASE_URL}/static/buttons/1040.jpg`;

    switch (message.text) {
        case 'profile':
            if (source.userId) {
                return client.getProfile(source.userId)
                    .then((profile) => replyText(
                        replyToken,
                        [
                            `Display name: ${profile.displayName}`,
                            `Status message: ${profile.statusMessage}`,
                        ]
                    ));
            } else {
                return replyText(replyToken, 'Bot can\'t use profile API without user ID');
            }
        case 'buttons':
            return client.replyMessage(
                {
                    replyToken,
                    messages: [{
                        type: 'flex',
                        altText: 'ราคาทองนะจ้ะ',
                        contents: {
                            "type": "bubble",
                            "hero": {
                                "type": "image",
                                "url": "https://c.tenor.com/eoXNSS9OlVIAAAAd/tenor.gif",
                                "size": "full",
                                "aspectRatio": "20:13",
                                "aspectMode": "cover",
                                "action": {
                                    "type": "uri",
                                    "uri": "http://linecorp.com/"
                                }
                            },
                            "body": {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [
                                    {
                                        "type": "text",
                                        "text": "Brown Cafe",
                                        "weight": "bold",
                                        "size": "xl"
                                    },
                                    {
                                        "type": "box",
                                        "layout": "baseline",
                                        "margin": "md",
                                        "contents": [
                                            {
                                                "type": "icon",
                                                "size": "sm",
                                                "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                                            },
                                            {
                                                "type": "icon",
                                                "size": "sm",
                                                "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                                            },
                                            {
                                                "type": "icon",
                                                "size": "sm",
                                                "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                                            },
                                            {
                                                "type": "icon",
                                                "size": "sm",
                                                "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                                            },
                                            {
                                                "type": "icon",
                                                "size": "sm",
                                                "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png"
                                            },
                                            {
                                                "type": "text",
                                                "text": "4.0",
                                                "size": "sm",
                                                "color": "#999999",
                                                "margin": "md",
                                                "flex": 0
                                            }
                                        ]
                                    },
                                    {
                                        "type": "box",
                                        "layout": "vertical",
                                        "margin": "lg",
                                        "spacing": "sm",
                                        "contents": [
                                            {
                                                "type": "box",
                                                "layout": "baseline",
                                                "spacing": "sm",
                                                "contents": [
                                                    {
                                                        "type": "text",
                                                        "text": "ราคา",
                                                        "color": "#aaaaaa",
                                                        "size": "sm",
                                                        "flex": 2
                                                    },
                                                    {
                                                        "type": "text",
                                                        "text": "Miraina Tower, 4-1-6 Shinjuku, Tokyo",
                                                        "wrap": true,
                                                        "color": "#666666",
                                                        "size": "sm",
                                                        "flex": 5
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "box",
                                                "layout": "baseline",
                                                "spacing": "sm",
                                                "contents": [
                                                    {
                                                        "type": "text",
                                                        "text": "วัน/เวลา",
                                                        "color": "#aaaaaa",
                                                        "size": "sm",
                                                        "flex": 2
                                                    },
                                                    {
                                                        "type": "text",
                                                        "text": "10:00 - 23:00",
                                                        "wrap": true,
                                                        "color": "#666666",
                                                        "size": "sm",
                                                        "flex": 5
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            "footer": {
                                "type": "box",
                                "layout": "vertical",
                                "spacing": "sm",
                                "contents": [
                                    {
                                        "type": "button",
                                        "style": "link",
                                        "height": "sm",
                                        "action": {
                                            "type": "message",
                                            "label": "Reply Text",
                                            "text": "ราคาทองนะจ้ะ"
                                        }
                                    },
                                    {
                                        "type": "button",
                                        "style": "link",
                                        "height": "sm",
                                        "action": {
                                            "type": "uri",
                                            "label": "WEBSITE",
                                            "uri": "https://linecorp.com"
                                        }
                                    },
                                    {
                                        "type": "box",
                                        "layout": "vertical",
                                        "contents": [],
                                        "margin": "sm"
                                    }
                                ],
                                "flex": 0
                            }
                        }
                    }],
                }
            );
        case 'confirm':
            return client.replyMessage(
                {
                    replyToken,
                    messages: [{
                        type: 'template',
                        altText: 'Confirm alt text',
                        template: {
                            type: 'confirm',
                            text: 'Do it?',
                            actions: [
                                { label: 'Yes', type: 'message', text: 'XXXXXYes!' },
                                { label: 'No', type: 'message', text: 'No!' },
                            ],
                        },
                    }],
                }
            )
        case 'carousel':
            return client.replyMessage(
                {
                    replyToken,
                    messages: [{
                        type: 'template',
                        altText: 'Carousel alt text',
                        template: {
                            type: 'carousel',
                            columns: [
                                {
                                    thumbnailImageUrl: buttonsImageURL,
                                    title: 'hoge',
                                    text: 'fuga',
                                    actions: [
                                        { label: 'Go to line.me', type: 'uri', uri: 'https://line.me' },
                                        { label: 'Say hello1', type: 'postback', data: 'hello こんにちは' },
                                    ],
                                },
                                {
                                    thumbnailImageUrl: buttonsImageURL,
                                    title: 'hoge',
                                    text: 'fuga',
                                    actions: [
                                        { label: '言 hello2', type: 'postback', data: 'hello こんにちは', text: 'hello こんにちは' },
                                        { label: 'Say message', type: 'message', text: 'Rice=米' },
                                    ],
                                },
                            ],
                        },
                    }],
                }
            );
        case 'image carousel':
            return client.replyMessage(
                {
                    replyToken,
                    messages: [{
                        type: 'template',
                        altText: 'Image carousel alt text',
                        template: {
                            type: 'image_carousel',
                            columns: [
                                {
                                    imageUrl: buttonsImageURL,
                                    action: { label: 'Go to LINE', type: 'uri', uri: 'https://line.me' },
                                },
                                {
                                    imageUrl: buttonsImageURL,
                                    action: { label: 'Say hello1', type: 'postback', data: 'hello こんにちは' },
                                },
                                {
                                    imageUrl: buttonsImageURL,
                                    action: { label: 'Say message', type: 'message', text: 'Rice=米' },
                                },
                                {
                                    imageUrl: buttonsImageURL,
                                    action: {
                                        label: 'datetime',
                                        type: 'datetimepicker',
                                        data: 'DATETIME',
                                        mode: 'datetime',
                                    },
                                },
                            ]
                        },
                    }]
                }
            );
        case 'datetime':
            return client.replyMessage(
                {
                    replyToken,
                    messages: [{
                        type: 'template',
                        altText: 'Datetime pickers alt text',
                        template: {
                            type: 'buttons',
                            text: 'Select date / time !',
                            actions: [
                                { type: 'datetimepicker', label: 'date', data: 'DATE', mode: 'date' },
                                { type: 'datetimepicker', label: 'time', data: 'TIME', mode: 'time' },
                                { type: 'datetimepicker', label: 'datetime', data: 'DATETIME', mode: 'datetime' },
                            ],
                        },
                    }]
                }
            );
        case 'imagemap':
            return client.replyMessage(
                {
                    replyToken,
                    messages: [{
                        type: 'imagemap',
                        baseUrl: `${env.BASE_URL}/static/rich`,
                        altText: 'Imagemap alt text',
                        baseSize: { width: 1040, height: 1040 },
                        actions: [
                            { area: { x: 0, y: 0, width: 520, height: 520 }, type: 'uri', linkUri: 'https://store.line.me/family/manga/en' },
                            { area: { x: 520, y: 0, width: 520, height: 520 }, type: 'uri', linkUri: 'https://store.line.me/family/music/en' },
                            { area: { x: 0, y: 520, width: 520, height: 520 }, type: 'uri', linkUri: 'https://store.line.me/family/play/en' },
                            { area: { x: 520, y: 520, width: 520, height: 520 }, type: 'message', text: 'URANAI!' },
                        ],
                        video: {
                            originalContentUrl: `${env.BASE_URL}/static/imagemap/video.mp4`,
                            previewImageUrl: `${env.BASE_URL}/static/imagemap/preview.jpg`,
                            area: {
                                x: 280,
                                y: 385,
                                width: 480,
                                height: 270,
                            },
                            externalLink: {
                                linkUri: 'https://line.me',
                                label: 'LINE'
                            }
                        },
                    }]
                }
            );
        case 'bye':
            switch (source.type) {
                case 'user':
                    return replyText(replyToken, 'Bot can\'t leave from 1:1 chat');
                case 'group':
                    return replyText(replyToken, 'Leaving group')
                        .then(() => client.leaveGroup(source.groupId));
                case 'room':
                    return replyText(replyToken, 'Leaving room')
                        .then(() => client.leaveRoom(source.roomId));
            }
        default:
            console.log(`Echo message to ${replyToken}: ${message.text}`);
            return replyText(replyToken, message.text);
    }
}

export async function handleImage(message: any, replyToken: any) {
    function sendReply(originalContentUrl: any, previewImageUrl: any) {
        return client.replyMessage(
            {
                replyToken,
                messages: [{
                    type: 'image',
                    originalContentUrl,
                    previewImageUrl,
                }]
            }
        );
    }

    if (message.contentProvider.type === "line") {
        const downloadPath = path.join(__dirname, '../downloaded', `${message.id}.jpg`);
        const previewPath = path.join(__dirname, '../downloaded', `${message.id}.jpg`);

        await downloadContent(message.id, downloadPath);

        // ImageMagick is needed here to run 'convert'
        // Please consider security and performance by yourself
        // cp.execSync(`convert -resize 240x jpeg:${downloadPath} jpeg:${previewPath}`);

        sendReply(
            env.BASE_URL + '/downloaded/' + path.basename(downloadPath),
            env.BASE_URL + '/downloaded/' + path.basename(previewPath),
        );
    } else if (message.contentProvider.type === "external") {
        sendReply(message.contentProvider.originalContentUrl, message.contentProvider.previewImageUrl);
    }
}

export async function handleVideo(message: any, replyToken: any) {
    console.log(`handleVideo: ${replyToken} ${JSON.stringify(message)}}`);

    function sendReply(originalContentUrl: any, previewImageUrl: any) {
        return client.replyMessage(
            {
                replyToken,
                messages: [{
                    type: 'video',
                    originalContentUrl,
                    previewImageUrl,
                }]
            }
        );
    }

    if (message.contentProvider.type === "line") {
        const downloadPath = path.join(__dirname, 'downloaded', `${message.id}.mp4`);
        const previewPath = path.join(__dirname, 'downloaded', `${message.id}-preview.jpg`);

        await downloadContent(message.id, downloadPath);

        // FFmpeg and ImageMagick is needed here to run 'convert'
        // Please consider security and performance by yourself
        cp.execSync(`convert mp4:${downloadPath}[0] jpeg:${previewPath}`);

        sendReply(
            env.BASE_URL + '/downloaded/' + path.basename(downloadPath),
            env.BASE_URL + '/downloaded/' + path.basename(previewPath),
        );
    } else if (message.contentProvider.type === "external") {
        sendReply(message.contentProvider.originalContentUrl, message.contentProvider.previewImageUrl);
    }
}

export async function handleAudio(message: object | any, replyToken: any) {
    function sendReply(originalContentUrl: any) {
        return client.replyMessage(
            {
                replyToken,
                messages: [{
                    type: 'audio',
                    originalContentUrl,
                    duration: message.duration,
                }]
            }
        );
    }

    if (message.contentProvider.type === "line") {
        const downloadPath = path.join(__dirname, 'downloaded', `${message.id}.m4a`);

        await downloadContent(message.id, downloadPath)
        sendReply(env.BASE_URL + '/downloaded/' + path.basename(downloadPath));
    } else {
        sendReply(message.contentProvider.originalContentUrl);
    }
}

export async function downloadContent(messageId: any, downloadPath: any) {
    const stream = await blobClient.getMessageContent(messageId)

    const pipelineAsync = util.promisify(pipeline);

    const writable = fs.createWriteStream(downloadPath);
    await pipelineAsync(stream, writable);
}

export function handleLocation(message: any, replyToken: any) {
    return client.replyMessage(
        {
            replyToken,
            messages: [{
                type: 'location',
                title: message.title ? message.title : 'พิกัดของคุณ',
                address: message.address,
                latitude: message.latitude,
                longitude: message.longitude,
            }]
        }
    );
}

export function handleSticker(message: any, replyToken: any) {
    return client.replyMessage(
        {
            replyToken,
            messages: [{
                type: 'sticker',
                packageId: message.packageId,
                stickerId: message.stickerId,
            }]
        }
    );
}