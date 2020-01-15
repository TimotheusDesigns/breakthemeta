var itemsRequest = fetch(
  'http://ddragon.leagueoflegends.com/cdn/10.1.1/data/en_US/item.json'
).then(function(response) {
  return response.json();
});
var champsRequest = fetch(
  'http://ddragon.leagueoflegends.com/cdn/10.1.1/data/en_US/champion.json'
).then(function(response) {
  return response.json();
});

var combinedData = { item: {}, champs: {} };
var champs = [];
Promise.all([itemsRequest, champsRequest])
  .then(function(values) {
    combinedData['items'] = values[0];
    combinedData['champs'] = values[1];
    return combinedData;
  })
  .then(function() {
    let cd = combinedData.champs.data;
    let allChamps = [];
    let topChamps = [];
    let jgChamps = [];
    let midChamps = [];
    let botChamps = [];
    let suppChamps = [];

    //Champ Data
    for (champ in cd) {
      allChamps.push(champ);
    }
    //Top Champ Data
    for (champ in cd) {
      if (
        cd[champ].tags.includes('Fighter') ||
        cd[champ].tags.includes('Tank') ||
        cd[champ].tags.includes('Slayer')
      ) {
        topChamps.push(champ);
      }
    }
    //Mid Champ Data
    for (champ in cd) {
      if (
        cd[champ].tags.includes('Mage') ||
        cd[champ].tags.includes('Slayer')
      ) {
        midChamps.push(champ);
      }
    }

    function randomize(arr) {
      return Math.floor(Math.random() * arr.length);
    }
    //Randomize Champion
    function randomizeChampion(arr) {
      let currentChamp = arr[randomize(arr)];
      let champArt = `url('http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${currentChamp}_0.jpg')`;
      let champName = combinedData.champs.data[currentChamp].name;
      let champTitle = combinedData.champs.data[currentChamp].title;

      document.body.style.backgroundImage = champArt;
      document.querySelector('.champName').innerHTML = champName;
      document.querySelector('.champTitle').innerHTML = champTitle;
    }

    randomizeChampion(allChamps);
    //Item Data
    let allItems = [];
    for (item in combinedData.items.data) {
      if (
        (combinedData.items.data[item].into == undefined &&
          combinedData.items.data[item].gold.base != 0 &&
          combinedData.items.data[item].inStore != false &&
          !combinedData.items.data[item].hasOwnProperty('requiredChampion') &&
          combinedData.items.data[item].maps[11] == true &&
          !combinedData.items.data[item].name.includes('Quick Charge') &&
          !combinedData.items.data[item].tags.includes('Lane') &&
          !combinedData.items.data[item].tags.includes('Consumable') &&
          !combinedData.items.data[item].tags.includes('Boots') &&
          combinedData.items.data[item].tags.length != 0) ||
        combinedData.items.data[item].name == 'Infinity Edge' ||
        combinedData.items.data[item].name == 'Black Cleaver' ||
        combinedData.items.data[item].name == 'Morellonomicon' ||
        combinedData.items.data[item].name == 'Blade of the Ruined King' ||
        combinedData.items.data[item].name == 'Trinity Force' ||
        combinedData.items.data[item].name == "Youmuu's Ghostblade" ||
        combinedData.items.data[item].name == 'Sunfire Cape' ||
        combinedData.items.data[item].name == "Luden's Echo" ||
        combinedData.items.data[item].name == "Rabadon's Deathcap" ||
        combinedData.items.data[item].name == "Zhonya's Hourglass" ||
        combinedData.items.data[item].name == 'Iceborne Gauntlet' ||
        combinedData.items.data[item].name == 'Abyssal Mask' ||
        combinedData.items.data[item].name == 'Locket of the Iron Solari' ||
        combinedData.items.data[item].name == 'Redemption'
      ) {
        allItems.push(combinedData.items.data[item]);
      }
    }
    console.log(allItems);
    //Randomize Items
    let build = [];
    function randomizeItems(arr) {
      for (i = 0; i < 5; i++) {
        randomItem = randomize(arr);
        console.log('og' + randomItem);
        if (build.includes(arr[randomItem])) {
          randomItem = randomize(arr);
          build.push(arr[randomItem]);
          console.log('new' + randomItem);
        } else {
          build.push(arr[randomItem]);
        }
      }
      console.log(build);
      for (i = 0; i < 5; i++) {
        if (build[i] == undefined) {
          console.log('error' + i);
        } else {
          let itemImg = `http://ddragon.leagueoflegends.com/cdn/10.1.1/img/item/${build[i].image.full}`;
          let itemLi = document.querySelector('.itemContain ul .item' + i);
          itemLi.innerHTML =
            '<img src="' + itemImg + '"><div class="itemHover"></div>';

          //Item Description on Hover
          itemLi.addEventListener('mouseenter', function() {
            let itemHover = document.querySelector('.itemHover');
            itemHover.innerHTML =
              build[this.id].name +
              '<br> <p class="desc">' +
              build[this.id].description +
              '</p';
          });
          itemLi.addEventListener('mouseleave', function() {
            let itemHover = document.querySelector('.itemHover');
            itemHover.innerHTML = '';
          });
        }
      }
    }
    randomizeItems(allItems);
    // Reload Champ and Items
    document.querySelector('.reload').addEventListener('click', function() {
      randomizeChampion(allChamps);
      build = [];
      randomizeItems(allItems);
    });

    //Randomize Top
    document.querySelector('.top').addEventListener('click', function() {
      randomizeChampion(topChamps);
      build = [];
      randomizeItems(allItems);
    });
    //Randomize Mid
    document.querySelector('.mid').addEventListener('click', function() {
      randomizeChampion(midChamps);
      build = [];
      randomizeItems(allItems);
    });
  });

/* TODO 
  
  ADD RANDOMIZE FUNCTION
  
  */
