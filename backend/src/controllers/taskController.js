import Task from '../models/Task.js'

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error when call get all task!', error);
    res.status(500).json({ message: "Error!" })
  }
};

export const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    const task = new Task({ title });
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error when call create task!', error);
    res.status(500).json({ message: "Error!" })
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, status, completedAt } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        status,
        completedAt
      },
      { new: true }
    )
    if (!updateTask) {
      return res.status(404).json({ message: "Task does not exists!" });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Error when call update task!', error);
    res.status(500).json({ message: "Error!" })
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task does not exists!" });
    }
    res.status(200).json(deletedTask);
  } catch (error) {
    console.error('Error when call delete task!', error);
    res.status(500).json({ message: "Error!" })
  }
};