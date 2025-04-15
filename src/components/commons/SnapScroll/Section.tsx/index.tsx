import { Box } from "@mui/material";

const Section = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        height: "100vh",
        scrollSnapAlign: "start",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </Box>
  );
};

export default Section;
