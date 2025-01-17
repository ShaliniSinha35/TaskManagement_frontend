import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Toastify styles
import { useForm } from "react-hook-form"; // Import React Hook Form

export default function Task() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState({ category: "", status: "" });

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks", {
        params: { category: filter.category, status: filter.status },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      alert(error.response?.data?.message || "Error fetching tasks");
    }
  };

  // Fetch tasks on component mount and filter change
  useEffect(() => {
    fetchTasks();
  }, [filter]);

  // Add Task Handler
  const handleAddTask = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/api/tasks", data);
      setTasks((prev) => [...prev, response.data]);
      reset({ title: "", category: "", priority: "medium", status: "incomplete" });
      setIsModalOpen(false);
    alert("Task added successfully");
    } catch (error) {
      console.error("Error adding task:", error);
      alert(error.response?.data?.message || "Error adding task");
    }
  };

  // Edit Task Handler
  const handleEditTask = (task) => {
    setEditingTask(task);
    setValue("title", task.title);
    setValue("category", task.category);
    setValue("priority", task.priority);
    setValue("status", task.status);
    setIsEditModalOpen(true);
  };

  // Save Edit Handler
  const handleSaveEdit = async (data) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/tasks/${editingTask.task_id}`,
        data
      );
      setTasks((prev) =>
        prev.map((task) =>
          task.task_id === editingTask.task_id ? response.data : task
        )
      );
      setIsEditModalOpen(false);
      setEditingTask(null);
     alert("Task updated successfully");
    } catch (error) {
      console.error("Error updating task:", error);
      alert(error.response?.data?.message || "Error updating task");
    }
  };

  // Delete Task Handler
  const handleDeleteTask = async (task_id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${task_id}`);
      setTasks((prev) => prev.filter((task) => task.task_id !== task_id));
      alert("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
     alert(error.response?.data?.message || "Error deleting task");
    }
  };

  // Filter Change Handler
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-blue-200 p-6">
      {/* Toastify Container */}
      {/* <div>{toast.configure()}</div> */}

      {/* Dashboard Header */}
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="items-start justify-between py-4 border-b md:flex">
          <h3 className="text-gray-800 text-3xl font-bold">TASK DASHBOARD</h3>
          <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
            <select
              name="category"
              value={filter.category}
              onChange={handleFilterChange}
              className="p-2 border border-blue-400 rounded-lg"
            >
              <option value="">All Categories</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
            </select>
            <select
              name="status"
              value={filter.status}
              onChange={handleFilterChange}
              className="p-2 border border-blue-400 rounded-lg"
            >
              <option value="">All Status</option>
              <option value="completed">Completed</option>
              <option value="incomplete">Incomplete</option>
            </select>
          </div>
        </div>
      </div>

      {/* Add Task Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="py-2 px-6 text-white font-medium bg-black hover:bg-gray-800 rounded-lg"
        >
          Add Task
        </button>
      </div>

      {/* Task Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {tasks.map((task) => (
          <div
            key={task.task_id}
            className={`p-4 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 ${
              task.priority === "high"
                ? "bg-red-100 border-l-4 border-red-500"
                : task.priority === "medium"
                ? "bg-yellow-100 border-l-4 border-yellow-500"
                : "bg-green-100 border-l-4 border-green-500"
            }`}
          >
            <h2 className="text-xl font-semibold text-gray-800">{task.title}</h2>
            <p className="text-sm text-gray-500">Category: {task.category || "None"}</p>
            <p className="text-sm text-gray-500">Status: {task.status}</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleEditTask(task)}
                className="px-3 py-1 bg-blue-500 text-white rounded-lg"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteTask(task.task_id)}
                className="px-3 py-1 bg-red-500 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md animate-modal-open">
            <h2 className="text-xl font-semibold mb-4">Add Task</h2>
            <form onSubmit={handleSubmit(handleAddTask)}>
              <input
                type="text"
                placeholder="Task Title"
                {...register("title", { required: "Task title is required" })}
                className="w-full p-2 mb-4 border"
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
              <input
                type="text"
                placeholder="Category"
                {...register("category")}
                className="w-full p-2 mb-4 border"
              />
              <select
                {...register("priority")}
                className="w-full p-2 mb-4 border"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Task Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md animate-modal-open">
            <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
            <form onSubmit={handleSubmit(handleSaveEdit)}>
              <input
                type="text"
                placeholder="Task Title"
                {...register("title", { required: "Task title is required" })}
                className="w-full p-2 mb-4 border"
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
              <input
                type="text"
                placeholder="Category"
                {...register("category")}
                className="w-full p-2 mb-4 border"
              />
              <select
                {...register("priority")}
                className="w-full p-2 mb-4 border"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
