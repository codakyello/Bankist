'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
// const account1 = {
//   owner: 'Jonas Schmedtmann',
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
// };

// const account2 = {
//   owner: 'Jessica Davis',
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,
// };

// const account3 = {
//   owner: 'Steven Thomas Williams',
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,
// };

// const account4 = {
//   owner: 'Sarah Smith',
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
// };

// const accounts = [account1, account2, account3, account4];

// // Elements
// const labelWelcome = document.querySelector('.welcome');
// const labelDate = document.querySelector('.date');
// const labelBalance = document.querySelector('.balance__value');
// const labelSumIn = document.querySelector('.summary__value--in');
// const labelSumOut = document.querySelector('.summary__value--out');
// const labelSumInterest = document.querySelector('.summary__value--interest');
// const labelTimer = document.querySelector('.timer');

// const containerApp = document.querySelector('.app');
// const containerMovements = document.querySelector('.movements');

// const btnLogin = document.querySelector('.login__btn');
// const btnTransfer = document.querySelector('.form__btn--transfer');
// const btnLoan = document.querySelector('.form__btn--loan');
// const btnClose = document.querySelector('.form__btn--close');
// const btnSort = document.querySelector('.btn--sort');

// const inputLoginUsername = document.querySelector('.login__input--user');
// const inputLoginPin = document.querySelector('.login__input--pin');
// const inputTransferTo = document.querySelector('.form__input--to');
// const inputTransferAmount = document.querySelector('.form__input--amount');
// const inputLoanAmount = document.querySelector('.form__input--loan-amount');
// const inputCloseUsername = document.querySelector('.form__input--user');
// const inputClosePin = document.querySelector('.form__input--pin');

// /////////////////////////////////////////////////
// /////////////////////////////////////////////////
// // LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// BANKIST APP
const account1 = {
  owner: 'Jonas Schmedtmann',
  balance: 250000,
  movements: [],
  interestRate: 1.2,
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  balance: 139000,
  movements: [],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  balance: 1240000,
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  balance: 640000,
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const getElement = selector => document.querySelector(selector);

//LABELS
const labelWelcome = document.querySelector('.welcome');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');

// Button
const btnLogin = getElement('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');

// ELEMENT
const userEl = getElement('.login__input--user');
const pinEl = getElement('.login__input--pin');
const movementsEl = getElement('.movements');
const inputLoanAmount = getElement('.form__input--loan-amount');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputTransferTo = document.querySelector('.form__input--to');

//VARIABLES
let currentUser = '';
const accounts = [account1, account2, account3, account4];

const computeUsername = function (account) {
  const accountName = account.owner;
  const userName = accountName
    .toLowerCase()
    .split(' ')
    .map(name => name[0]);
  account.userName = userName.join('');
};

const login = function (userName, pin) {
  currentUser = '';
  for (const account of accounts) {
    computeUsername(account);
    if (account.userName === userName) {
      if (account.pin === pin) {
        currentUser = account;
        updateUI();
        // Compute username
        return;
      } else {
        alert('Incorrect pin');
        //'Incorrect pin');
        return;
      }
    }
  }
  if (!currentUser) {
    alert('No User Found');
    getElement('.app').style.opacity = '0';
    // Off ui
  }
};

const updateUI = function () {
  getElement('.app').style.opacity = '1';
  labelWelcome.textContent = `Good Evening ${currentUser.owner}`;
  labelBalance.textContent = '₦' + currentUser.balance;
  let moneyIn = 0;
  let moneyOut = 0;
  currentUser.movements.forEach(function (movement) {
    if (Math.sign(movement) === -1) {
      moneyOut += Number(Math.abs(movement));
    } else {
      moneyIn += Number(movement);
    }
  });
  labelSumIn.textContent = moneyIn;
  labelSumOut.textContent = moneyOut;

  // Display movements
  movementsEl.innerHTML = '';
  currentUser.movements.forEach(function (transaction, i) {
    const type = transaction > 0 ? 'deposit' : 'withdrawal';
    const transRow = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">3 days ago</div>
    <div class="movements__value">₦${transaction}</div>
  </div>`;
    movementsEl.insertAdjacentHTML('afterbegin', transRow);
  });
};
const requestLoan = function (evt) {
  evt.preventDefault();
  const loan = inputLoanAmount.value;
  if (loan) {
    currentUser.balance += Number(loan);
    currentUser.movements.push(loan);
    // Transaction successful update Ui
    inputLoanAmount.value = '';
    updateUI();
  }
};

const transfer = function (evt) {
  evt.preventDefault();
  const receiverAccEl = inputTransferTo;
  const receiver = receiverAccEl.value.toLowerCase();
  const amount = Number(inputTransferAmount.value);
  //
  for (const receiverAccount of accounts) {
    if (receiver === currentUser.userName) {
      alert('You cannot transfer money to yourself');
      return;
    } else if (receiverAccount.userName === receiver) {
      if (amount > 0 && currentUser.balance > amount) {
        receiverAccount.balance += amount;
        receiverAccount.movements.push(amount);
        currentUser.balance -= amount;
        currentUser.movements.push(-amount);
        inputTransferAmount.value = '';
        receiverAccEl.value = '';
        updateUI();
        //currentUser.movements);
        return;
      }
      alert('Insufficient Balance');
      return;
    }
  }
  alert('User does not exist');
};

btnLogin.addEventListener('click', function (evt) {
  evt.preventDefault();
  const userName = userEl.value.toLowerCase();
  const pin = Number(pinEl.value);
  login(userName, pin);
});

btnLoan.addEventListener('click', requestLoan);

btnTransfer.addEventListener('click', transfer);
// Loop through the accounts and check if the user exist only then should you check if the password matches

/////////////////////////////////////////////////
// Starting App
