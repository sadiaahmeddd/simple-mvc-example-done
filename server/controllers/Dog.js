// server/controllers/Dog.js
const models = require('../models');
const { Dog } = models;

// POST /dogs/create
const createDog = async (req, res) => {
  let { name, breed, age } = req.body;

  if (!name || !breed || (typeof age === 'undefined' || age === '')) {
    return res.redirect('/page3?err=Please provide name, breed, and age.');
  }

  // normalize
  name = String(name).trim();
  breed = String(breed).trim();
  age = Number(age);

  if (!Number.isFinite(age) || age < 0) {
    return res.redirect('/page3?err=Age must be a non-negative number.');
  }

  try {
    await Dog.create({ name, breed, age });
    return res.redirect('/page3?msg=Dog created successfully.');
  } catch (e) {
    // likely dupes or validation errors
    return res.redirect('/page3?err=Could not create dog.');
  }
};

// POST /dogs/increment
const incrementAgeByName = async (req, res) => {
  const name = String(req.body.name || '').trim();
  if (!name) {
    return res.redirect('/page3?err=Please provide a dog name to increment.');
  }

  try {
    //  find and increment
    const updated = await Dog.findOneAndUpdate(
      { name },
      { $inc: { age: 1 } },
      { new: true } // return the updated doc
    );

    if (!updated) {
      return res.redirect('/page3?err=Dog does not exist.');
    }
    return res.redirect(`/page3?msg=${encodeURIComponent(`${updated.name}'s age is now ${updated.age}.`)}`);
  } catch (e) {
    return res.redirect('/page3?err=Could not update dog age.');
  }
};

// GET /page4
const listDogs = async (req, res) => {
  try {
    const dogs = await Dog.find().sort({ createdDate: -1 }).lean();
    return res.render('page4', { dogs });
  } catch (e) {
    return res.render('page4', { dogs: [], err: 'Failed to load dogs.' });
  }
};

module.exports = { createDog, incrementAgeByName, listDogs };
