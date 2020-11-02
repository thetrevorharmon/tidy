/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import React, { useRef, useState } from "react";

import { Input, Link, Box } from "theme-ui";

const googleMapsCoordinatesUrlMatcher = /https\:\/\/www.google.com\/maps\/.*\/\@([0-9\-\.]+),([0-9\-\.]+).*/;

export function LocationInput({ onChange }) {
  const mapsLinkRef = useRef();

  function handleChange() {
    if (mapsLinkRef.current != null) {
      const url = mapsLinkRef.current.value;
      const matches = url.match(googleMapsCoordinatesUrlMatcher);

      if (matches != null && matches.length === 3) {
        const [, lat, lng] = matches;
        onChange({ lat, lng });
      } else {
        onChange(null);
      }
    }
  }

  return (
    <Box sx={{ my: 3 }}>
      <Input
        type="url"
        name="location"
        ref={mapsLinkRef}
        onChange={handleChange}
        placeholder="Google maps link to where the media was taken"
        sx={{ my: 1 }}
      />
      <Link href="http://maps.google.com" target="_blank">
        Go to Google Maps →
      </Link>
    </Box>
  );
}
