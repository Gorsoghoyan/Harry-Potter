
const charactersInput = document.getElementById('filterInput1');
const housesInput = document.getElementById('filterInput2');
const searchCharactersDiv = document.getElementById('searchCharactersDiv');
const searchHousesDiv = document.getElementById('searchHousesDiv');
const searchButtonCharacters = document.getElementById('searchButtonCharacters');
const searchButtonHouses = document.getElementById('searchButtonHouses');
const message1 = document.getElementById('message-1');
const characterData = document.getElementById('dataDiv1');
const message2 = document.getElementById('message-2');
const personHouse = document.getElementById('filteredStudiesName');

let arrayDublicat;

fetch('http://hp-api.herokuapp.com/api/characters')
.then(response => response.json())
.then(response => JSON.stringify(response))
.then(response => JSON.parse(response))
.then(result => {
    arrayDublicat = [...result];
    searchButtonHouses.addEventListener('click', () => {
        houseSort(result);
    }, {once: true})
    searchButtonCharacters.addEventListener('click', () => {
        charactersSort(result);
    }, {once: true})
})


function charactersSort (array) {
    array.forEach(person => {
        const p = document.createElement('p');
        p.innerText = person.name;
        p.classList.add('character-p');
        p.style.cursor = "pointer";
        searchCharactersDiv.appendChild(p);
    })
}

function houseSort (array) {
    array.forEach(person => {
        if (!person.house) return;
        if (searchHousesDiv.innerText.includes(person.house)) return;

        const p = document.createElement('p');
        p.innerText = person.house;
        p.classList.add('house-p');
        p.style.cursor = "pointer";         
        searchHousesDiv.appendChild(p);
    })
}

searchHousesDiv.addEventListener('click', (e) => {
    if (e.target.tagName !== "P") return;
    personHouse.innerHTML = "";

    arrayDublicat.forEach(person => {   
        if (person.house === e.target.innerText) {
            const p = document.createElement('p');
            p.innerText = person.name;
            personHouse.appendChild(p);
        }
    })  
    message2.classList.remove('hidden');
})

searchCharactersDiv.addEventListener('click', (e) => {
    if (e.target.tagName !== "P") return;

    arrayDublicat.forEach(person => {
        if (person.name === e.target.innerText) {
            document.getElementById('personName').innerText = person.name;
            document.getElementById('house').innerText = 'House: ' + person.house;
            document.getElementById('gender').innerText = 'Gender: ' + person.gender;
            document.getElementById('dateBirth').innerText = 'Data of birth: ' + person.dateOfBirth;
            document.getElementById('actor').innerText = "Actor: " + person.actor;
        }
    })
    message1.classList.remove('hidden');
})

function messageHidden (e) {
    if (
        e.target.tagName === 'SPAN' ||
        e.target.id === 'message-1' ||
        e.target.id === 'message-2'
    ) {
        e.currentTarget.classList.add('hidden');
    }
}

searchButtonCharacters.addEventListener('click', filterCharactersInput);
searchButtonHouses.addEventListener('click', filterHousesInput);

function filterHousesInput () {
    const value = housesInput.value;
    const housesP = document.querySelectorAll('.house-p');
    if (housesP.length === 0) return;

    housesP.forEach(p => {
        console.log(value);
        if (p.innerText.toUpperCase().includes(value.toUpperCase())) {
            p.style.display = '';
        } else {
            p.style.display = 'none';
        }
    })
}

function filterCharactersInput () {
    const value = charactersInput.value;
    const charactersP = document.querySelectorAll('.character-p');
    if (charactersP.length === 0) return;

    charactersP.forEach(p => {
        console.log(value);
        if (p.innerText.toUpperCase().includes(value.toUpperCase())) {
            p.style.display = '';
        } else {
            p.style.display = 'none';
        }
    })
}

