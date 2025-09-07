export const getAllTasks = (req, res) => {
  res.status(200).send('You have a new task!');
};

export const createTask = (req, res) => {
  res.status(201).json({ message: "Add task successfully!" });
};

export const updateTask = (req, res) => {
  res.status(200).json({ message: "Update task successfully!" });
};

export const deleteTask = (req, res) => {
  res.status(200).json({ message: "Delete task successfully!" });
};