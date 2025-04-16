import { Box } from "@mui/material";

const HorizonSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        scrollSnapAlign: "start",
        flexShrink: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "4rem",
        background: "#f0f0f0",
        border: "1px solid #ccc",
      }}
    >
      {children}
    </Box>
  );
};

export default HorizonSection;
