import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { useTasks } from "./hooks/useTasks";
import TaskInput from "./components/TaskInput";
import TaskItem from "./components/TaskItem";

// Component chính — dùng tất cả hook thông qua useTasks
const TaskManager = () => {
  const { theme, toggleTheme } = useTheme(); // Lấy theme từ Context

  const {
    tasks,
    isLoading,
    filter,
    setFilter,
    stats,
    addTask,
    deleteTask,
    toggleTask,
  } = useTasks(); // Lấy toàn bộ logic từ Custom Hook

  const isDark = theme === "dark";

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: isDark ? "#1a1a2e" : "#f0f4f8",
        color: isDark ? "#eee" : "#333",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          width: "min(760px, 100%)",
          backgroundColor: isDark ? "#16213e" : "#fff",
          borderRadius: 16,
          padding: 32,
          boxShadow: isDark
            ? "0 16px 40px rgba(0,0,0,0.35)"
            : "0 16px 40px rgba(15, 23, 42, 0.12)",
          height: "fit-content",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
            gap: 12,
          }}
        >
          <h2 style={{ margin: 0, fontSize: 38 }}>Mini Task Manager</h2>
          <button
            onClick={toggleTheme}
            title="Đổi theme"
            style={{
              border: "none",
              borderRadius: 999,
              padding: "10px 14px",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              backgroundColor: isDark ? "#2d2d5e" : "#e2e8f0",
              color: isDark ? "#f8fafc" : "#0f172a",
            }}
          >
            {isDark ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {/* Ô nhập task */}
        <TaskInput onAdd={addTask} isDark={isDark} />

        {/* Thống kê */}
        <p
          style={{
            fontSize: 18,
            color: isDark ? "#aaa" : "#666",
            marginBottom: 18,
          }}
        >
          Tổng: <b>{stats.total}</b> task | Xong: <b>{stats.done}</b> | Đang
          làm: <b>{stats.active}</b>
        </p>

        {/* Bộ lọc */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 20,
            flexWrap: "wrap",
          }}
        >
          {(["all", "active", "done"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "8px 16px",
                borderRadius: 20,
                border: "none",
                fontSize: 20,
                fontWeight: 600,
                cursor: "pointer",
                backgroundColor:
                  filter === f ? "#4f46e5" : isDark ? "#2d2d5e" : "#e5e7eb",
                color: filter === f ? "#fff" : isDark ? "#eee" : "#333",
              }}
            >
              {{ all: "Tất cả", active: "Đang làm", done: "Đã xong" }[f]}
            </button>
          ))}
        </div>

        {/* Danh sách task */}
        {isLoading ? (
          <p style={{ textAlign: "center", color: "#999", fontSize: 18 }}>
            Đang tải...
          </p>
        ) : tasks.length === 0 ? (
          <p style={{ textAlign: "center", color: "#999", fontSize: 18 }}>
            {filter === "all"
              ? "Chưa có task nào. Thêm task mới!"
              : "Không có task nào ở mục này."}
          </p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={deleteTask}
                onToggle={toggleTask}
                isDark={isDark}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

// App bọc trong ThemeProvider để mọi component đều truy cập được theme
function App() {
  return (
    <ThemeProvider>
      <TaskManager />
    </ThemeProvider>
  );
}

export default App;
