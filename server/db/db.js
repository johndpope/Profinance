const mongoose = require('mongoose');

const db = async () => {
  try {
    await mongoose.connect(
      process.env.DB,
      { useNewUrlParser: true,
        useUnifiedTopology: true },
      () => console.log('Database: [CONNECTED]')
    )
  } catch (error) {
    throw error
  }
}

module.exports = db