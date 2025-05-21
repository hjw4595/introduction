import { useState } from "react";

import ItemManager from "./List";
import ProgressViewer from "./Progress";

import { Checkbox, FormControlLabel } from "@mui/material";

export default function FogGodRaid() {
  const [items, setItems] = useState<string[]>([]);
  const [isStarted, setIsStarted] = useState(false);
  const [viewIndex, setViewIndex] = useState(0);
  const [sortOrder, setSortOrder] = useState<"deal" | "buff">("deal");

  const handleAddItem = (value: string) => {
    setItems((prev) => [...prev, value]);
  };

  const handleDeleteItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleReorderItems = (from: number, to: number) => {
    const updated = [...items];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setItems(updated);
  };

  const handleStart = () => {
    if (items.length === 0) {
      alert("아이템을 먼저 추가하세요!");
      return;
    }
    setViewIndex(0);
    setIsStarted(true);
  };

  const handleNext = () => {
    setViewIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setViewIndex((prev) => prev - 1);
  };

  const handleChangeCheckBox = (args: "deal" | "buff") => {
    setSortOrder(args);
  };
  return (
    <div style={{ padding: 40, maxWidth: 600 }}>
      <h3>역순 계산</h3>
      <FormControlLabel
        label="딜부터"
        control={
          <Checkbox
            checked={sortOrder === "deal"}
            onChange={() => handleChangeCheckBox("deal")}
            disabled={isStarted}
          />
        }
      />
      <FormControlLabel
        label="버퍼부터"
        control={
          <Checkbox
            checked={sortOrder === "buff"}
            onChange={() => handleChangeCheckBox("buff")}
            disabled={isStarted}
          />
        }
      />
      {!isStarted ? (
        <ItemManager
          items={items}
          onAddItem={handleAddItem}
          onDeleteItem={handleDeleteItem}
          onReorderItems={handleReorderItems}
          onStart={handleStart}
        />
      ) : (
        <ProgressViewer
          items={items}
          viewIndex={viewIndex}
          onNext={handleNext}
          onPrev={handlePrev}
          sortOrder={sortOrder}
        />
      )}
    </div>
  );
}
