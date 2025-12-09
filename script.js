document.body.style.fontFamily = 'Arial, sans-serif';
document.body.style.margin = '0';
document.body.style.padding = '0';

function createCard() {
    const card = document.createElement('div');
    card.style.width = '30%';
    card.style.minWidth = '200px';
    card.style.border = '1px solid #ccc';
    card.style.borderRadius = '8px';
    card.style.padding = '20px';
    card.style.margin = '10px';
    card.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    card.style.textAlign = 'center';
    const img = document.createElement('img');
    img.src = 'bmw.jpeg';
    img.alt = 'BMW Image';
    img.style.width = '100%';
    img.style.height = 'auto';
    img.style.borderRadius = '4px';
    card.appendChild(img)
    const cardText = document.createElement('p');
    cardText.textContent = 'Small text under the image.';
    cardText.style.fontSize = '14px';
    cardText.style.marginTop = '10px';
    card.appendChild(cardText);
    return card;
}

const header = document.createElement('header');
header.style.backgroundColor = '#333';
header.style.color = 'white';
header.style.padding = '10px 20px';
header.style.display = 'flex';
header.style.justifyContent = 'space-between';
header.style.alignItems = 'center';
const logo = document.createElement('img');
logo.src = 'assets/logo.png';
logo.alt = 'Logo';
logo.style.height = '50px';
header.appendChild(logo);
const nav = document.createElement('nav');
const navList = document.createElement('ul');
navList.style.listStyle = 'none';
navList.style.display = 'flex';
navList.style.margin = '0';
navList.style.padding = '0';

const li1 = document.createElement('li');
li1.style.margin = '0 15px';
const a1 = document.createElement('a');
a1.href = '#';
a1.textContent = 'Home';
a1.style.color = 'white';
a1.style.textDecoration = 'none';
li1.appendChild(a1);
navList.appendChild(li1);

const li2 = document.createElement('li');
li2.style.margin = '0 15px';
const a2 = document.createElement('a');
a2.href = '#';
a2.textContent = 'About';
a2.style.color = 'white';
a2.style.textDecoration = 'none';
li2.appendChild(a2);
navList.appendChild(li2);

const li3 = document.createElement('li');
li3.style.margin = '0 15px';
const a3 = document.createElement('a');
a3.href = '#';
a3.textContent = 'Services';
a3.style.color = 'white';
a3.style.textDecoration = 'none';
li3.appendChild(a3);
navList.appendChild(li3);

const li4 = document.createElement('li');
li4.style.margin = '0 15px';
const a4 = document.createElement('a');
a4.href = '#';
a4.textContent = 'Contact';
a4.style.color = 'white';
a4.style.textDecoration = 'none';
li4.appendChild(a4);
navList.appendChild(li4);

nav.appendChild(navList);
header.appendChild(nav);

const section = document.createElement('section');
section.style.padding = '20px';
section.style.textAlign = 'center';

const loremText = document.createElement('p');
loremText.textContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
loremText.style.fontSize = '18px';
loremText.style.lineHeight = '1.6';
section.appendChild(loremText);

const cardContainer = document.createElement('div');
cardContainer.style.display = 'flex';
cardContainer.style.justifyContent = 'space-around';
cardContainer.style.flexWrap = 'wrap';
cardContainer.style.marginTop = '20px';

for (var i = 1; i <= 6; i++) {
    cardContainer.appendChild(createCard());
}

section.appendChild(cardContainer);

document.body.appendChild(header);
document.body.appendChild(section);
