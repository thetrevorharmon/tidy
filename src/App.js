import React, { useState, useEffect } from "react";

import { ThemeProvider } from "theme-ui";
import { theme } from "./theme";

import { Box, Grid, Button } from "theme-ui";

import {
  existingDateInformation,
  hasGoogleMapsKey,
  executeCommand,
  isElectron,
  prepareExifToolCommand,
} from "./utilities";

import {
  FileInput,
  DateInput,
  TimeInput,
  LocationInput,
  TimeZoneDropdown,
  Map,
  CommandBox,
} from "./components";

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
      const newCommand = prepareExifToolCommand({
        fileName,
        date,
        time,
        timeZone,
        coordinates,
      });

      setCommand(newCommand);
    }
  }, [fileName, date, time, timeZone, coordinates, command, setCommand]);

  async function runCommand() {
    const response = await executeCommand("ls -la");
    console.log(response);
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
        {isElectron && hasGoogleMapsKey ? (
          <Map onChange={setCoordinates} />
        ) : (
          <LocationInput onChange={setCoordinates} />
        )}

        {command && (
          <Box>
            <h2>
              Your <code>exiftool</code> command:
            </h2>
            <CommandBox command={command} />
          </Box>
        )}

        <Button onClick={runCommand}>Clicky</Button>

        {/* <div>
          <ul>
            <li>
              <b>Name:</b> {fileName}
            </li>
            <li>
              <b>Date:</b> {formatDateStringForExiftool(date, time, timeZone)}
            </li>
            <li>
              <b>Coordinates:</b> {coordinates?.lat}, {coordinates?.lng}
            </li>
          </ul>
        </div> */}
      </div>
    </ThemeProvider>
  );
}
