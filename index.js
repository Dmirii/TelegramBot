const getData = require('./getData.js'); // обслуживаем API fetch
// сам бот::
const keyboard = require('./keyboard.js'); // описываем меню бота
const TelegramBot = require('node-telegram-bot-api'); // подключаем node-telegram-bot-api
const token = '1262373438:AAFYVbIUup6OYkFDBH1Rh4Jz6NZUdFGfsgs'; // тут токен кторый мы получили от botFather
const bot = new TelegramBot(token, {polling: true});// создаем бота

// ** //
// обработчик события присылания нам любого сообщения
bot.on('message', (msg) => {
  const chatId = msg.chat.id; //получаем идентификатор диалога, чтобы отвечать именно тому пользователю, который нам что-то прислал
    if(msg.text.toLowerCase() == '/menu'){
        
        // отправляем сообщение
        bot.sendMessage(chatId, 'Меню:', { // прикрутим клаву
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
    }else{
        bot.sendMessage(chatId,'Я не понял')
    }
});

// ** //
// обработчик событий нажатий на клавиатуру
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;

    let img = '';
    if (query.data === 'fallOutBoy') { // кариинка
        img = 'boy.jpg';        
    }
    if (query.data === 'RUB') { // курсы вылют
        
        getData('https://api.exchangeratesapi.io/latest?base=USD').then( data  => {           
            bot.sendMessage(chatId, ` USD = ${data.rates.RUB.toFixed(2)}`);           
        });
        getData('https://api.exchangeratesapi.io/latest?base=EUR').then( data  => {           
            bot.sendMessage(chatId, ` EUR = ${data.rates.RUB.toFixed(2)}`);           
        });        
    }

    if (query.data === 'wether') { // погода        
        getData('https://api.openweathermap.org/data/2.5/weather?id=562450&appid=658790e853befcc579c25cc91de06623&units=metric')
        .then( data  => {           
        bot.sendMessage(chatId, ` ${data.name} : мин: ${data.main.temp_min}, макс: ${data.main.temp_max}`);       
        });
    }    

    if (query.data === 'music') { // если музыка
        bot.sendAudio(chatId,'./audio/1.mp3')        
    }

    if (img) {
        bot.sendPhoto(chatId, img, { // прикрутим клаву
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
    } 
    //else {
    //     bot.sendMessage(chatId, 'Непонятно, давай попробуем ещё раз?', { // прикрутим клаву
    //         reply_markup: {
    //             inline_keyboard: keyboard
    //         }
    //     });
    // }
});