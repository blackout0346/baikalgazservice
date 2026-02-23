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