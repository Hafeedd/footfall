class errorHandler {
  constructor(status) {
    this.status = status;
  }
  createError = (err) => {
    err = err?.length > 0 ? err?.filter((x) => typeof x !== "number") : err;
    let messages = [];

    if (err?.errors)
      for (let [key, data] of Object.entries(err?.errors)) {
        messages.push(data.message || data);
      }
    // else messages = err;
    if (err?.code === 11000 && err?.keyValue) {
      messages = [];
      for (let [key, value] of Object.entries(err.keyValue))
        messages.push(`${key} ${value} already exists`);
    }

    return {
      message: messages?.length > 0 ? messages : err,
      status: err?.errors ? 422 : this.status || 500,
      stack: err?.stack,
      success: false,
    };
  };
}

export const passError = (status) => new errorHandler(status);
