import mongoose from "mongoose";
import bcrypt from "bcrypt";

const saltRounds = 10;

const Schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    max: 100,
    index: {
      unique: true,
    },
  },
  password: {
    type: String,
    required: true,
    max: 100,
  },
  username: {
    type: String,
    required: true,
    max: 100,
    index: {
      unique: true,
    },
  },
  direccion: {
    type: String,
    required: true,
    max: 100,
  },
  edad: {
    type: Number,
    required: true,
  },
  numeroTelefono: {
    type: Number,
    required: true,
  },
  foto: {
    type: String,
    required: true,
  },
});

Schema.pre("save", function (next) {
  const user = this;
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(saltRounds, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }
          user.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});

Schema.methods.comparePassword = async function (password, passwordDB) {
  const valid = await bcrypt.compare(password, passwordDB);
  return valid;
};

export const UsuariosModel = mongoose.model("usuarios", Schema);
