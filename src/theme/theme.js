const heading = {
  color: "text",
  fontFamily: "heading",
  lineHeight: "heading",
  fontWeight: "heading",
};

export const theme = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body:
      'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: "inherit",
    monospace: "Menlo, monospace",
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  cards: {
    primary: {
      background: "white",
      borderRadius: "20px",
      padding: 3,
    },
  },
  buttons: {
    primary: {
      fontFamily: "inherit",
      "&:hover": {
        cursor: "pointer",
      },
    },
    daring: {
      fontFamily: "inherit",
      background: "black",
      "&:hover": {
        cursor: "pointer",
      },
    },
    transparentPrimary: {
      fontFamily: "inherit",
      background: "primary",
      opacity: 0.7,
      "&:hover": {
        opacity: 1.0,
        cursor: "pointer",
      },
    },
    disabled: {
      fontFamily: "inherit",
      background: "gray",
      "&:hover": {
        cursor: "not-allowed",
      },
    },
  },
  forms: {
    label: {
      fontFamily: "inherit",
      fontSize: 2,
    },
    input: {
      fontFamily: "inherit",
      mt: 2,
      mb: 3,
    },
    select: {
      fontFamily: "inherit",
    },
  },
  colors: {
    text: "#2a2a2a",
    background: "#fff",
    primary: "#07c",
    secondary: "#30c",
    muted: "#f6f6f6",
  },
  styles: {
    root: {
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body",
    },
    h1: {
      ...heading,
      fontSize: 5,
    },
    h2: {
      ...heading,
      fontSize: 4,
    },
    h3: {
      ...heading,
      fontSize: 3,
    },
    h4: {
      ...heading,
      fontSize: 2,
    },
    h5: {
      ...heading,
      fontSize: 1,
    },
    h6: {
      ...heading,
      fontSize: 0,
    },
    p: {
      color: "text",
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body",
    },
    a: {
      color: "primary",
    },
    pre: {
      fontFamily: "monospace",
      overflowX: "auto",
      code: {
        color: "inherit",
      },
    },
    code: {
      fontFamily: "monospace",
      fontSize: "inherit",
    },
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: 0,
    },
    th: {
      textAlign: "left",
      borderBottomStyle: "solid",
    },
    td: {
      textAlign: "left",
      borderBottomStyle: "solid",
    },
    img: {
      maxWidth: "100%",
    },
  },
};
