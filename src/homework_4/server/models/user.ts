import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

type CallbackType = (err: Error | null, match?: boolean) => void;

interface UserSchemaInterface extends Document {
  email: string;
  password: string;
  comparePassword: (password: string, cb: CallbackType) => void;
}

const SALT_WORK_FACTOR = 10;
const userSchema = new Schema<UserSchemaInterface>({
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
});

userSchema.pre('save', function (next): void {
  const user = this;
  bcrypt.genSalt(SALT_WORK_FACTOR, (error, salt) => {
    if (error) return next(error);
    return bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      return next();
    });
  });
});

userSchema.pre('findOne', function (): void {
  const user = this;
  user.getQuery();
});

userSchema.methods.comparePassword = function (candidatePassword: string, cb: CallbackType): void {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => cb(err, isMatch));
};

export const UserModel = mongoose.model('users', userSchema);
