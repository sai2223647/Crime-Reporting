const mongoose = require('mongoose');
const Crime = require('./models/Crime');

const crimes = [
  { type: 'Theft', prevention: 'Lock doors, secure valuables', legalActions: 'File a police report, potential fines/jail' },
  { type: 'Harassment', prevention: 'Avoid isolated areas, report immediately', legalActions: 'Restraining order, legal action' },
  { type: 'Vandalism', prevention: 'Install cameras, secure property', legalActions: 'Fines, community service, jail' },
];

async function seedCrimes() {
  try {
    await mongoose.connect('mongodb+srv://karrothuramachandrarao859:whar0xmUQRgp4Tlc@cluster0.pvieg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await Crime.deleteMany(); // Clear existing crimes to avoid duplicates
    await Crime.insertMany(crimes);
    console.log('Crimes seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding crimes:', error);
    process.exit(1);
  }
}

seedCrimes();