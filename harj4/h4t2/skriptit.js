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

    var filtered = houses;

    if (nelioCheck.checked == true && euroCheck.checked == true){
        console.log("1");

        filtered = houses.filter(function (entry) {
        return entry.price < 1000000 && entry.size < 200;
        });
        console.log(filtered)
        
      } else if (nelioCheck.checked == true && euroCheck.checked == false){
        console.log("1");

        filtered = houses.filter(function (entry) {
        return entry.size < 200;
        });
        console.log(filtered)
        
      } else if (nelioCheck.checked == false && euroCheck.checked == true){
        console.log("1");

        filtered = houses.filter(function (entry) {
        return entry.price < 1000000;
        });
        console.log(filtered)
        
      } else if (nelioCheck.checked == false && euroCheck.checked == false){
        console.log("1");
        
        return filtered;        
      } 


    filtered.forEach(house => {     
 
        housecontainer = document.createElement('div');
        housecontainer.className = 'houseContainer';

        let image = document.createElement('img');
        image.src = house.image;
        image.className = 'houseImage';

        let header = document.createElement('p');
        header.className = 'header';
        header.innerHTML = house.address;

        let koko = document.createElement('p');
        koko.className = 'size';
        koko.innerHTML = house.size + " m2";

        let kuvaus = document.createElement('p');
        kuvaus.className = 'text';
        kuvaus.innerHTML = house.text;

        let hinta = document.createElement('p');
        hinta.className = 'price';
        let numberstr = new Intl.NumberFormat('fi-FI').format(house.price);
        hinta.innerHTML = numberstr + " euroa";




        housecontainer.appendChild(image);
        housecontainer.appendChild(header);
        housecontainer.appendChild(koko);
        housecontainer.appendChild(kuvaus);
        housecontainer.appendChild(hinta);



        housediv.appendChild(housecontainer); 
    });    
}