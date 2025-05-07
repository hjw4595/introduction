import React, { useState } from "react";

export default function SequentialViewer() {
  const [items, setItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const [isStarted, setIsStarted] = useState(false);
  const [viewIndex, setViewIndex] = useState(0);

  // 아이템 추가
  const handleAddItem = () => {
    if (inputValue.trim() === "") return;
    setItems((prev) => [...prev, inputValue]);
    setInputValue("");
  };

  // 엔터로 아이템 추가
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddItem();
    }
  };

  // 아이템 삭제
  const handleDelete = (index: number) => () => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  // 드래그 이벤트
  const handleDragStart = (index: number) => () => {
    setDragIndex(index);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (dropIndex: number) => () => {
    if (dragIndex === null || dragIndex === dropIndex) return;
    const updated = [...items];
    const [movedItem] = updated.splice(dragIndex, 1);
    updated.splice(dropIndex, 0, movedItem);
    setItems(updated);
    setDragIndex(null);
  };

  // 시작 버튼
  const handleStart = () => {
    if (items.length === 0) {
      alert("아이템을 먼저 추가하세요!");
      return;
    }
    setViewIndex(0);
    setIsStarted(true);
  };

  // 다음 버튼
  const handleNext = () => {
    setViewIndex((prev) => prev + 1);
  };

  const leftIndex = viewIndex;
  const rightIndex = items.length - 1 - viewIndex;
  const leftItem = items[leftIndex];
  const rightItem = items[rightIndex];
  const isFinished = viewIndex >= items.length;

  return (
    <div style={{ padding: 40, maxWidth: 600 }}>
      역순 계산
      {!isStarted && (
        <>
          {/* 입력 영역 */}
          <div style={{ display: "flex", marginBottom: 20 }}>
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown} // 엔터로 추가
              placeholder="아이템을 입력하세요"
              style={{ flex: 1, padding: 8 }}
            />
            <button
              onClick={handleAddItem}
              style={{ marginLeft: 8, padding: "8px 16px" }}
            >
              추가
            </button>
          </div>

          {/* 아이템 리스트 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              marginBottom: 20,
            }}
          >
            {items.map((text, index) => (
              <div
                key={index}
                draggable
                onDragStart={handleDragStart(index)}
                onDragOver={handleDragOver}
                onDrop={handleDrop(index)}
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
                <span>{text}</span>
                <button
                  onClick={handleDelete(index)}
                  style={{ marginLeft: 12 }}
                >
                  삭제
                </button>
              </div>
            ))}
          </div>

          <button onClick={handleStart} style={{ padding: "8px 16px" }}>
            시작
          </button>
        </>
      )}
      {/* 진행 중일 때 */}
      {isStarted && (
        <>
          {!isFinished ? (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <div style={boxStyle}>
                  <div>딜</div>
                  {leftItem ?? ""}
                </div>
                <div style={boxStyle}>
                  <div>벞</div>
                  {rightItem ?? ""}
                </div>
              </div>
              <button onClick={handleNext} style={{ padding: "8px 16px" }}>
                다음
              </button>
            </>
          ) : (
            <div
              style={{
                padding: 20,
                backgroundColor: "#d4edda",
                borderRadius: 8,
              }}
            >
              ✅ 끝
            </div>
          )}
        </>
      )}
    </div>
  );
}

const boxStyle: React.CSSProperties = {
  flex: 1,
  backgroundColor: "#f9f9f9",
  border: "2px dashed #ccc",
  padding: 20,
  borderRadius: 8,
  minHeight: 80,
  textAlign: "center",
  margin: "0 8px",
};
