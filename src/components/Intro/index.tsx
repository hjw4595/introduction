import { Box } from "@mui/material";

const SIMPLE_INTRO = "안녕하세요. 프론트엔드 개발자 홍정완입니다.";
const PHONE = "010-8982-6260";
const EMAIL = "hongjung73@gmail.com";
const GITHUB = "https://github.com/hjw4595";

const Subtitle = ({ title }: { title: string }) => {
  return <Box sx={{ fontSize: "18px", fontWeight: "bold" }}>{title}</Box>;
};

function Intro() {
  return (
    <Box sx={{ height: `100vh` }}>
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            height: "120px",
            width: "100px",
            border: "1px solid black",
            marginRight: "20px",
          }}
        >
          image
        </Box>
        <div>
          <div>연락처</div>
          <Box sx={{ display: "flex", verticalAlign: "middle " }}>
            <Subtitle title={"phone"} />
            <Box>{PHONE}</Box>
          </Box>
          <div>email : {EMAIL}</div>
          <div>github : {GITHUB}</div>
        </div>
      </Box>
      <div>{SIMPLE_INTRO}</div>
    </Box>
  );
}

export default Intro;
