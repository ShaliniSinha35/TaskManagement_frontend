import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css"; 
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; 
import { FaTasks, FaPlus, FaTimes } from "react-icons/fa"; 
import { HiOutlineClipboardList } from "react-icons/hi";
import { BsCheckCircle, BsExclamationCircle } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa"; // Importing the back icon
import "animate.css";


export default function Task() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState({ category: "", status: "" });


  const [allCategories,setAllCategories]= useState([])

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  
  const handleGoBack = () => {
    window.history.back(); // Go back to the previous page
  };
 
  const fetchTasks = async () => {
    try {
      const response = await axios.get("https://taskmanagement-backend-1.onrender.com/api/tasks", {
        params: { category: filter.category, status: filter.status },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      alert(error.response?.data?.message || "Error fetching tasks");
    }
  };


  const getAllTasksCategory = async () => {
    try {
      const response = await axios.get("https://taskmanagement-backend-1.onrender.com/api/alltasks");
      if(response.data.length!=0){
        const uniqueCategories = [...new Set(response.data.map((value) => value.category))];
        setAllCategories(uniqueCategories);
      }
     
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error(error.response?.data?.message || "Error fetching tasks");
    }
  };


  useEffect(() => {
    fetchTasks();
  }, [filter]);

  useEffect(() => {
    getAllTasksCategory()
  }, [tasks]);


  const handleAddTask = async (data) => {
    try {
      const response = await axios.post("https://taskmanagement-backend-1.onrender.com/api/tasks", data);
      setTasks((prev) => [...prev, response.data]);
      reset({ title: "", category: "", priority: "medium", status: "incomplete" });
      setIsModalOpen(false);
      toast.success("Task added successfully!");
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error(error.response?.data?.message || "Error adding task");
    }
  };

  
  const handleEditTask = (task) => {
    setEditingTask(task);
    setValue("title", task.title);
    setValue("category", task.category);
    setValue("priority", task.priority);
    setValue("status", task.status);
    setIsEditModalOpen(true);
  };


  const handleSaveEdit = async (data) => {
    try {
      const response = await axios.put(
        `https://taskmanagement-backend-1.onrender.com/api/tasks/${editingTask.task_id}`,
        data
      );
      setTasks((prev) =>
        prev.map((task) =>
          task.task_id === editingTask.task_id ? response.data : task
        )
      );
      setIsEditModalOpen(false);
      setEditingTask(null);
      toast.success("Task added successfully!");
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error(error.response?.data?.message || "Error updating task");
    }
  };


  const handleDeleteTask = async (task_id) => {
    try {
      await axios.delete(`https://taskmanagement-backend-1.onrender.com/api/tasks/${task_id}`);
      setTasks((prev) => prev.filter((task) => task.task_id !== task_id));
      toast.success("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
     toast.error(error.response?.data?.message || "Error deleting task");
    }
  };


  const handleToggleStatus = async (task_id, currentStatus) => {
    try {
      // Determine the new status
      const updatedStatus = currentStatus === "completed" ? "incomplete" : "completed";
  
      // Log the operation for debugging
      console.log("Toggling status for task:", task_id);
      console.log("Current Status:", currentStatus);
      console.log("Updated Status:", updatedStatus);
  
      // Make the API call to update the status
      const response = await axios.put(`https://taskmanagement-backend-1.onrender.com/api/updateStatustasks/${task_id}`, {
        status: updatedStatus,
      });
  
      console.log("API Response:", response.data);
  
      // Update the task in the local state
      setTasks((prev) =>
        prev.map((task) =>
          task.task_id === task_id ? { ...task, status: updatedStatus } : task
        )
      );
  
      // Show a success toast
      toast.success(`Task marked as ${updatedStatus}!`);
    } catch (error) {
      // Enhanced error handling
      if (error.response) {
        console.error("Backend Error:", error.response.data);
        toast.error(error.response.data.message || "Error updating task status");
      } else if (error.request) {
        console.error("No Response from Backend:", error.request);
        toast.error("Server is not responding. Please try again.");
      } else {
        console.error("Unexpected Error:", error.message);
        toast.error("An unexpected error occurred.");
      }
    }
  };
  

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };


  const handleOpenAddTaskModal = () => {
    setEditingTask(null);
    reset({ title: "", category: "", priority: "medium", status: "incomplete" }); // Reset form values
    setIsModalOpen(true);
  };
  

  const handleCloseAddTaskModal = () => {
    setIsModalOpen(false); 
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-blue-200 p-6"
      style={{background:
        "linear-gradient(135deg, rgba(255, 255, 255, 1) 20%, rgba(173, 216, 230, 0.6) 80%)",

      }}>
      {/* Toastify Container */}
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex items-center mb-4 md:mb-0">
        <button
          onClick={handleGoBack}
          className="flex items-center gap-2 text-blue-500 hover:text-blue-700 transition duration-300"
        >
          <FaArrowLeft size={20} />
          <span className="text-xl font-semibold">Go Back</span>
        </button>
      </div>

      {/* Dashboard Header */}
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="items-start justify-between py-4 border-b md:flex">
        <h3 className="text-gray-800 text-3xl font-bold ">
  TASK DASHBOARD
</h3>


          <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
  {/* Category Dropdown */}
  <select
    name="category"
    value={filter.category}
    onChange={handleFilterChange}
    className="p-2 w-48 border border-green-400 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 transition-all duration-300 hover:shadow-md"
  >
    <option value="">All Categories</option>
    {allCategories.length !== 0 &&
      allCategories.map((cname) => (
        <option key={cname} value={cname}>
          {cname}
        </option>
      ))}
  </select>

  {/* Status Dropdown */}
  <select
    name="status"
    value={filter.status}
    onChange={handleFilterChange}
    className="p-2 w-48 border border-purple-400 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 transition-all duration-300 hover:shadow-md"
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
     
          onClick={() =>handleOpenAddTaskModal()}
          className="py-2 px-6 text-white font-medium bg-black hover:bg-gray-800 rounded-lg animate-hover"
          style={{ animationDelay: "0.8s" }}
        >
          Add Task
        </button>
      </div>

      {/* Task Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
  {tasks.map((task) => (
    <div
      key={task.task_id}
      className={`relative p-6 rounded-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 ${
        task.priority === "high"
          ? "bg-red-50 border-l-8 border-red-500"
          : task.priority === "medium"
          ? "bg-yellow-50 border-l-8 border-yellow-500"
          : "bg-green-50 border-l-8 border-green-500"
      }`}
    >
      {/* Priority Badge with Icon */}
      <div
        className={`absolute top-4 right-4 px-3 py-1 flex items-center gap-1 text-sm font-semibold rounded-full ${
          task.priority === "high"
            ? "bg-red-500 text-white"
            : task.priority === "medium"
            ? "bg-yellow-500 text-white"
            : "bg-green-500 text-white"
        }`}
      >
        <HiOutlineClipboardList className="text-lg" />
        {task.priority.toUpperCase()}
      </div>

      {/* Task Title */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
        {task.title}
      </h2>

      {/* Task Category */}
      <p className="text-sm text-gray-500 mb-4">
        <span className="font-semibold text-gray-700">Category:</span>{" "}
        {task.category || "None"}
      </p>

      {/* Status Toggle */}
      <div className="flex items-center mb-4">
        {/* <input
          type="checkbox"
          checked={task.status === "completed"}
          onChange={() => handleToggleStatus(task.task_id, task.status)}
          className="mr-2 h-4 w-4 accent-blue-500"
        /> */}
        <span
          className={`text-sm font-medium flex items-center gap-2 ${
            task.status === "completed" ? "text-green-600" : "text-red-600"
          }`}
        >
          {task.status === "completed" ? (
            <>
              <BsCheckCircle onClick={()=> handleToggleStatus(task.task_id, task.status)}  className="text-lg" />
              Completed
            </>
          ) : (
            <>
              <BsExclamationCircle onClick={()=> handleToggleStatus(task.task_id, task.status)} className="text-lg" />
              Incomplete
            </>
          )}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button
          onClick={() => handleEditTask(task)}
          className="flex items-center gap-2 px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 transition-all"
        >
          <FaEdit className="text-lg" />
          Edit
        </button>
        <button
          onClick={() => handleDeleteTask(task.task_id)}
          className="flex items-center gap-2 px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:ring-2 focus:ring-red-300 transition-all"
        >
          <FaTrashAlt className="text-lg" />
          Delete
        </button>
      </div>
    </div>
  ))}
</div>

      {/* Add Task Modal */}
      {isModalOpen && (
 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
 <div className="relative bg-white p-8 rounded-xl shadow-2xl w-11/12 max-w-md transform transition-all duration-500 scale-105">
   {/* Close Button */}
   <button
     onClick={handleCloseAddTaskModal}
     className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition duration-300"
   >
     <FaTimes size={20} />
   </button>

   {/* Modal Header with Icon */}
   <div className="flex items-center gap-3 mb-6">
     <FaTasks className="text-blue-500 text-3xl" />
     <h2 className="text-2xl font-bold text-gray-800">Add New Task</h2>
   </div>

   {/* Form */}
   <form onSubmit={handleSubmit(handleAddTask)}>
     {/* Task Title */}
     <div className="mb-4">
       <label className="block text-sm font-medium text-gray-700 mb-2">
         Task Title
       </label>
       <input
         type="text"
         placeholder="Enter task title"
         {...register("title", { required: "Task title is required" })}
         className="w-full p-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-300"
       />
       {errors.title && (
         <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
       )}
     </div>

     {/* Category */}
     <div className="mb-4">
       <label className="block text-sm font-medium text-gray-700 mb-2">
         Category
       </label>
       <input
         type="text"
         placeholder="Enter category"
         {...register("category")}
         className="w-full p-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-300"
       />
     </div>

     {/* Priority */}
     <div className="mb-4">
       <label className="block text-sm font-medium text-gray-700 mb-2">
         Priority
       </label>
       <select
         {...register("priority")}
         className="w-full p-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-300"
       >
         <option value="high">High</option>
         <option value="medium">Medium</option>
         <option value="low">Low</option>
       </select>
     </div>

     {/* Action Buttons */}
     <div className="flex justify-end gap-4">
       <button
         onClick={handleCloseAddTaskModal}
         className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 transition duration-300"
       >
         Cancel
       </button>
       <button
         type="submit"
         className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
       >
         <FaPlus />
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
