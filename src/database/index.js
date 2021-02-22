const Sequelize = require("sequelize");
const dbConfig = require('../config/database');

const Student = require("../models/Student");
const Question = require("../models/Question");
const Category = require("../models/Category");
const Answer = require("../models/Answer");

const connection = new Sequelize(dbConfig.url, dbConfig.config);

Student.init(connection);
Question.init(connection);
Category.init(connection);
Answer.init(connection)

Student.associate(connection.models);
Question.associate(connection.models);
Category.associate(connection.models)
Answer.associate(connection.models);