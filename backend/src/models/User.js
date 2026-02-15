import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: String,
  lastName: String,
  profileImage: String,
  phone: String,

  // Shopify Integration
  shopifyCustomerId: String,
  shopifyAccessToken: String,

  // Address
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },

  // Preferences
  preferences: {
    dailyGoal: { type: Number, default: 10000 },
    notificationsEnabled: { type: Boolean, default: true },
    publicProfile: { type: Boolean, default: true },
    preferredCurrency: { type: String, default: 'USD' }
  },

  // Activity Stats
  stats: {
    totalSteps: { type: Number, default: 0 },
    totalDistance: { type: Number, default: 0 },
    totalCalories: { type: Number, default: 0 },
    streakDays: { type: Number, default: 0 },
    activitiesLogged: { type: Number, default: 0 }
  },

  // Rewards
  rewards: {
    totalPoints: { type: Number, default: 0 },
    availablePoints: { type: Number, default: 0 },
    pendingPoints: { type: Number, default: 0 },
    tier: { type: String, default: 'Bronze', enum: ['Bronze', 'Silver', 'Gold', 'Platinum'] },
    lastPointsUpdate: Date
  },

  // Social
  friends: [String],
  followers: [String],
  following: [String],

  // Privacy
  privacySettings: {
    shareData: { type: Boolean, default: true },
    allowMessages: { type: Boolean, default: true }
  },

  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  lastActiveAt: { type: Date, default: Date.now }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(password) {
  return await bcryptjs.compare(password, this.password);
};

// Method to get public profile
userSchema.methods.getPublicProfile = function() {
  const { _id, email, firstName, lastName, profileImage, stats, rewards, createdAt } = this;
  return { _id, email, firstName, lastName, profileImage, stats, rewards, createdAt };
};

export default mongoose.model('User', userSchema);
