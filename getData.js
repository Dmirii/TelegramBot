// функция для API fetch
// у ноды своя fetch 
// подключаем ее:
const fetch = require('node-fetch');
// експорт функции
module.exports = async (url, options={}) => {
    const response = await fetch(url,options).catch( err => console.log('!!!!->MyErr ',err)); 
    //console.log(response);
    if(!response.ok){
        throw new Error(`!!!!->Ошибка по  ${url} , статус ${'MyResp ',response}`)
    }
    return  await response.json();
}

