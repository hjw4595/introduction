import { Box } from "@mui/material";
import React from "react";

interface ItemManagerProps {
  items: string[];
  onAddItem: (value: string) => void;
  onDeleteItem: (index: number) => void;
  onReorderItems: (from: number, to: number) => void;
  onStart: () => void;
}

export default function List({
  items,
  onAddItem,
  onDeleteItem,
  onReorderItems,
  onStart,
}: ItemManagerProps) {
  const [inputValue, setInputValue] = React.useState("");
  const [dragIndex, setDragIndex] = React.useState<number | null>(null);

  const handleAdd = () => {
    if (inputValue.trim() !== "") {
      onAddItem(inputValue);
      setInputValue("");
    }
  };

  return (
    <>
      <div style={{ display: "flex", marginBottom: 20 }}>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="추가할 모험단"
          style={{ flex: 1, padding: 8 }}
        />
        <button
          onClick={handleAdd}
          style={{ marginLeft: 8, padding: "8px 16px" }}
        >
          추가
        </button>
      </div>

      <div>{`추가된 모험단 수 : ${items.length}`}</div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          marginBottom: 20,
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            draggable
            onDragStart={() => setDragIndex(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              if (dragIndex !== null && dragIndex !== index) {
                onReorderItems(dragIndex, index);
                setDragIndex(null);
              }
            }}
            style={{
              backgroundColor: "#f0f8ff",
              border: "1px solid #99cfff",
              padding: "12px 16px",
              borderRadius: 8,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "grab",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Box sx={{ marginRight: "8px" }}>{`${index + 1}` + " : "}</Box>
              <div>{item}</div>
            </Box>
            <button
              onClick={() => onDeleteItem(index)}
              style={{ marginLeft: 12 }}
            >
              ➖
            </button>
          </div>
        ))}
      </div>

      <button onClick={onStart} style={{ padding: "8px 16px" }}>
        시작
      </button>
    </>
  );
}
