<img width="1920" height="8903" alt="screencapture-127-0-0-1-5500-index-html-2026-06-17-02_37_17" src="https://github.com/user-attachments/assets/48d4eb53-efb8-461a-91f6-deb0d475fb30" />
Сайт открытый
http://smiranp9.beget.tech/
## Особенности сайта
- Отправка заявок по tg и email
- Готовая seo оптимизация на robots.txt и sitemap.xml
- Готовый дизайн сайта
- скрытая страница index.html/industrial
- карта место компаний
## Стек технологий
- html
- css
- javascript - содержит логика заявок tg и email
- php - содержит капчу ratelimiting 
- Деплой - Хост на beget
## Как скачать?
https://github.com/blackout0346/baikalgazservice ссылка на репозиторий
токен телеграм бота свой подставляете или же там есть готовый бот. Так же для почты нужно зарегистрироваться на emailjs. Вставить там свою почту и там выдадут serviceID и Template ID их нужно вставлять вот сюда
```
emailjs.send("serviceID","Template ID",e)
```
## YandexSmartCaptcha
внутри php содержит секретный ключ от яндекс капчи
```
$secret = "Сервис ключ"; //находиися в middleware.php
```
```
<form  id="quiz-form" class="quiz-form"  action="middleware.php" method="POST">
            <input type="hidden" id="smart-token" name="token">  
                   <div id="captcha-container"></div>
                    <div class="quiz-actions">
                        <button type="button" class="quiz-button button-prev">Назад</button>
                        <button type="submit" class="quiz-button button-submit">Отправить</button>
                    </div>
                </div>
                
          
            </div>
        </div>
</div>
</form>
```
```
document.addEventListener('DOMContentLoaded', function () {
    if (window.smartCaptcha) {
        try {
            window.smartCaptcha.render('captcha-container', {
                sitekey: 'ключ от клиента находится в yandex smartcaptcha',
                callback: function(token) {
                    document.getElementById('smart-token').value = token;
                }
            });
        } catch(e) {
            console.error("Ошибка рендера:", e);
        }
    } else {
        console.error("SmartCaptcha не загрузилась");
    }
});
```
