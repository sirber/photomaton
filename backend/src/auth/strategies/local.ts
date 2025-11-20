import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '../../user/models/user.model';
import bcrypt from 'bcrypt';

passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email }).exec();
      if (!user) return done(null, false, { message: 'Incorrect email.' });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return done(null, false, { message: 'Incorrect password.' });

      return done(null, user);
    } catch (err) {
      return done(err as Error);
    }
  })
);
