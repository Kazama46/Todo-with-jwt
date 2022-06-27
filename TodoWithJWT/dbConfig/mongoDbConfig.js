var mongourl = "mongodb://localhost:27017/todo_express";
if (!process.env.MONGO_DATABASE_USERNAME) {
  mongourl = `mongodb://localhost:27017/${process.env.MONGO_DATABASE_DATABASE}`;
}

module.exports = mongourl;
