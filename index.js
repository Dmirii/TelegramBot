
const keyboard = require('./keyboard.js');
const fetch = require('node-fetch');
const TelegramBot = require('node-telegram-bot-api'); // подключаем node-telegram-bot-api

const token = '1262373438:AAFYVbIUup6OYkFDBH1Rh4Jz6NZUdFGfsgs'; // тут токен кторый мы получили от botFather

// включаем самого обота
const bot = new TelegramBot(token, {polling: true});

//
const getData = async (url) => {
    const response = await fetch(url).catch( err => console.log(err));
   // console.log(response)
    if(!response.ok){
        throw new Error(`Ошибка по  ${url} , статус ${response}`)
        //console.log(response)
    }
    return  await response.json();
};




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


// обработчик событий нажатий на клавиатуру
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;

    let img = '';

    if (query.data === 'fallOutBoy') { // если бой
        img = 'boy.jpg';
        
    }
    if (query.data === 'RUB') { // если бой
        
        getData('https://api.exchangeratesapi.io/latest?base=USD').then( data  => {           
            bot.sendMessage(chatId, ` USD = ${data.rates.RUB.toFixed(2)}`);           
        });
        getData('https://api.exchangeratesapi.io/latest?base=EUR').then( data  => {           
            bot.sendMessage(chatId, ` EUR = ${data.rates.RUB.toFixed(2)}`);           
        });        
    }

    if (query.data === 'wether') { // если бой

        
        getData('https://api.openweathermap.org/data/2.5/weather?id=562450&appid=658790e853befcc579c25cc91de06623&units=metric')
        .then( data  => {           
        bot.sendMessage(chatId, ` ${data.name} : мин: ${data.main.temp_min}, макс: ${data.main.temp_max}`);  
        console.log(data) 
        
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