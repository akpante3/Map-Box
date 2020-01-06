const storeList = document.getElementById('avaliable-shops');
 
mapboxgl.accessToken = 'pk.eyJ1Ijoib2JpamUiLCJhIjoiY2s0eW44a3M3MDI2dDNrbXFzZmh6OGhiayJ9.S9s_I-a728DqJ5R2x2At1A';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 9,
    center: [-8.741896,37.15313]
});

// fetch Store list
function fetchStoresList(data) {
  data.data.forEach(store => {
    storeList.innerHTML += `<div class="list-items" onclick="viewMap(${[ store.location.coordinates[0], store.location.coordinates[1] ]})">${store.address}</div>`
  });
}

// view store 
function viewMap(...coordinates){
  map.jumpTo({ 'center': [coordinates[0], coordinates[1]], 'zoom': 14 });
}

// Fetch stores from API
async function getStores () {
   const res = await fetch('api/v1/stores');
    
   const data = await res.json();
   const stores = data.data.map(store => {
       return {   
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [store.location.coordinates[0], store.location.coordinates[1]]
            },
            properties: {
                storeId: store.storeId,
                icon: 'shop'
            }        
       }
   });

   fetchStoresList(data)
   loadmap(stores)
}
// load map with Stores
function loadmap (stores) {
    map.on('load', function() {
        map.addLayer({
                id: 'points',
                type: 'symbol',
                source: {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: stores
                    }
            },
            layout: {
                'icon-image': '{icon}-15',
                'icon-size': 1.5,
                'text-field':'{storeId}',
                'text-font':['Open Sans Semibold', 'Arial Unicode MS Bold'],
                'text-offset':[0, 0.9],
                'text-anchor': 'top'
            }
        });
    });
}

getStores();