
# SpendWise - Interactive Budgeting Application

## Project Description

SpendWise is an interactive budgeting application developed using HTML, CSS, and JavaScript.

The application helps users manage their monthly budgets, record expenses, calculate spending, monitor their remaining balance, and receive financial advice.

## Improvements Made This Week

The following improvements were made to SpendWise:

1. Added an interactive monthly budget setting feature.
2. Added an expense form for recording multiple expenses.
3. Added expense categories such as Food, Transport, Education, Shopping, and Bills.
4. Added automatic calculation of total expenses.
5. Added automatic calculation of the remaining budget.
6. Added a dynamic expense table.
7. Added a delete button to remove expense records.
8. Added a budget progress bar.
9. Added financial advice based on spending behavior.
10. Improved the application's appearance and responsiveness.

## 1. How Conditionals Are Used

Conditional statements are used to make decisions based on the user's financial information.

For example, the application checks whether the user has exceeded their budget.

The project uses:

- if statements
- else if statements
- else statements

If the user's expenses reach or exceed their budget, the application displays a warning message.

If the user spends less than 80% of their budget, the application displays positive feedback.

Conditionals are also used to validate budget and expense inputs.

## 2. How Arrays Are Used to Store Data

An array called expenses is used to store multiple expense records.

Each expense is stored as an object containing:

- Expense ID
- Expense name
- Expense amount
- Expense category
- Expense date

The push() method adds new expense records to the array.

The filter() method removes an expense when the user clicks the delete button.

This makes it possible to manage multiple expenses instead of using individual variables.

## 3. How Loops Are Used

A for loop is used to process the expense records stored in the expenses array.

The calculateTotalExpenses() function loops through all expenses and adds their amounts together.

Another for loop is used in the displayExpenses() function to display all expense records in the HTML table.

Loops make it easier to process many records efficiently.

## 4. How the DOM Is Updated

DOM manipulation is used to update webpage content dynamically.

JavaScript uses document.getElementById() to access HTML elements.

The application updates:

- Total budget
- Total expenses
- Remaining balance
- Expense records table
- Budget progress bar
- Budget advice messages

The textContent property updates displayed text.

The innerHTML property updates table contents.

The createElement() and appendChild() methods create and insert expense records into the webpage.

## 5. How User Interactions Are Handled Through Events

Event listeners allow users to interact with the application.

The project uses:

- click event to set the monthly budget.
- submit event to add new expenses.
- click event to delete expense records.

The preventDefault() method prevents the expense form from refreshing the page when submitted.

These events allow JavaScript to respond to user actions and update the dashboard automatically.

## 6. Challenges Encountered and Solutions

### Challenge 1: Calculating Total Expenses

It was initially difficult to calculate the total amount when multiple expenses were added.

Solution:
An array and for loop were used to store and calculate all expense records.

### Challenge 2: Updating the Dashboard

The dashboard needed to display new information immediately after user actions.

Solution:
A function called updateDashboard() was created to refresh the budget, expenses, balance, progress bar, and advice.

### Challenge 3: Validating User Input

Users could enter invalid amounts or submit empty fields.

Solution:
Conditional statements were used to validate the input before processing it.

### Challenge 4: Removing Expense Records

It was necessary to allow users to remove unwanted expenses.

Solution:
The filter() array method was used to remove selected records using their unique IDs.

## Technologies Used

- HTML5
- CSS3
- JavaScript

## How to Run the Project

1. Download or clone this repository.
2. Open the SpendWise folder.
3. Open index.html in a web browser.
4. Enter a monthly budget.
5. Add expenses using the expense form.
6. View the updated dashboard.
7. Delete expenses when necessary.

## Conclusion

SpendWise demonstrates how JavaScript can make a budgeting application interactive.

The project uses conditionals, arrays, loops, DOM manipulation, and event listeners to provide a functional budgeting experience.

It allows users to record expenses, monitor spending, calculate their remaining balance, and receive financial feedback.
