class ColorError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
    this.name = "ColorError";
  }

  toJSON = ()=> ({
    message: this.message,
    status: this.status,
    name: this.name
  });
}

module.exports = ColorError;