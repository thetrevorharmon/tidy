/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";

import { SearchBox } from "./SearchBox";

import GoogleMapReact from "google-map-react";

const location = {
  address: "4132 east downing",
  lat: 33.4292284,
  lng: -111.7420592,
};

const LocationPin = ({ text }) => (
  <div className="pin">
    {/* <Icon icon={locationIcon} className="pin-icon" /> */}
    <p className="pin-text">{text}</p>
  </div>
);

export const Map = ({ zoomLevel }) => (
  <div sx={{ height: "400px" }}>
    <GoogleMapReact
      bootstrapURLKeys={{
        key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ["places"],
      }}
      defaultCenter={location}
      defaultZoom={14}
    >
      <LocationPin
        lat={location.lat}
        lng={location.lng}
        text={location.address}
      />
      <SearchBox
        placeholder={"123 anywhere st."}
        onPlacesChanged={this.handleSearch}
      />
    </GoogleMapReact>
  </div>
);
