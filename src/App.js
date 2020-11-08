import React, { useState, useEffect } from "react";

import { ThemeProvider } from "theme-ui";
import { theme } from "./theme";

import { Textarea, Box, Grid } from "theme-ui";

import {
  FileInput,
  DateInput,
  TimeInput,
  LocationInput,
  TimeZoneDropdown,
  Map,
} from "./components";

const existingDateInformation = /([0-9]{4}-[0-9]{2}-[0-9]{2})/;

export default function App() {
  const [fileName, setFileName] = useState();
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [time, setTime] = useState("12:00");
  const [timeZone, setTimeZone] = useState("-07:00");
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

  function handleFileNameChange(fileNameOrPath) {
    if (fileNameOrPath == null) {
      return;
    }

    const fileNameOrPathParts = fileNameOrPath.split("/");
    const fileName = fileNameOrPathParts[fileNameOrPathParts.length - 1];

    const matches = fileName.match(existingDateInformation);

    if (matches) {
      const [dateInformation] = matches;
      setDate(dateInformation);
    }

    setFileName(fileNameOrPath);
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={{ margin: 30 }}>
        <h1>Tidy 🧹</h1>

        <h2>Choose a file</h2>
        <FileInput onChange={handleFileNameChange} />

        <h2>When was this taken?</h2>
        <Grid gap={3} columns={[3, "1fr 1fr 1.2fr"]}>
          <DateInput value={date} onChange={setDate} />
          <TimeInput value={time} onChange={setTime} />
          <TimeZoneDropdown value={timeZone} onChange={setTimeZone} />
        </Grid>

        <h2>Where was this taken?</h2>
        <LocationInput onChange={setCoordinates} />

        {fileName && date && coordinates && (
          <Box>
            <h2>
              Your <code>exiftool</code> command:
            </h2>
            <Textarea value={command} readonly sx={{ minHeight: 180 }} />
          </Box>
        )}

        <Map />

        <div>
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
        </div>
      </div>
    </ThemeProvider>
  );
}
