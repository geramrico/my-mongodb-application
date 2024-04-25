const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 8000

const asyncHandler = require('./utils/asyncHandler')
const connectDB = require('./config/db')

connectDB()

const app = express()
app.use(express.json()) //JSON

const UserProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  company: { type: String, required: true },
  role: { type: String, required: true },
  timezone: { type: String, required: true },
  happyToWorkAtMongo: { type: Boolean, default: true },
  availabilityForACall: { type: String, required: true },
  funFact: { type: String, required: true },
  professionalSkills: [{ type: String }], // Array of strings
  softSkills: [{ type: String }], // Array of strings
  socialLinks: {
    linkedin: { type: String, required: true },
  },
  message: { type: String, required: true },
})

const Profile = mongoose.model('Profile', UserProfileSchema)

app.get(
  '/about-me',
  asyncHandler(async (req, res) => {
    try {
      const profileData = await Profile.findOne()
      res.json(profileData)
    } catch (error) {
      console.log(error)
      res.status(500).send('Error retrieving profile data.')
    }
  })
)

app.post(
  '/about-me',
  asyncHandler(async (req, res) => {
    try {
      const addedProfileData = await Profile.create({ ...req.body })
      res.json(addedProfileData)
    } catch (error) {
      res.status(500).send('Error retrieving profile data.')
    }
  })
)

app.listen(PORT, () => console.log(`Server started on ${PORT}`))
