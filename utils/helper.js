const { readFile, writeFile } = require("fs/promises");
const path = require("path");

const filePath = path.join(__dirname, "..", "data", "expenses.json");
const addExpense = async (category, amount) => {
  try {
    const expenses = JSON.parse(await readFile(filePath, "utf-8"));
    const lastId = expenses[expenses.length - 1].id + 1;
    expenses.push({ category, total: amount, id: lastId, date: Date.now() });
    writeFile(filePath, JSON.stringify(expenses), "utf-8");
  } catch (err) {
    await writeFile(
      filePath,
      JSON.stringify([{ total: amount, category, id: 1, date: Date.now() }]),
      "utf-8",
      (err) => console.log(err)
    );
    console.log(err.message);
  }
};

const deleteExpense = async (id) => {
  try {
    const expenses = JSON.parse(await readFile(filePath, "utf-8"));
    const newExpenses = expenses.filter((exp) => exp.id !== Number(id));
    writeFile(filePath, JSON.stringify(newExpenses), "utf-8");
    console.log(expenses.find((expense) => expense.id === Number(id)));
    return newExpenses;
  } catch (err) {
    console.log(err);
  }
};

const findByDate = async (date) => {
  try {
    const expenses = JSON.parse(await readFile(filePath, "utf-8"));
    const exp = expenses.find((exp) => exp.date === Number(date));
    console.log(exp);
    return exp;
  } catch (err) {
    console.log(err);
  }
};

const findByCategory = async (category) => {
  try {
    const expenses = JSON.parse(await readFile(filePath, "utf-8"));
    const exp = expenses.filter((exp) => exp.category === category);
    console.log(exp);
    return exp;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  addExpense,
  findByCategory,
  findByDate,
  deleteExpense,
};
