import React, { useState } from "react";
import "./App.css";

const ProgressBar = ({ totalBudget, spent }) => {
  const percentage = (spent / totalBudget) * 100;
  const width = percentage > 100 ? 100 : percentage;

  let color = "green";
  if (percentage >= 75) {
    color = "orange";
  }
  if (percentage >= 100) {
    color = "red";
  }

  const progressStyle = {
    width: `${width}%`,
    backgroundColor: color,
    height: "30px",
    borderRadius: "15px",
  };

  return (
    <div className="progress">
      <div className="progress-bar" style={progressStyle}></div>
      <div style={{ color }}>
        Budget: ₨{totalBudget.toLocaleString("en-NP")} / Spent: ₨
        {spent.toLocaleString("en-NP")}
      </div>
    </div>
  );
};

const dummyBudgetData = [
  {
    title: "Groceries",
    totalBudget: 500,
    spent: 250,
  },
  {
    title: "Entertainment",
    totalBudget: 200,
    spent: 50,
  },
  {
    title: "Utilities",
    totalBudget: 300,
    spent: 150,
  },
];

const BudgetForm = ({ addBudget }) => {
  const [title, setTitle] = useState("");
  const [totalBudget, setTotalBudget] = useState("");
  const [spent, setSpent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !totalBudget || !spent) return;
    addBudget({
      title,
      totalBudget: parseFloat(totalBudget),
      spent: parseFloat(spent),
    });
    setTitle("");
    setTotalBudget("");
    setSpent("");
  };

  return (
    <form className="budget-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Budget Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Total Budget"
        value={totalBudget}
        onChange={(e) => setTotalBudget(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Spent"
        value={spent}
        onChange={(e) => setSpent(e.target.value)}
        required
      />
      <button type="submit">Add Budget</button>
    </form>
  );
};

const BudgetApp = () => {
  const [budgets, setBudgets] = useState(dummyBudgetData);

  const addBudget = (newBudget) => {
    setBudgets([...budgets, newBudget]);
  };

  return (
    <div className="budget-app">
      <h1>Budget Visualization</h1>
      <BudgetForm addBudget={addBudget} />
      <div className="budget-list">
        <h2>Budget List</h2>
        {budgets.map((budget, index) => (
          <div key={index} className="budget-item">
            <h3>{budget.title}</h3>
            <ProgressBar
              totalBudget={budget.totalBudget}
              spent={budget.spent}
            />
            <p>Total Budget: ₨{budget.totalBudget.toLocaleString("en-NP")}</p>
            <p>Spent: ₨{budget.spent.toLocaleString("en-NP")}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetApp;
