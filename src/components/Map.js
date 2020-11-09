/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";

import { Input } from "theme-ui";

import { useState, useCallback, memo } from "react";
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
  lat: 40.3258,
  lng: -111.6997,
};

const libraries = ["places"];

function Map({ onChange }) {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([
    {
      ...center,
    },
  ]);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  function updateBounds(bounds) {
    map.fitBounds(bounds);
    setMap(map);
  }

  function onPlacesChanged() {
    const [place] = this.getPlaces();

    updateBounds(place.geometry.viewport);
    setMarkers([place.geometry.location]);

    const position = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };

    onChange(position);
  }

  function onMarkerChanged(marker) {
    const position = { lat: marker.latLng.lat(), lng: marker.latLng.lng() };

    onChange(position);
  }

  function handleMapClick(place) {
    const position = { lat: place.latLng.lat(), lng: place.latLng.lng() };
    setMarkers([position]);
    onChange(position);
  }

  return (
    <LoadScript
      libraries={libraries}
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleMapClick}
      >
        <StandaloneSearchBox onPlacesChanged={onPlacesChanged}>
          <Input
            type="text"
            placeholder="Enter an address"
            sx={{
              position: "absolute",
              top: "2px",
              right: "8px",
              width: "240px",
              background: "white",
              textOverflow: "ellipses",
            }}
          />
        </StandaloneSearchBox>

        {map != null &&
          markers.map((position) => (
            <Marker
              onDragEnd={onMarkerChanged}
              draggable={true}
              key={`${position.lat}+${position.lng}`}
              position={position}
            />
          ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default memo(Map);
