import React, { useState, useEffect } from "react";

import { ThemeProvider } from "theme-ui";
import { theme } from "./theme";

import { Textarea, Box } from "theme-ui";

import {
  FileInput,
  DateInput,
  LocationInput,
  TimeZoneDropdown,
} from "./components";

export default function App() {
  const [fileName, setFileName] = useState();
  const [date, setDate] = useState();
  const [coordinates, setCoordinates] = useState();
  const [command, setCommand] = useState("");

  useEffect(() => {
    if (fileName != null && date != null && coordinates != null) {
      const coordinatesString = `${coordinates.lat}, ${coordinates.lng}`;

      const dateString = formatDateString(date);

      const timestamp = [
        `"-datetimeoriginal=${dateString}"`,
        `"-CreationDate=${dateString}"`,
        `"-CreateDate=${dateString}"`,
      ];

      const gpsInformation = [
        `"-GPSCoordinates=${coordinatesString}"`,
        `"-GPSCoordinates-und-US=${coordinatesString}"`,
        `"-GPSLatitude=${coordinatesString}"`,
        `"-GPSLongitude=${coordinatesString}"`,
        `"-Keys:GPSCoordinates=${coordinatesString}"`,
        `"-Keys:GPSCoordinates-und-US=${coordinatesString}"`,
      ];

      const bashCommand = [
        "exiftool",
        ...timestamp,
        ...gpsInformation,
        fileName,
      ].join(" ");

      setCommand(bashCommand);
    }
  }, [fileName, date, coordinates, command, setCommand]);

  function formatDateString(currentDate) {
    if (currentDate == null) {
      return;
    }

    const timeZone = `-07:00`;
    const [dateWithDashes, timeWithTimezone] = currentDate
      .toISOString()
      .split("T");
    const [time] = timeWithTimezone.split(".");

    console.log(dateWithDashes, time);

    const date = dateWithDashes.replace(/-/g, ":");

    const preparedString = `${date} ${time}${timeZone}`;

    return preparedString;
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={{ margin: 30 }}>
        <h1>Tidy 🧹</h1>

        <h2>Choose a file</h2>
        <FileInput onChange={setFileName} />

        <h2>When was this taken?</h2>
        <DateInput onChange={setDate} />

        <h2>Where was this taken?</h2>
        <LocationInput onChange={setCoordinates} />

        <h2>What timezone was this taken in?</h2>
        <TimeZoneDropdown />

        {fileName && date && coordinates && (
          <Box>
            <h2>
              Your <code>exiftool</code> command:
            </h2>
            <Textarea value={command} readonly />
          </Box>
        )}

        <p>
          <ul>
            <li>
              <b>Name:</b> {fileName}
            </li>
            <li>
              <b>Date:</b> {formatDateString(date)}
            </li>
            <li>
              <b>Coordinates:</b> {coordinates?.lat}, {coordinates?.lng}
            </li>
          </ul>
        </p>
      </div>
    </ThemeProvider>
  );
}
