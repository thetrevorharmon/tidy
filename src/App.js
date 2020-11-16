import React, { useState, useEffect } from "react";

import { ThemeProvider } from "theme-ui";
import { theme } from "./theme";

import { Box, Grid, Heading, Card } from "theme-ui";

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
} from "./components";

import "./App.css";

export default function App() {
  const [fileName, setFileName] = useState();
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [time, setTime] = useState("12:00");
  const [timeZone, setTimeZone] = useState("-07:00");
  const [coordinates, setCoordinates] = useState();
  const [command, setCommand] = useState();

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
      <Card sx={{ mt: 3 }}>
        <Heading as="h2" sx={{ mt: 1, mb: 3 }}>
          When was this taken?
        </Heading>
        <Grid gap={3} columns={[2, "1fr 1fr"]}>
          <DateInput value={date} onChange={setDate} />
          <TimeInput value={time} onChange={setTime} />
          <Box sx={{ gridColumn: "1 / span 2" }}>
            <TimeZoneDropdown value={timeZone} onChange={setTimeZone} />
          </Box>
        </Grid>
      </Card>

      <Card sx={{ mt: 3 }}>
        <Heading as="h2" sx={{ mt: 1, mb: 4 }}>
          Where was this taken?
        </Heading>
        {isElectron && hasGoogleMapsKey ? (
          <Map onChange={setCoordinates} />
        ) : (
          <LocationInput onChange={setCoordinates} />
        )}
      </Card>

      <Box sx={{ mt: 3 }}>
        <CommandBox command={command} />
      </Box>
    </>
  );

  return (
    <ThemeProvider theme={theme}>
      <Grid
        gap={0}
        columns={[2, "1fr 500px"]}
        sx={{ height: "100%", overflow: "hidden" }}
      >
        <FileInput onChange={handleFileNameChange} />
        <Box
          sx={{
            overflow: "scroll",
            background: "#F1F2F6",
            pt: 1,
            pr: 3,
            pl: 3,
            pb: 3,
          }}
        >
          {controlPanel}
        </Box>
      </Grid>
    </ThemeProvider>
  );
}
