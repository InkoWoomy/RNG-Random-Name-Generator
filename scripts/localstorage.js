function getNames()
{
    let nameData = localStorage.getItem('names');

    if (nameData == null)
    {
        return [];
    }

    return JSON.parse(nameData);
}

function addName(name)
{
    let nameData = getNames();
    if(!nameData.includes(name) && name != "")
    {
        nameData.push(name);
    }
    localStorage.setItem('names', JSON.stringify(nameData));
    console.log(localStorage);
}

function deleteName(name)
{
    let nameData = getNames();
    let itemIndex = nameData.indexOf(name);
    nameData.splice(itemIndex, 1);
    localStorage.setItem('names', JSON.stringify(nameData));
}

export { getNames, addName, deleteName };