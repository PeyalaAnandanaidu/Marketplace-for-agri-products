// config/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, {
    id: user.id,
    role: user.role || 'user'
  });
});

// Deserialize user from session
passport.deserializeUser(async (serializedUser, done) => {
  try {
    const user = await User.findById(serializedUser.id)
      .select('-password -googleRefreshToken -__v');
    done(null, user);
  } catch (err) {
    console.error('User deserialization error:', err);
    done(err);
  }
});

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL || '/api/auth/google/callback',
  passReqToCallback: true,
  prompt: 'select_account', // Force account selection
  accessType: 'offline' // Gets refresh token
}, async (req, accessToken, refreshToken, profile, done) => {
  try {
    // Validate profile email
    if (!profile.emails || !profile.emails.length) {
      throw new Error('No email found in Google profile');
    }

    const email = profile.emails[0].value.toLowerCase().trim();
    
    // Check for existing user
    let user = await User.findOne({ 
      $or: [
        { googleId: profile.id },
        { email }
      ]
    });

    if (!user) {
      // Create new user
      user = await User.create({
        googleId: profile.id,
        email,
        name: profile.displayName.trim(),
        isEmailVerified: true,
        avatar: profile.photos?.[0]?.value,
        authMethod: 'google'
      });
      console.log(`New Google user created: ${email}`);
    } else if (!user.googleId) {
      // Merge accounts
      user.googleId = profile.id;
      user.authMethod = 'mixed';
      await user.save();
    }

    // Store refresh token if available
    if (refreshToken) {
      user.googleRefreshToken = refreshToken;
      await user.save();
    }

    return done(null, user);
  } catch (err) {
    console.error('Google authentication error:', err);
    return done(err);
  }
}));

module.exports = passport;