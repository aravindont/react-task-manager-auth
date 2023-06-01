import React from "react";

const Dashboard = ({
  tasks,
  taskText,
  handleTaskTextChange,
  addTask,
  handleLogout,
}) => {
  return (
    <div className="dashboard">
      <h2>Task Manager Dashboard</h2>
      <button onClick={handleLogout}>Log Out</button>
      <div className="task-form">
        <input
          type="text"
          value={taskText}
          onChange={handleTaskTextChange}
          placeholder="Enter a task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="task-list">
        {tasks?.map((task) => (
          <div key={task.id} className="task-item">
            {task.task}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
