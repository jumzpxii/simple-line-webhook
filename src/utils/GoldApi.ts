import { client } from "../core/client"

export async function GoldToday(replyToken: string) {
    const fetchApi = await fetch('https://api.chnwt.dev/thai-gold-api/latest')
    const gold = await fetchApi.json()
    return client.replyMessage(
        {
            replyToken,
            messages: [{
                type: 'flex',
                altText: 'ราคาทองวันนี้',
                contents: {
                    "type": "bubble",
                    "hero": {
                        "type": "image",
                        "url": "https://c.tenor.com/3lyr03S5kbYAAAAC/tenor.gif",
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
                                "text": "ราคาทองวันนี้",
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
                                                "text": "ราคาขาย",
                                                "color": "#aaaaaa",
                                                "size": "sm",
                                                "flex": 2
                                            },
                                            {
                                                "type": "text",
                                                "text": gold.response.price.gold.sell,
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
                                                "text": "ราคาซื้อ",
                                                "color": "#aaaaaa",
                                                "size": "sm",
                                                "flex": 2
                                            },
                                            {
                                                "type": "text",
                                                "text": gold.response.price.gold.buy,
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
                                                "text": `${gold.response.date} ${gold.response.update_time}`,
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
                },
            }],
        }
    );
}