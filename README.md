# Tidy

This is a little app to help tidy up missing media metadata. It's an electron app that ultimately wraps a CLI, [exiftool](https://exiftool.org/).

The end goal is to wrap the following command:

```bash
exiftool \
 "-datetimeoriginal=1997:05:16 21:41:00-04:00" \
 "-CreationDate=1997:05:16 21:41:00-04:00" \
 "-CreateDate=1997:05:16 21:41:00-04:00" \
 "-GPSCoordinates=33.429195,-111.7499481" \
 "-GPSCoordinates-und-US=33.429195,-111.7499481" \
 "-GPSLatitude=33.429195" \
 "-GPSLongitude=-111.7499481" \
 "-Keys:GPSCoordinates=33.429195,-111.7499481" \
 "-Keys:GPSCoordinates-und-US=33.429195,-111.7499481" name-of-media.mov
```

Some things about this command:

1. I modify `datetimeoriginal`, `CreationDate`, and `CreateDate` because various photo services (Google, Apple, etc) care about different things
2. Same thing about the `GPS Coordinates`. Google specifically requires the `Keys:` prefix.

Things this repo uses:

- React
- Electron
- Theme UI
- Prettier & ESLint
