const apiUrl = 'https://silicon-scraper.herokuapp.com/analytics';
let map, markers;

const getData = async () => {
  try {
    let response = await fetch(apiUrl);
    if (response.ok)
      return await response.json();
  } catch (error) {
    console.log(error);
    return false;
  }
}

const constructLocation = (lon, lat) => {
  return new OpenLayers.LonLat(lon, lat)
    .transform(
      new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
      map.getProjectionObject() // to Spherical Mercator Projection
    );

}
const addMarker = (lon, lat) => {
  markers.addMarker(new OpenLayers.Marker(constructLocation(lon, lat)));
}

initOpenMap = () => {
  map = new OpenLayers.Map("mapdiv");

  map.addLayer(new OpenLayers.Layer.OSM());

  var lonLat = new OpenLayers.LonLat(77.59, 12.97)
    .transform(
      new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
      map.getProjectionObject() // to Spherical Mercator Projection
    );

  var zoom = 5;
  markers = new OpenLayers.Layer.Markers("Markers");
  map.addLayer(markers);
  map.setCenter(lonLat, zoom);
}

document.addEventListener('DOMContentLoaded', function () {
  initOpenMap();
}, false);

const loadData = async () => {
  const {requests} = await getData();
  const data = requests.filter(request => !!request.ip);
  document.querySelector('.requests').innerHTML = `${data.length} Requests`;
  console.log(data, data.length)
  data.map(({ll}) => addMarker(ll[1], ll[0]));
  data.map((request => {
    const {ip, city, region, ll, timeAccessed, service} = request;
    document.querySelector('.timeline').innerHTML +=
      `<li><span>
            <div>Service: ${service}</div>
            <div>IP Address: ${ip}</div>
            <div>City: ${city}</div>
            <div>Region: ${region}</div>
            <div>Coordinates: ${ll.toString()}</div>
            <div>Time Accessed: ${(new Date(timeAccessed)).toLocaleString()}</div>
        </span></li>`

  }))

}

loadData();