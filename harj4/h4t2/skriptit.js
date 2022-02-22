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
    var nelioCheck = document.getElementById("neliot");
    var euroCheck = document.getElementById("eurot");
    
    console.log(houses);

    let housediv = document.getElementById("houses");
    housediv.innerHTML = "";

    if (nelioCheck.checked == true && euroCheck.checked == true){
        console.log("1");

        var filtered = houses.filter(function (entry) {
        return entry.price < 1000000;
        });
        console.log(filtered)
        
      } else {
         console.log("2");
      }

      if (nelioCheck.checked == true && euroCheck.checked == false){
        console.log("3");
      } else {
         console.log("4");
      }  


    filtered.forEach(house => {     
 
        housecontainer = document.createElement('div');
        housecontainer.className = 'houseContainer';

        let image = document.createElement('img');
        image.src = filtered.image;
        image.className = 'houseImage';

        let header = document.createElement('p');
        header.className = 'header';
        header.innerHTML = filtered.address;

        let koko = document.createElement('p');
        koko.className = 'size';
        koko.innerHTML = filtered.size + " m2";

        let kuvaus = document.createElement('p');
        kuvaus.className = 'text';
        kuvaus.innerHTML = filtered.text;

        let hinta = document.createElement('p');
        hinta.className = 'price';
        let numberstr = new Intl.NumberFormat('fi-FI').format(filtered.price);
        hinta.innerHTML = numberstr + " euroa";


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