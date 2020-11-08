import React from "react";
import {
  GoogleMap,
  LoadScript,
  StandaloneSearchBox,
  Marker,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 40.3258589,
  lng: -111.7019145,
};

function Map() {
  const mapRef = React.useRef();

  const [map, setMap] = React.useState(null);
  const [markers, setMarkers] = React.useState([
    {
      lat: 40.3258589,
      lng: -111.7019145,
    },
  ]);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  function updateBounds(bounds) {
    map.fitBounds(bounds);
    setMap(map);
  }

  function updateMarkers(markers) {}

  const inputStyle = {
    boxSizing: `border-box`,
    border: `1px solid transparent`,
    width: `240px`,
    height: `32px`,
    padding: `0 12px`,
    borderRadius: `3px`,
    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
    fontSize: `14px`,
    outline: `none`,
    textOverflow: `ellipses`,
    position: "absolute",
    top: "10px",
    right: "10px",
  };

  function onPlacesChanged() {
    const [place] = this.getPlaces();

    updateBounds(place.geometry.viewport);
  }

  return (
    <LoadScript
      libraries={["places"]}
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
    >
      <GoogleMap
        mapRef={mapRef}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <StandaloneSearchBox onPlacesChanged={onPlacesChanged}>
          <input
            type="text"
            placeholder="Enter a nearby address"
            style={inputStyle}
          />
        </StandaloneSearchBox>

        {map != null &&
          markers.map((position) => <Marker position={position} />)}
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(Map);
