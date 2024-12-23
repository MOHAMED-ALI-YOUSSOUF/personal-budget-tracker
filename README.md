# Personal Budget Tracker

Personal Budget Tracker is a web application designed to help users track their income, expenses, and overall financial health. It allows users to categorize transactions, view detailed insights, and manage their budget effectively.
![Dashboard Screenshot](./screenshots/dashboard-light.png)

## Features

- Add and delete transactions (income or expense).
- Categorize transactions (e.g., food, rent, entertainment).
- View transactions sorted by date.
- Display total income, expenses, and balance.
- Responsive design for mobile and desktop.
- Monthly budget to set and track spending limits.
- Real-time chart updates for visualizing income and expense trends.
- Dark Mode and Light Mode toggle for user preference.
- Multi-device sync using Local Storage for seamless usage.
- Download PDF report of income, expenses, balance and details of transactions.
- Savings suggestions based on spending patterns.

## Tech Stack

- **Frontend:** Next.js, Tailwind CSS, Shadcn, Date-fns
- **Icons:** Lucide-react
- **State Management:** Context API
- **Data Storage:** Local Storage
- **Data Visualization:** Recharts
- **Chart Libraries:** Recharts (for visualizing income, expenses, and balances)
- **Theme:** Tailwind CSS for responsive and customizable design, supporting both dark and light modes.
- **PDF Generation:** jsPDF for downloading PDF reports.
- **Savings Calculation:** Custom logic based on user spending behavior to suggest potential savings.

## Screenshots

### Dashboard

![Dashboard Screenshot](./screenshots/dashboard-dark.png)
![Dashboard Screenshot](./screenshots/dashboard-light.png)

_The dashboard displays the total balance, income, and expenses summary._
_Interactive charts provide a clear view of your financial trends._
_Users can toggle between Dark Mode and Light Mode._

### Add Transaction

![Add Transaction Screenshot](./screenshots/add-transaction.png)

_Users can add income or expense transactions with details like amount, description, date, and category._

### Categories

![Categories Screenshot](./screenshots/categories.png)

_Users can view, add, or manage their categories, such as income and expense types._  
_Additionally, users can set a spending limit for each category to manage their budget effectively._

### Transaction

![Transaction Screenshot](./screenshots/transactions.png)

_The transaction list displays all user transactions with details like date, type, description, category, and amount._  
_Users can delete specific transactions if needed._

### Download PDF Report

Users can download a PDF report of their income, expenses, balance and details of transactions.

## How to Run the Project

1. Clone the repository:

   ```bash
   git clone https://github.com/MOHAMED-ALI-YOUSSOUF/personal-budget-tracker.git

   ```

2. Navigate to the project folder:
   ```bash
   cd personal-budget-tracker
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open your browser and navigate to: http://localhost:3000

## Live Demo

Check out the live demo [here](https://personal-budget-tracker-bay.vercel.app/).

## Contact

Created by [Mohamed Ali Youssouf](https://mohamed-ali-youssouf.com) - Feel free to reach out!
