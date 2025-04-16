import { Box } from "@mui/material";

interface SectionProps {
  children: React.ReactNode;
  horizon?: boolean;
}

const SnapScroll = ({ children, horizon = false }: SectionProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: horizon ? "row" : "column",
        overflowX: horizon ? "auto" : "hidden",
        overflowY: horizon ? "hidden" : "auto",
        scrollSnapType: horizon ? "x mandatory" : "y mandatory",
        scrollBehavior: "smooth",
        width: "100vw",
        height: "100vh",
        border: "2px solid red",
        // "&::-webkit-scrollbar": {
        //   display: "none",
        // },
      }}
    >
      {children}
    </Box>
  );
};

export default SnapScroll;
