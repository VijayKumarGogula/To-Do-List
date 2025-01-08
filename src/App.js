import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState({ id: null, text: '', isCompleted: false });

  // Add a new task
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, isCompleted: false }]);
      setNewTask('');
    }
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Enable editing mode
  const startEditing = (task) => {
    setIsEditing(true);
    setCurrentTask(task);
  };

  // Edit a task
  const editTask = () => {
    setTasks(
      tasks.map((task) =>
        task.id === currentTask.id ? { ...task, text: currentTask.text } : task
      )
    );
    setIsEditing(false);
    setCurrentTask({ id: null, text: '', isCompleted: false });
  };

  // Toggle task completion
  const toggleCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  return (
    <div className="App">
      <div className="todo-container">
        <h1 className="app-title">To-Do List</h1>
        <div className="input-container">
          {isEditing ? (
            <>
              <input
                type="text"
                value={currentTask.text}
                onChange={(e) =>
                  setCurrentTask({ ...currentTask, text: e.target.value })
                }
                placeholder="Edit task"
              />
              <button onClick={editTask} className="save-btn">Save</button>
              <button onClick={() => setIsEditing(false)} className="cancel-btn">Cancel</button>
            </>
          ) : (
            <>
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task"
              />
              <button onClick={addTask} className="add-btn">Add Task</button>
            </>
          )}
        </div>
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className={`task-item ${task.isCompleted ? 'completed' : ''}`}>
              <span onClick={() => toggleCompletion(task.id)}>
                {task.text}
              </span>
              <div className="task-actions">
                <button onClick={() => startEditing(task)} className="edit-btn">Edit</button>
                <button onClick={() => deleteTask(task.id)} className="delete-btn">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
