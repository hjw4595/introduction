import { Box } from "@mui/material";

const Section = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        scrollSnapAlign: "start",
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        overflowX: "visible",
      }}
    >
      {children}
    </Box>
  );
};

export default Section;
