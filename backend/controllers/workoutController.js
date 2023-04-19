const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

const getWorkouts = async (req, res) => {
  const user_id = req.user._id

  const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};

const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Nie istnieje takie ćwiczenie" });
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ error: "Nie istnieje ćwiczenie" });
  }
  res.status(200).json(workout);
};

const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  console.log(req.body)

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Proszę wypełnić wszystkie pola", emptyFields });
  }

  try {
    const user_id = req.user._id
    const workout = await Workout.create({ title, load, reps, user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Nie istnieje takie ćwiczenie" });
  }
  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(404).json({ error: "Nie istnieje ćwiczenie" });
  }

  res.status(200).json(workout);
};

const updateWorkout = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Nie istnieje takie ćwiczenie" });
  }
  // const workout = await Workout.findOneAndUpdate({_id: id}, {
  //   ...req.body
  // })


  console.log(req.body)
  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );

  if (!workout) {
    return res.status(404).json({ error: "Nie istnieje ćwiczenie" });
  }
  res.status(200).json(workout);
};

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
