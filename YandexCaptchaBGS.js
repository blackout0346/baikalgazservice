const https = require('https');
const querystring = require('querystring');
const express = require('express');
const app = express();

app.use(express.urlencoded({extended:true}))

const SMARTCAPTCHA_SERVER_KEY = "ysc2_ZKbHttA4kU5VgVygKTmtzfIhDFpIagIXOu7noaSk23921fb9";


function check_captcha(token, UserId, callback) {
    const postData = querystring.stringify({
        secret: SMARTCAPTCHA_SERVER_KEY,
        token: token,
        ip: UserId  
    });

    const options = {
        hostname: 'smartcaptcha.cloud.yandex.ru',
        port: 443,
        path: '/validate',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData),
        },
    };

    const req = https.request(options, (res) => {
        let content = '';

        res.on('data', (chunk) => {
            content += chunk;
        });

        res.on('end', () => {
            if (res.statusCode !== 200) {
                console.error(`Allow access due to an error: code=${res.statusCode}; message=${content}`);
                callback(true);
                return;
            }

            try {
                const parsedContent = JSON.parse(content);
                callback(parsedContent.status === 'ok');
            } catch (err) {
                console.error('Error parsing response: ', err);
                callback(false);
            }
        });
    });

    req.on('error', (error) => {
        console.error(error);
        callback(false);
    });

    // Записываем POST-данные в тело запроса
    req.write(postData);
    req.end();
}


let token = "<токен>";
check_captcha(token, "127.0.0.1",(passed) => {
    if (passed) {
        console.log("Passed");
    } else {
        console.log("Robot");
    }
});
app.post('/submit', (req, res) => {
    const token = req.body['smart-token']; // Токен из формы
    const userIp = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;

    check_captcha(token, userIp, (passed) => {
        if (passed) {
            res.send("Вы человек!");
        } else {
            res.status(403).send("Роботам вход воспрещен");
        }
    });
});
app.listen(5500, () => console.log('Server running on port 5500'));