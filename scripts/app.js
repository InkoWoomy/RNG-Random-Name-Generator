// Localstorage to have a list of names
// Be able to add a name via an input field
// Delete a name via an appended child "Delete" button
// Have a button or range to have the user sort users randaomly into groups.
// SELF-IMPOSED CHALLENGE (WORRY ABOUT LAST): Have a button or prompt for a recommended group size for users

import { getNames, addName, deleteName } from "./localstorage.js";


// Document Variable Declarations
const nameInput = document.getElementById("nameInput");
const groupSizeText = document.getElementById("groupSizeText")
const groupSizeRange = document.getElementById("groupSizeRange");
const namesList = document.getElementById("namesList");
const randomNameGen = document.getElementById("randomNameGen");
const groupList = document.getElementById("groupList")
const groupModal = document.getElementById("groupModal");
const btnAddName = document.getElementById("btnAddName");
const btnRandomName = document.getElementById("btnRandomName");
const btnFormGroups = document.getElementById("btnFormGroups");
const btnExitModal = document.getElementById("btnExitModal");

loadList();

groupSizeRange.addEventListener("input", async() => {
    groupSizeText.textContent = `Group Size: ${groupSizeRange.value}`;
});

btnAddName.addEventListener("click", () => {
    console.log(nameInput.value)
    addName((nameInput.value));
    loadList();
});

async function loadList()
{
    let nameData = await getNames();
    namesList.innerHTML = "";

    nameData.map(index => {
        let name = document.createElement('h1');
        name.className = `py-5 text-5xl col-start-1 col-span-3 px-2 bg-purple-200 rounded-s-full`;
        name.innerText = index;

        let nameDelete = document.createElement('button');
        nameDelete.className = "relative inline-flex bg-red-500 items-center justify-center p-0.5 overflow-hidden font-medium text-3xl text-gray-900 rounded-e-full group hover:bg-gradient-to-br from-red-500 to-red-900 group-hover:from-red-500 group-hover:to-orange-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-200"
        nameDelete.addEventListener('click', function()
        {
            deleteName(index);
            namesList.removeChild(name);
            namesList.removeChild(nameDelete);
        });

        let nameDeleteText = document.createElement('span');
        nameDeleteText.className = "relative px-5 py-2.5 transition-all ease-in duration-75 rounded-md group-hover:bg-transparent";
        nameDeleteText.innerText = "Delete Name";

        namesList.appendChild(name);
        namesList.appendChild(nameDelete).append(nameDeleteText);
    });
};

btnRandomName.addEventListener("click", async() => {
    let nameData = await getNames();
    let randomName = nameData[Math.floor(Math.random() * (nameData.length))];
    randomNameGen.innerText = randomName;
});

btnFormGroups.addEventListener("click", async() => {

    groupModal.classList.add("block");
    groupModal.classList.remove("hidden");
    let nameData = await getNames();
    console.log(nameData);
    let nameListData = "";
    let groupsTotal = Math.floor((nameData.length) / (groupSizeRange.value));
    let namesPerGroup = groupSizeRange.value;
    console.log(namesPerGroup);
    groupList.innerHTML = "";

    
    console.log(groupsTotal);
    for(let i = 0; i < groupsTotal; i++)
    {   
        console.log(i + 1)
        let group = document.createElement('h4');
        group.className = 'text-white text-2xl underline'
        let name = document.createElement('h5')
        name.className = 'text-grey-100 text-xl';

        group.innerText = `Group ${i + 1}`
        
        for (let j = 0; j < namesPerGroup; j++)
        {
            let rand = Math.floor(Math.random() * (nameData.length));
            if (j != namesPerGroup - 1)
            {
                nameListData += `${nameData[rand]}, `;
            } else {
                nameListData += nameData[rand];
            }
            nameData.splice(rand, 1);
        }
        name.innerText = nameListData;
        console.log(nameListData);
        nameListData = "";
        groupList.append(group, name);
    }

    if (nameData.length > 0)
    {
        let group = document.createElement('h4');
        group.className = 'text-white text-2xl underline'
        let name = document.createElement('h5')
        name.className = 'text-grey-100';
        group.innerText = `Group ${groupsTotal + 1}`

        for (let i = 0; i < nameData.length; i++)
        {
            let rand = Math.floor(Math.random() * (nameData.length));
            if (i != nameData.length - 2)
            {
                nameListData += `${nameData[rand]}, `;
            } else {
                nameListData += nameData[rand];
            }
            nameData.splice(rand, 1);
        }
        name.innerText = nameListData;
        console.log(nameListData);
        nameListData = "";
        groupList.append(group, name);
    }
});

btnExitModal.addEventListener("click", () => {
    groupModal.classList.add("hidden");
    groupModal.classList.remove("block");
})