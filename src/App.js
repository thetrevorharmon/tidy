import React, { useState, useEffect } from "react";

import { ThemeProvider } from "theme-ui";
import { theme } from "./theme";

import { Textarea, Box } from "theme-ui";

import {
  FileInput,
  DateInput,
  TimeInput,
  LocationInput,
  TimeZoneDropdown,
} from "./components";

export default function App() {
  const [fileName, setFileName] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [timeZone, setTimeZone] = useState();
  const [coordinates, setCoordinates] = useState();
  const [command, setCommand] = useState("");

  useEffect(() => {
    if (
      fileName != null &&
      date != null &&
      time != null &&
      timeZone != null &&
      coordinates != null
    ) {
      const coordinatesString = `${coordinates.lat}, ${coordinates.lng}`;

      const dateString = formatDateString(date, time, timeZone);

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
  }, [fileName, date, time, timeZone, coordinates, command, setCommand]);

  function formatDateString(currentDate, currentTime, currentTimeZone) {
    if (!currentDate || !currentTime || !currentTimeZone) {
      return;
    }

    const formattedDate = currentDate.replace(/-/g, ":");
    const preparedString = `${formattedDate} ${currentTime}:00${currentTimeZone}`;

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

        <h2>What time of day was this taken?</h2>
        <TimeInput onChange={setTime} />

        <h2>What timezone was this taken in?</h2>
        <TimeZoneDropdown onChange={setTimeZone} />

        <h2>Where was this taken?</h2>
        <LocationInput onChange={setCoordinates} />

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
              <b>Date:</b> {formatDateString(date, time, timeZone)}
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
