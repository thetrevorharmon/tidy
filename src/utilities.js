export const existingDateInformation = /([0-9]{4}-[0-9]{2}-[0-9]{2})/;
export const hasGoogleMapsKey =
  process.env.REACT_APP_GOOGLE_MAPS_API_KEY !== "";
export const isElectron =
  navigator.userAgent.toLowerCase().indexOf(" electron/") > -1;

export function escapeFileNameForBash(fileName) {
  const fixedApostrophes = fileName.replace(/'/g, "\\'");
  const fixedSpaces = fixedApostrophes.replace(/ /g, "\\ ");

  return fixedSpaces;
}

export function formatDateStringForExiftool(date, time, timeZone) {
  if (!date || !time || !timeZone) {
    return null;
  }

  const formattedDate = date.replace(/-/g, ":");
  const preparedString = `${formattedDate} ${time}:00${timeZone}`;

  return preparedString;
}

export function prepareExifToolCommand({
  fileName,
  date,
  time,
  timeZone,
  coordinates,
}) {
  const coordinatesString = `${coordinates.lat}, ${coordinates.lng}`;

  const formattedDateString = formatDateStringForExiftool(date, time, timeZone);

  const timestamp = [
    `"-datetimeoriginal=${formattedDateString}"`,
    `"-CreationDate=${formattedDateString}"`,
    `"-CreateDate=${formattedDateString}"`,
  ];

  const gpsInformation = [
    `"-GPSCoordinates=${coordinatesString}"`,
    `"-GPSCoordinates-und-US=${coordinatesString}"`,
    `"-GPSLatitude=${coordinatesString}"`,
    `"-GPSLongitude=${coordinatesString}"`,
    `"-Keys:GPSCoordinates=${coordinatesString}"`,
    `"-Keys:GPSCoordinates-und-US=${coordinatesString}"`,
  ];

  const escapedFileName = escapeFileNameForBash(fileName);

  console.log(escapedFileName);

  const command = [
    "exiftool",
    ...timestamp,
    ...gpsInformation,
    escapedFileName,
  ].join(" ");

  return command;
}

export async function executeCommand(command) {
  return new Promise((resolve, reject) => {
    if (!window || !window.exec) {
      reject("You don't have a way to trigger a command");
    }

    return window.exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      if (stderr) {
        reject(stderr);
      }
      if (stdout) {
        resolve(stdout);
      }
    });
  });
}
