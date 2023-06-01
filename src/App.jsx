import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import "./App.css";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const response = await axios.get("https://reqres.in/api/users/2");
      if (response.status === 200) {
        setLoggedIn(true);
        fetchTasks();
      }
    } catch (error) {
      setLoggedIn(false);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get("https://reqres.in/api/users/2/tasks");
      if (response.status === 200) {
        setTasks(response.data.data);
      }
    } catch (error) {
      console.log("Error fetching tasks:", error);
    }
  };

  const handleTaskTextChange = (event) => {
    setTaskText(event.target.value);
  };

  const addTask = async () => {
    try {
      const response = await axios.post("https://reqres.in/api/users/2/tasks", {
        task: taskText,
      });
      if (response.status === 201) {
        setTaskText("");
        fetchTasks();
      }
    } catch (error) {
      console.log("Error adding task:", error);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
          {loggedIn ? (
            <Route
              path="/dashboard"
              element={
                <Dashboard
                  tasks={tasks}
                  taskText={taskText}
                  handleTaskTextChange={handleTaskTextChange}
                  addTask={addTask}
                  handleLogout={handleLogout}
                />
              }
            />
          ) : (
            <Route path="/" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
