import React from "react";

interface ProgressViewerProps {
  items: string[];
  viewIndex: number;
  sortOrder: "deal" | "buff";
  onNext: () => void;
  onPrev: () => void;
}

export default function Progress({
  items,
  viewIndex,
  sortOrder,
  onNext,
  onPrev,
}: ProgressViewerProps) {
  const isFinished = viewIndex >= items.length;

  const asc = items[viewIndex];
  const desc = items[items.length - 1 - viewIndex];
  const deal = sortOrder === "deal" ? asc : desc;
  const buff = sortOrder === "deal" ? desc : asc;

  const boxStyle: React.CSSProperties = {
    backgroundColor: "#f9f9f9",
    border: "2px dashed #ccc",
    padding: 20,
    borderRadius: 8,
    minWidth: "8rem",
    minHeight: 50,
    margin: "2rem",
    textAlign: "center",
  };

  return (
    <>
      {!isFinished ? (
        <>
          <div>
            진행도 : ( {viewIndex + 1} / {items.length} )
            <div style={boxStyle}>
              <div>딜</div>
              {deal}
            </div>
            <div style={boxStyle}>
              <div>벞</div>
              {buff}
            </div>
          </div>
          <button
            disabled={viewIndex === 0}
            onClick={onPrev}
            style={{ padding: "8px 16px", marginRight: "2rem" }}
          >
            이전
          </button>
          <button onClick={onNext} style={{ padding: "8px 16px" }}>
            다음
          </button>
        </>
      ) : (
        <div
          style={{ padding: 20, backgroundColor: "#d4edda", borderRadius: 8 }}
        >
          ✅ 끝
        </div>
      )}
    </>
  );
}
