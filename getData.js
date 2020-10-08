const getData = async (url) => {
    const response = await fetch(url).catch( err => console.log(err));
    if(!response.ok){
        throw new Error(`Ошибка по  ${url} , статус ${respose}`)
    }
    return  await response.json();
};

module.export = getData;