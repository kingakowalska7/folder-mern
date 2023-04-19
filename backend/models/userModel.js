const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})


userSchema.statics.signup = async function(email, password) {

  if (!email || !password) {
    throw Error('Wszystkie pola muszą być wypełnione')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email jest nieprawidłowy')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Hasło nie jest wystarczająco silne')
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email jest już w użyciu')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ email, password: hash })

  return user
}


userSchema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw Error('Wszystkie pola muszą być wypełnione')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Nieprawidłowy email')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Nieprawidłowe hasło')
  }

  return user
}

module.exports = mongoose.model('User', userSchema)