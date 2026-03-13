import React, { useState, useRef, useEffect } from "react";

interface Props {
  onAdd: (text: string) => void;
  isDark: boolean;
}

const TaskInput = ({ onAdd, isDark }: Props) => {
  const [inputText, setInputText] = useState("");

  //useRef để giữ tham chiếu đến input DOM element
  const inputRef = useRef<HTMLInputElement>(null);

  //useEffect : auto focus vào ô input khi component xuất hiện
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const HandleAdd = () => {
    if (!inputText.trim()) return;
    onAdd(inputText);
    setInputText("");
    inputRef.current?.focus();
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") HandleAdd();
  };

  return (
    <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
      <input
        ref={inputRef}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="nhập task mới"
        style={{
          flex: 1,
          padding: "12px 14px",
          borderRadius: 10,
          fontSize: 18,
          border: isDark ? "1px solid #334155" : "1px solid #cbd5e1",
          backgroundColor: isDark ? "#0f172a" : "#ffffff",
          color: isDark ? "#e2e8f0" : "#0f172a",
        }}
      />
      <button
        onClick={HandleAdd}
        style={{
          padding: "12px 20px",
          borderRadius: 10,
          border: "none",
          fontSize: 18,
          fontWeight: 600,
          backgroundColor: isDark ? "#1d4ed8" : "#2563eb",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Thêm
      </button>
    </div>
  );
};

export default TaskInput;
