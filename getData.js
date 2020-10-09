// функция для API fetch
// у ноды своя fetch 
// подключаем ее:
const fetch = require('node-fetch');
// експорт функции
module.exports = async (url) => {
    const response = await fetch(url).catch( err => console.log(err));
    if(!response.ok){
        throw new Error(`Ошибка по  ${url} , статус ${respose}`)
    }
    return  await response.json();
}

