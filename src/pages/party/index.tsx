import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper, Grid } from "@mui/material";

export default function PartyBuilder() {
  const [dealerGroupName, setDealerGroupName] = useState("");
  const [dealerGroups, setDealerGroups] = useState<
    { groupName: string; dealers: string[]; input: string }[]
  >([]);
  const [bufferName, setBufferName] = useState("");
  const [groups, setGroups] = useState<{ buffer: string; party: string[] }[]>(
    []
  );
  const [dealerToGroup, setDealerToGroup] = useState<Record<string, string>>(
    {}
  );
  const [error, setError] = useState<string | null>(null);

  // 그룹에 딜러 추가하기
  const addDealerToGroup = (groupIdx: number) => {
    const newDealers = dealerGroups[groupIdx].input
      .trim()
      .split(/\s+/) // 공백 기준으로 여러 딜러 등록
      .filter((dealer) => dealer !== "");
    if (!newDealers.length) return;

    const updatedGroups = [...dealerGroups];
    const current = updatedGroups[groupIdx];
    const uniqueDealers = newDealers.filter(
      (d) => !current.dealers.includes(d)
    );
    updatedGroups[groupIdx] = {
      ...current,
      dealers: [...current.dealers, ...uniqueDealers],
      input: "",
    };

    // 딜러 그룹 추적
    setDealerToGroup((prevMap) => {
      const newMap = { ...prevMap };
      uniqueDealers.forEach((d) => {
        newMap[d] = dealerGroups[groupIdx].groupName;
      });
      return newMap;
    });

    setDealerGroups(updatedGroups);
  };

  // 딜러 그룹 추가
  const addDealerGroup = () => {
    const name = dealerGroupName.trim();
    if (name && !dealerGroups.find((g) => g.groupName === name)) {
      setDealerGroups((prev) => [
        ...prev,
        { groupName: name, dealers: [], input: "" },
      ]);
      setDealerGroupName("");
    }
  };

  // 버퍼 추가
  const addBuffer = () => {
    const name = bufferName.trim();
    if (name) {
      setGroups((prev) => [...prev, { buffer: name, party: [] }]);
      setBufferName("");
    }
  };

  // 드래그 시작
  const onDragStart = (
    e: React.DragEvent,
    dealer: string,
    fromGroupIdx: number
  ) => {
    e.dataTransfer.setData("dealer", dealer);
    e.dataTransfer.setData("fromGroupIdx", String(fromGroupIdx));
  };

  // 드래그 후 파티에 추가
  const handleDrop = (e: React.DragEvent, groupIdx: number) => {
    e.preventDefault();
    const dealer = e.dataTransfer.getData("dealer");
    const fromGroupIdx = parseInt(e.dataTransfer.getData("fromGroupIdx"), 10);
    if (!dealer || isNaN(fromGroupIdx)) return;

    setGroups((prev) => {
      const newGroups = [...prev];
      const party = newGroups[groupIdx].party;

      const dealerGroupName = dealerToGroup[dealer];

      const sameGroupDealerExists = party.some(
        (d) => dealerToGroup[d] === dealerGroupName
      );

      if (sameGroupDealerExists) {
        // 경고: 한 파티에 같은 그룹의 딜러는 한 명만 등록할 수 있습니다
        setError(
          `"${dealerGroupName}" 그룹의 딜러는 한 파티에 한 명만 등록할 수 있습니다.`
        );
        return newGroups;
      }

      if (party.length < 3 && !party.includes(dealer)) {
        party.push(dealer);

        setDealerGroups((prevGroups) => {
          const updated = [...prevGroups];
          updated[fromGroupIdx].dealers = updated[fromGroupIdx].dealers.filter(
            (d) => d !== dealer
          );
          return updated;
        });

        setError(null); // 경고 없애기
      }

      return newGroups;
    });
  };

  // 그룹에서 딜러 제거
  const removeDealerFromGroup = (groupIdx: number, dealer: string) => {
    setGroups((prev) => {
      const newGroups = [...prev];
      newGroups[groupIdx].party = newGroups[groupIdx].party.filter(
        (d) => d !== dealer
      );
      return newGroups;
    });

    const groupName = dealerToGroup[dealer];
    if (!groupName) return;

    setDealerGroups((prev) => {
      const updated = [...prev];
      const targetGroup = updated.find((g) => g.groupName === groupName);
      if (targetGroup && !targetGroup.dealers.includes(dealer)) {
        targetGroup.dealers.push(dealer);
      }
      return updated;
    });
  };

  const saveToJsonFile = () => {
    const data = { dealerGroups, groups, dealerToGroup }; // 저장할 데이터
    const json = JSON.stringify(data, null, 2); // 예쁘게 포맷된 JSON 문자열

    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "party-data.json"; // 다운로드 파일명
    a.click();
    URL.revokeObjectURL(url);
  };

  // 파일 업로드 처리
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          setDealerGroups(data.dealerGroups || []);
          setGroups(data.groups || []);
          setDealerToGroup(data.dealerToGroup || {});
        } catch (err) {
          console.error("잘못된 JSON 파일입니다.");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* 딜러 그룹 추가 */}
      <Typography variant="h5" gutterBottom>
        딜러 그룹 추가
      </Typography>
      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        <TextField
          label="그룹 이름"
          value={dealerGroupName}
          onChange={(e) => setDealerGroupName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addDealerGroup()}
        />
        <Button variant="contained" onClick={addDealerGroup}>
          추가
        </Button>
      </Box>

      {/* 각 딜러 그룹 렌더링 */}
      {dealerGroups.map((group, groupIdx) => (
        <Box key={groupIdx} sx={{ mb: 3 }}>
          <Typography variant="subtitle1">{group.groupName} 그룹</Typography>
          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            <TextField
              label="딜러 이름"
              value={group.input}
              onChange={(e) => {
                const updatedGroups = [...dealerGroups];
                updatedGroups[groupIdx].input = e.target.value;
                setDealerGroups(updatedGroups);
              }}
              onKeyDown={(e) => e.key === "Enter" && addDealerToGroup(groupIdx)}
            />
            <Button
              variant="outlined"
              onClick={() => addDealerToGroup(groupIdx)}
            >
              딜러 추가
            </Button>
          </Box>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
            {group.dealers.map((dealer, idx) => (
              <Paper
                key={idx}
                draggable
                onDragStart={(e) => onDragStart(e, dealer, groupIdx)}
                sx={{
                  p: 1,
                  cursor: "grab",
                  minWidth: 80,
                  textAlign: "center",
                  backgroundColor: "#f5f5f5",
                }}
              >
                {dealer}
              </Paper>
            ))}
          </Box>
        </Box>
      ))}

      {/* 버퍼 및 파티 섹션 */}
      <Typography variant="h5" gutterBottom>
        버퍼 등록
      </Typography>
      <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
        <TextField
          label="버퍼 이름"
          value={bufferName}
          onChange={(e) => setBufferName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addBuffer()}
        />
        <Button variant="contained" onClick={addBuffer}>
          파티 생성
        </Button>
      </Box>

      {/* 파티 그리드 */}
      <Grid container spacing={3}>
        {groups.map((group, groupIdx) => (
          <Grid item xs={12} sm={6} md={4} key={groupIdx}>
            <Paper
              sx={{ p: 2 }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, groupIdx)}
            >
              <Typography variant="h6" gutterBottom>
                버퍼: {group.buffer}
              </Typography>
              <Box sx={{ display: "flex", mt: 1 }}>
                {group.party.map((dealer, idx) => (
                  <Paper
                    key={idx}
                    sx={{
                      p: 1,
                      mr: 1,
                      backgroundColor: "#e0f7fa",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {dealer}
                    <Box
                      onClick={() => removeDealerFromGroup(groupIdx, dealer)}
                    >
                      ➖
                    </Box>
                  </Paper>
                ))}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* 에러 메시지 */}
      {error && <Typography color="error">{error}</Typography>}
      <Box sx={{ mt: 3 }}>
        <Button variant="outlined" onClick={saveToJsonFile}>
          JSON으로 저장
        </Button>
        <input
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          style={{ display: "none" }}
          id="file-upload"
        />
        <label htmlFor="file-upload">
          <Button variant="outlined" component="span">
            JSON 파일 업로드
          </Button>
        </label>
      </Box>
    </Box>
  );
}
