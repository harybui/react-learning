import { Task } from "../hooks/useTasks";

interface Props {
  task: Task;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  isDark: boolean;
}
const TaskItem = ({ task, onDelete, onToggle, isDark }: Props) => {
  //React.memo chỉ re-render khi props thay đổi
  return (
    <div>
      <li
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "12px 0",
          borderBottom: isDark ? "1px solid #334155" : "1px solid #e5e7eb",
          textDecoration: task.done ? "line-through" : "none",
          opacity: task.done ? 0.6 : 1,
        }}
      >
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}
          style={{ width: 18, height: 18 }}
        />
        <span style={{ flex: 1, fontSize: 18 }}>{task.text}</span>
        <button
          onClick={() => onDelete(task.id)}
          style={{
            color: isDark ? "#fca5a5" : "#dc2626",
            border: "none",
            background: "none",
            cursor: "pointer",
            fontSize: 17,
            fontWeight: 600,
          }}
        >
          Xóa
        </button>
      </li>
    </div>
  );
};

export default TaskItem;
