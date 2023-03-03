class UserIdError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
    this.name = "UserIdError";
  }

  toJSON = ()=> ({
    message: this.message,
    status: this.status,
    name: this.name
  })
}

module.exports = UserIdError;