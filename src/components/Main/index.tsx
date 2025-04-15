import { Box } from "@mui/material";

import Section from "../commons/SnapScroll/Section.tsx";

import SnapScroll from "../commons/SnapScroll";
import Experience from "../Experience";
import Intro from "../Intro";

function Main() {
  return (
    <Box>
      <SnapScroll>
        <Section>
          <Intro />
        </Section>
        <Section>
          <Experience />
        </Section>
      </SnapScroll>
    </Box>
  );
}

export default Main;
