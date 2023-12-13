$(() => {

    // GLOBAL VARIABLES
    const map = initializeMap();
    const marker = createMarker();
    const popup = createPopup();

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

    // function that creates a marker at Codeup
    function createMarker() {
        return new mapboxgl.Marker()
            .setLngLat([-98.4916, 29.4252])
            .addTo(map);
    }

    // function that creates popup
    function createPopup() {
        return new mapboxgl.Popup()
            .setLngLat([-98.4916, 29.4252])
            .setHTML(`
                <div>
                    <h1>Codeup</h1>
                    <p>We can put anything we want</p>
                </div>
            `);
    }

    // function that bring me to paris
    function goToParis() {
        geocode('Paris', MAPBOX_TOKEN).then((data) => {
           console.log(data);
           map.setCenter(data);
        });
    }

    // function that uses reverse geocode
    // takes the coordinates from the center of the map
    // and print on the screen the address
    function findAndPrintAddress() {
        const coords = map.getCenter();
        reverseGeocode(coords, MAPBOX_TOKEN).then((data) => {
            console.log(data);
            document.querySelector('h1').innerHTML = `${data}`
        });
    }

    // function that uses geocode to take the string 'The Alamo, San Antonio;
    // and get coordinates to set a marker and popup at that location
    function markAlamo() {
        geocode('The Alamo, San Antonio', MAPBOX_TOKEN).then((data) => {
            const alamoPopup = new mapboxgl.Popup()
                .setHTML(`<p>Remember the Alamo!</p>`);
            const alamoMarker = new mapboxgl.Marker()
                .setLngLat(data)
                .addTo(map)
                .setPopup(alamoPopup);
            alamoPopup.addTo(map);
        })
    }

    // EVENTS
    document.querySelector('#geocode-button').addEventListener('click', goToParis);
    document.querySelector('#reverse-geocode-button').addEventListener('click', findAndPrintAddress);
    document.querySelector('#mark-alamo').addEventListener('click', markAlamo);

    // RUNS WHEN THE PROGRAM LOADS
    // map.setZoom(1);
    marker.setPopup(popup);



});