async function getHouses() {
    let url = 'talotiedot.json';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderHouses() {
    let houses = await getHouses();
    console.log(houses);

    let housediv = document.getElementById("houses");

    houses.forEach(house => {        

        housecontainer = document.createElement('div');
        housecontainer.className = 'houseContainer';

        let image = document.createElement('img');
        image.src = house.image;
        image.className = 'houseImage';

        let header = document.createElement('p');
        header.className = 'header';
        header.innerHTML = house.address;

        let koko = document.createElement('p');
        koko.className = 'text';
        koko.innerHTML = house.size;

        let kuvaus = document.createElement('p');
        kuvaus.className = 'text';
        kuvaus.innerHTML = house.text + "m2";

        let hinta = document.createElement('p');
        hinta.className = 'text';
        let numberstr = new Intl.NumberFormat('fi-FI').format(house.price);
        koko.innerHTML = numberstr;


       /*
             Ohjelmoi tähän toiminnallisuus, jossa luodaan p-elementit
             myös talon koon, tekstikuvauksen ja hinnan näyttämiselle
             Hinnan voit muotoilla tuhaterottimia käyttävään suomalaiseen
             muotoon esim:
          let numberstr = new Intl.NumberFormat('fi-FI').format(house.price);
        */

        housecontainer.appendChild(image);
        housecontainer.appendChild(header);
        housecontainer.appendChild(koko);
        housecontainer.appendChild(kuvaus);
        housecontainer.appendChild(hinta);

                /* Ohjelmoi tähän toiminnallisuus, jossa liität edellä
                    luomasi p-elementit myös housecontaineriin
                */


        housediv.appendChild(housecontainer); 
    });    
}