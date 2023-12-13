$(() => {

    // GLOBAL VARIABLES
    const map = initializeMap();
    const favoriteRestaurants = [
        {
            "name": "Compadres Hill Country Cocina",
            "category": "Mexican",
            "stars": "4.8",
            "address": "209 Lohmann St, Boerne, TX 78006"
        },
        {
            "name": "CAVA",
            "category": "Mediterranean",
            "stars": "4.5",
            "address": "427 N Loop 1604 W Suite 210, San Antonio, TX 78232"
        },
        {
            "name": "Texas Roadhouse",
            "category": "Steakhouse",
            "stars": "4.4",
            "address": "16915 San Pedro Ave, Hollywood Park, TX 78232"
        }
    ]
    const favRestaurantButton = document.querySelector('#geocode-button');
    const favRestaurantsButton = document.querySelector('#mark-restaurants');

    // FUNCTIONS

    // function that initializes the map
    function initializeMap() {
        mapboxgl.accessToken = MAPBOX_TOKEN;

        const mapOptions = {
            container: 'map',
            style:'mapbox://styles/mapbox/streets-v12',
            zoom: 10,
            center: [-98.4916, 29.4252],
        }

        return new mapboxgl.Map(mapOptions);
    }

    // function that goes to the city of my favorite restaurant using geocode
    function goToRestaurant() {
        geocode('Borne, Texas', MAPBOX_TOKEN).then((data) => {
            console.log(data);
            map.setCenter(data)
                .setZoom(9)
                .setCenter([-98.73465, 29.79499])
        });
    }

    // function that centers the map on my fav restaurant
    // zoom in
    // create marker
    function showFavRestaurant(favRestaurant) {
        geocode(favRestaurant.address, MAPBOX_TOKEN)
            .then((data) => {
                console.log(data);
                map.setCenter(data)
                    .setZoom(15);
                const marker = new mapboxgl.Marker()
                    .setLngLat(data)
                    .addTo(map);
                const popup = new mapboxgl.Popup()
                    .setHTML(favRestaurant.name)
                marker.setPopup(popup);
            });
    }


    // function that shows the same thing as the above but with
    // all the restaurants in my fav restaurants array
    function showFavRestaurants() {
        favoriteRestaurants.forEach((favRestaurant) => {
            showFavRestaurant(favRestaurant);
        });
    }

    // EVENTS
    favRestaurantButton.addEventListener('click', () => showFavRestaurant({address: '209 Lohmann St, Boerne, TX 78006', name: 'Compadres Hill Country Cocina'}));
    favRestaurantsButton.addEventListener('click', showFavRestaurants);


    // RUNS WHEN THE PROGRAM LOADS
    goToRestaurant();

});