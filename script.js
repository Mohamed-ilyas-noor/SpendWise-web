
// =====================================
// SPENDWISE INTERACTIVE BUDGET TRACKER
// =====================================

// Store the monthly budget
let budget = 0;

// Array to store multiple expense records
let expenses = [];

// Get HTML elements using DOM manipulation
const budgetInput = document.getElementById("budgetInput");
const setBudgetBtn = document.getElementById("setBudgetBtn");

const expenseForm = document.getElementById("expenseForm");
const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const expenseCategory = document.getElementById("expenseCategory");

const totalBudget = document.getElementById("totalBudget");
const totalExpenses = document.getElementById("totalExpenses");
const remainingBalance = document.getElementById("remainingBalance");

const expenseTableBody = document.getElementById("expenseTableBody");
const budgetMessage = document.getElementById("budgetMessage");
const expenseMessage = document.getElementById("expenseMessage");
const budgetStatus = document.getElementById("budgetStatus");
const adviceMessage = document.getElementById("adviceMessage");
const progressFill = document.getElementById("progressFill");


// Format amounts as Kenyan Shillings
function formatMoney(amount) {
    return "KSh " + amount.toLocaleString("en-KE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}


// =====================================
// SET MONTHLY BUDGET
// =====================================

setBudgetBtn.addEventListener("click", function() {

    const enteredBudget = Number(budgetInput.value);

    // Conditional statement for budget validation
    if (budgetInput.value.trim() === "" ||
        !Number.isFinite(enteredBudget) ||
        enteredBudget <= 0) {

        budgetMessage.textContent =
            "Please enter a valid budget greater than zero.";

        budgetMessage.className = "error";

    } else {

        budget = enteredBudget;

        budgetMessage.textContent =
            "Your monthly budget has been set successfully!";

        budgetMessage.className = "success";

        budgetInput.value = "";

        updateDashboard();
    }

});


// =====================================
// ADD NEW EXPENSE
// =====================================

expenseForm.addEventListener("submit", function(event) {

    // Prevent page from refreshing
    event.preventDefault();

    const name = expenseName.value.trim();
    const amount = Number(expenseAmount.value);
    const category = expenseCategory.value;

    // Validate expense information
    if (
        name === "" ||
        expenseAmount.value.trim() === "" ||
        !Number.isFinite(amount) ||
        amount <= 0 ||
        category === ""
    ) {

        expenseMessage.textContent =
            "Please enter valid expense details.";

        expenseMessage.className = "error";

        return;
    }

    // Check whether a budget has been set
    if (budget <= 0) {

        expenseMessage.textContent =
            "Please set your monthly budget before adding expenses.";

        expenseMessage.className = "error";

        return;
    }

    // Create an expense object
    const newExpense = {

        id: Date.now(),

        name: name,

        amount: amount,

        category: category,

        date: new Date().toLocaleDateString()

    };

    // Add the expense object to the array
    expenses.push(newExpense);

    expenseMessage.textContent =
        "Expense added successfully!";

    expenseMessage.className = "success";

    // Clear form fields
    expenseForm.reset();

    // Refresh dashboard
    updateDashboard();

});


// =====================================
// CALCULATE TOTAL EXPENSES USING LOOP
// =====================================

function calculateTotalExpenses() {

    let total = 0;

    // Loop through all expense records
    for (let i = 0; i < expenses.length; i++) {

        total += expenses[i].amount;

    }

    return total;
}


// =====================================
// UPDATE DASHBOARD DYNAMICALLY
// =====================================

function updateDashboard() {

    const total = calculateTotalExpenses();

    const balance = budget - total;

    // Update dashboard values
    totalBudget.textContent = formatMoney(budget);

    totalExpenses.textContent = formatMoney(total);

    remainingBalance.textContent = formatMoney(balance);

    // Update expense table
    displayExpenses();

    // Update progress bar
    updateProgress(total);

    // Update budget advice
    updateBudgetAdvice(total, balance);

}


// =====================================
// DISPLAY EXPENSES ON WEBPAGE
// =====================================

function displayExpenses() {

    // Clear previous table contents
    expenseTableBody.innerHTML = "";

    // Check whether the array is empty
    if (expenses.length === 0) {

        expenseTableBody.innerHTML = `
            <tr>
                <td colspan="5">No expenses recorded yet.</td>
            </tr>
        `;

        return;
    }

    // Loop through the expense array
    for (let i = 0; i < expenses.length; i++) {

        const expense = expenses[i];

        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        const categoryCell = document.createElement("td");
        const amountCell = document.createElement("td");
        const dateCell = document.createElement("td");
        const actionCell = document.createElement("td");

        nameCell.textContent = expense.name;

        categoryCell.textContent = expense.category;

        amountCell.textContent = formatMoney(expense.amount);

        dateCell.textContent = expense.date;

        // Create delete button
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.className = "delete-btn";

        // Attach event listener to delete button
        deleteButton.addEventListener("click", function() {

            deleteExpense(expense.id);

        });

        actionCell.appendChild(deleteButton);

        row.appendChild(nameCell);
        row.appendChild(categoryCell);
        row.appendChild(amountCell);
        row.appendChild(dateCell);
        row.appendChild(actionCell);

        expenseTableBody.appendChild(row);

    }

}


// =====================================
// DELETE EXPENSE
// =====================================

function deleteExpense(id) {

    // Find and remove the selected expense
    expenses = expenses.filter(function(expense) {

        return expense.id !== id;

    });

    expenseMessage.textContent =
        "Expense deleted successfully.";

    expenseMessage.className = "success";

    updateDashboard();

}


// =====================================
// UPDATE BUDGET PROGRESS
// =====================================

function updateProgress(total) {

    let percentage = 0;

    if (budget > 0) {

        percentage = (total / budget) * 100;

    }

    // Prevent progress bar from exceeding 100%
    const displayPercentage = Math.min(percentage, 100);

    progressFill.style.width = displayPercentage + "%";

    // Conditional statements
    if (percentage >= 100) {

        progressFill.style.backgroundColor = "#dc3545";

        budgetStatus.textContent =
            "Warning! You have reached or exceeded your budget.";

        budgetStatus.className = "error";

    } else if (percentage >= 80) {

        progressFill.style.backgroundColor = "#f0ad4e";

        budgetStatus.textContent =
            "Caution! You have used " + percentage.toFixed(1) +
            "% of your budget.";

        budgetStatus.className = "error";

    } else {

        progressFill.style.backgroundColor = "#16865b";

        budgetStatus.textContent =
            "Good job! You have used " + percentage.toFixed(1) +
            "% of your budget.";

        budgetStatus.className = "success";

    }

}


// =====================================
// PROVIDE BUDGET ADVICE USING CONDITIONALS
// =====================================

function updateBudgetAdvice(total, balance) {

    if (budget <= 0) {

        adviceMessage.textContent =
            "Set your budget to receive financial advice.";

    } else if (total === 0) {

        adviceMessage.textContent =
            "You have not recorded any expenses. Keep tracking your spending!";

    } else if (balance < 0) {

        adviceMessage.textContent =
            "You have exceeded your budget by " +
            formatMoney(Math.abs(balance)) +
            ". Reduce unnecessary spending.";

    } else if (total >= budget * 0.8) {

        adviceMessage.textContent =
            "You are close to your spending limit. Avoid unnecessary expenses.";

    } else {

        adviceMessage.textContent =
            "Great work! Your spending is within your budget. Keep saving!";

    }

}


// =====================================
// INITIAL DASHBOARD DISPLAY
// =====================================

updateDashboard();
