
//конфиг клавиатуры
module.exports = [
    [
        {
            text: 'Погода', // текст на кнопке
            callback_data: 'wether' // данные для обработчика событий
        }
    ],
    [
        {
            text: 'Курс рубля', // текст на кнопке
            callback_data: 'RUB' // данные для обработчика событий
        }
    ],
    [
        {
            text: 'Картинка', // текст на кнопке
            callback_data: 'img' // данные для обработчика событий
        }
    ],
    [
        {
            text: 'Музыка',
            callback_data: 'music'
        }
    ],
    [
        {
            text: 'Анекдот "dad joke"',
            callback_data: 'joke'
        }
    ],
    [
        {
            text: 'Мой сайт',
          url: 'https://dmirii.github.io/myPort/' //внешняя ссылка
        }
    ]
];
