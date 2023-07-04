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
// const labelWelcome = getElement('.welcome');
// const labelDate = getElement('.date');
// const labelBalance = getElement('.balance__value');
// const labelSumIn = getElement('.summary__value--in');
// const labelSumOut = getElement('.summary__value--out');
// const labelSumInterest = getElement('.summary__value--interest');
// const labelTimer = getElement('.timer');

// const containerApp = getElement('.app');
// const containerMovements = getElement('.movements');

// const btnLogin = getElement('.login__btn');
// const btnTransfer = getElement('.form__btn--transfer');
// const btnLoan = getElement('.form__btn--loan');
// const btnClose = getElement('.form__btn--close');
// const btnSort = getElement('.btn--sort');

// const inputLoginUsername = getElement('.login__input--user');
// const inputLoginPin = getElement('.login__input--pin');
// const inputinputTransferTo = getElement('.form__input--to');
// const inputTransferAmount = getElement('.form__input--amount');
// const inputLoanAmount = getElement('.form__input--loan-amount');
// const inputCloseUsername = getElement('.form__input--user');
// const inputClosePin = getElement('.form__input--pin');

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
  owner: 'Olaoluwa Thompson',
  movements: [200, -200, 340, -300, -20, 460],
  interestRate: 1.2,
  pin: 1111,
};

const account2 = {
  owner: 'Graceey Thompson',
  movements: [200, 50, 400, -460],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Femmy Thomas',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Vikky Thompson',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const getElement = selector => document.querySelector(selector);

//LABELS
const labelWelcome = getElement('.welcome');
const labelBalance = getElement('.balance__value');
const labelSumIn = getElement('.summary__value--in');
const labelSumOut = getElement('.summary__value--out');
const labelSumInterest = getElement('.summary__value--interest');

// Button
const btnLogin = getElement('.login__btn');
const btnTransfer = getElement('.form__btn--transfer');
const btnLoan = getElement('.form__btn--loan');
const btnSort = getElement('.btn--sort');
// ELEMENT
const userEl = getElement('.login__input--user');
const pinEl = getElement('.login__input--pin');
const movementsEl = getElement('.movements');
const inputLoanAmount = getElement('.form__input--loan-amount');
const inputTransferAmount = getElement('.form__input--amount');
const inputTransferTo = getElement('.form__input--to');

//VARIABLES
let currentUser = '';
const accounts = [account1, account2, account3, account4];

const createUsername = function () {
  accounts.forEach(function (account) {
    const userName = account.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0]);
    account.userName = userName.join('');
  });
};
createUsername();
const login = function () {
  const userName = userEl.value.toLowerCase();
  const pin = Number(pinEl.value);
  currentUser = '';
  currentUser = accounts.find(account => {
    return account.userName === userName;
  });

  if (!currentUser) {
    alert('No user Found');
    getElement('.app').style.opacity = '0';
    return;
  } else {
    if (pin === currentUser.pin) {
      labelWelcome.textContent = `Good Evening ${currentUser.owner}`;
      userEl.value = pinEl.value = '';
      pinEl.blur();
      userEl.blur();
      updateUI();
    } else {
      alert('Incorrect pin');
      getElement('.app').style.opacity = '0';
    }
  }
};

const updateUI = function () {
  getElement('.app').style.opacity = '1';

  currentUser.balance = currentUser.movements.reduce(
    (acc, cur) => acc + cur,
    0
  );
  labelBalance.textContent = '₦' + currentUser.balance;
  const totalDeposit = currentUser.movements
    .filter(transaction => transaction > 0)
    .reduce((acc, cur) => acc + cur, 0);
  const totalWithdrawal = currentUser.movements
    .filter(transaction => transaction < 0)
    .reduce((acc, cur) => acc + cur, 0);
  const interest = currentUser.movements
    .filter(transaction => transaction > 0)
    .map(transaction => (transaction * currentUser.interestRate) / 100)
    .filter(interest => interest >= 1)
    .reduce((acc, interest) => acc + interest, 0);

  labelSumInterest.textContent = `₦${interest.toFixed(2)}`;
  labelSumIn.textContent = `₦${totalDeposit}`;
  labelSumOut.textContent = `₦${Math.abs(totalWithdrawal)}`;

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

btnLogin.addEventListener('click', function (evt) {
  evt.preventDefault();
  login();
});

btnLoan.addEventListener('click', function (evt) {
  evt.preventDefault();
  const loan = Number(inputLoanAmount.value);
  if (loan > 0 && currentUser.movements.some(trans => trans >= loan * 0.1)) {
    currentUser.movements.push(loan);
    // Transaction successful update Ui
    inputLoanAmount.value = '';
    updateUI();
    return;
  }
  alert('Your Loan Request was not Approved');
});

btnTransfer.addEventListener('click', function (evt) {
  evt.preventDefault();
  const inputTransferToEl = inputTransferTo;
  const inputTransfer = inputTransferToEl.value.toLowerCase();
  const amount = Number(inputTransferAmount.value);
  //

  const receiverAcc = accounts.find(
    account => account.userName === inputTransfer
  );
  if (receiverAcc) {
    if (receiverAcc.userName === currentUser.userName) {
      alert('You cannot transfer money to yourself');
      return;
    } else {
      if (amount > 0 && currentUser.balance >= amount) {
        receiverAcc.movements.push(amount);
        currentUser.movements.push(-amount);
        inputTransferAmount.value = '';
        inputTransferToEl.value = '';
        updateUI();
        //currentUser.movements);
        return;
      }
      alert('Insufficient Balance');
      return;
    }
  }
  alert('User does not exist');
});

let isSorted = false;
let defaultOrder;
const sortArray = function () {
  if (isSorted == true) {
    console.log('Sorted');
    currentUser.movements = defaultOrder;
  } else {
    defaultOrder = currentUser.movements.map(trans => trans);
    console.log(defaultOrder);
    currentUser.movements.sort((a, b) => {
      if (a > b) return 1;
      if (b > a) return -1;
    });
  }
  isSorted = !isSorted;
};

btnSort.addEventListener('click', function (e) {
  console.log('clicked');
  sortArray();
  updateUI();
});

// const capitalize = str => str[0].toUpperCase() + str.slice(1);
// const convertTitleCase = function (title) {
//   const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];
//   return capitalize(
//     title
//       .toLowerCase()
//       .split(' ')
//       .map(word => (!exceptions.includes(word) ? capitalize(word) : word))
//       .join(' ')
//   );
// };

// console.log(convertTitleCase('and this is also LONG nice title'));
