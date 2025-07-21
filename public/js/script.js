const map = L.map("map").setView([23.2599, 77.4126], 16);


L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

let marker;

function searchAndMark() {
    const location = document.getElementById("locationInput").value;
    if (!location) return alert("Please enter a location");

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${location}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (!data || data.length === 0) {
                alert("Location not found");
                return;
            }

            const { lat, lon, display_name } = data[0];

            if (marker) map.removeLayer(marker);

            marker = L.marker([lat, lon], {
                icon: L.icon({
                    iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                    iconSize: [32, 32],
                    iconAnchor: [16, 32]
                })
            })
                .addTo(map)
                .bindPopup(display_name)
                .openPopup();

            map.setView([lat, lon], 15);
        })
        .catch(err => console.error("Geocoding error:", err));
}
