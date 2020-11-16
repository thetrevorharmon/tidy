import React, { useState, useEffect } from "react";

import { ThemeProvider } from "theme-ui";
import { theme } from "./theme";

import { Box, Grid, Flex } from "theme-ui";

import {
  existingDateInformation,
  hasGoogleMapsKey,
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
  SplitButton,
} from "./components";

import "./App.css";

export default function App() {
  const [fileName, setFileName] = useState();
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [time, setTime] = useState("12:00");
  const [timeZone, setTimeZone] = useState("-07:00");
  const [coordinates, setCoordinates] = useState();
  const [command, setCommand] = useState(
    `exiftool "-datetimeoriginal=2020:11:11 12:03:00-05:00" "-CreationDate=2020:11:11 12:03:00-05:00" "-CreateDate=2020:11:11 12:03:00-05:00" "-GPSCoordinates=37.3349543, -122.0138517" "-GPSCoordinates-und-US=37.3349543, -122.0138517" "-GPSLatitude=37.3349543, -122.0138517" "-GPSLongitude=37.3349543, -122.0138517" "-Keys:GPSCoordinates=37.3349543, -122.0138517" "-Keys:GPSCoordinates-und-US=37.3349543, -122.0138517" /Users/trevorharmon/Desktop/yosemite\ 19\ video.mov`
  );

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

  const controlPanel = (
    <>
      <SplitButton command={command}>Run Command</SplitButton>
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
    </>
  );

  return (
    <ThemeProvider theme={theme}>
      <Grid
        gap={3}
        columns={[2, "1fr 500px"]}
        sx={{ height: "100%", overflow: "hidden" }}
      >
        <FileInput onChange={handleFileNameChange} />
        <Box sx={{ overflow: "scroll", p: 2, pr: 4, pl: 3, pb: 4 }}>
          {controlPanel}
        </Box>
      </Grid>
    </ThemeProvider>
  );
}
