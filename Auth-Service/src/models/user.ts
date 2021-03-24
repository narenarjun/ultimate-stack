import mongoose from "mongoose";
import { Password } from "../services/password";

// An interface that describes the properties
//  that are required to create a new User
interface UserAttrs {
  email: string;
  password: string;
}

// AN interface that describe the properties that
// a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties that
//  a User document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc,ret) {
        ret.id = ret._id
        delete ret._id;
        delete ret.password;
        delete ret.__v; //! it is possible to remove __v by mentioning versionkey to false in the toJSON object,
      },
    },
  }
);

// ! this method will be performed before saving it to the database
userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));

    this.set("password", hashed);
    done();
  }
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
