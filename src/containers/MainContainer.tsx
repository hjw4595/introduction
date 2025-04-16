import Intro from "../pages/Intro";
import FullPageScroll from "../components/commons/FullpageScroll";
import Experience from "../pages/Experience";

function MainContainer() {
  return (
    <FullPageScroll>
      <Intro />
      <Experience />
      <Intro />
    </FullPageScroll>
  );
}

export default MainContainer;
