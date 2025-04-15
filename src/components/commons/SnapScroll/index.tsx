import { Box } from "@mui/material";

interface SectionProps {
  children: React.ReactNode;
}

const SnapScroll = ({ children }: SectionProps) => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
        scrollBehavior: "smooth",
        scrollPadding: "1px",
      }}
    >
      {children}
    </Box>
  );
};

export default SnapScroll;
