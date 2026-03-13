import { useState, useEffect, useCallback, useMemo } from "react";

// Định nghĩa cấu trúc một Task
export interface Task {
  id: number;
  text: string;
  done: boolean;
}

// Dữ liệu giả lập API (thay cho fetch thật)
const FAKE_API_DATA: Task[] = [
  { id: 1, text: "Học React Hooks", done: false },
  { id: 2, text: "Làm bài tập tổng hợp", done: true },
  { id: 3, text: "Review code với mentor", done: false },
];

// Custom Hook: gom toàn bộ logic quản lý tasks vào đây
export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "active" | "done">("all");

  // useEffect: giả lập gọi API khi component lần đầu mount
  useEffect(() => {
    setIsLoading(true);
    // Giả lập delay mạng 800ms
    const timer = setTimeout(() => {
      setTasks(FAKE_API_DATA);
      setIsLoading(false);
    }, 800);

    // Cleanup: hủy timer nếu component bị unmount trước khi timer chạy xong
    return () => clearTimeout(timer);
  }, []); // [] = chỉ chạy 1 lần khi mount

  // useCallback: ghi nhớ hàm thêm task — không tạo hàm mới mỗi lần render
  const addTask = useCallback((text: string) => {
    if (!text.trim()) return; // Không thêm nếu rỗng
    const newTask: Task = {
      id: Date.now(), // Dùng timestamp làm ID tạm thời
      text: text.trim(),
      done: false,
    };
    setTasks((prev) => [...prev, newTask]);
  }, []); // Không có dependency vì dùng functional update `prev =>`

  // useCallback: ghi nhớ hàm xóa task
  const deleteTask = useCallback((id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  // useCallback: ghi nhớ hàm toggle done/undone
  const toggleTask = useCallback((id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }, []);

  // useMemo: chỉ tính lại danh sách lọc khi tasks hoặc filter thay đổi
  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "active": return tasks.filter((t) => !t.done);
      case "done":   return tasks.filter((t) => t.done);
      default:       return tasks; // "all"
    }
  }, [tasks, filter]);

  // useMemo: chỉ tính lại thống kê khi tasks thay đổi
  const stats = useMemo(() => ({
    total: tasks.length,
    done: tasks.filter((t) => t.done).length,
    active: tasks.filter((t) => !t.done).length,
  }), [tasks]);

  // Trả về tất cả state và hàm mà component cần dùng
  return {
    tasks: filteredTasks,
    isLoading,
    filter,
    setFilter,
    stats,
    addTask,
    deleteTask,
    toggleTask,
  };
}