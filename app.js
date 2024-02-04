#!/usr/bin/env node
const { Command } = require("commander");
const program = new Command();
const {
  addExpense,
  deleteExpense,
  findByCategory,
  findByDate,
} = require("./utils/helper");

const example = {
  total: 200,
  category: "shopping",
  date: Date.now(),
  id: 1,
};

program
  .command("create-expense <category> <amount>")
  .description("add expense")
  .action(async (category, amount) => {
    addExpense(category, amount);
  });

program
  .command("find-by-date <date>")
  .description("add expense")
  .action(async (date) => {
    findByDate(date);
  });
program
  .command("find-by-category <category>")
  .description("add expense")
  .action(async (category) => {
    findByCategory(category);
  });
program
  .command("delete-expense <id>")
  .description("add expense")
  .action(async (id) => {
    deleteExpense(id);
  });
program.parse(process.argv);
