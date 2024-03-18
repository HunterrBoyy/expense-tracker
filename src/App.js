import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [userName, setUserName] = useState("");
  const [loggedInUserDetails, setLoggedInUserDetails] = useState({});
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState(0);
  const [userPassword, setUserPassword] = useState("");
  const [userDetails, setUserDetails] = useState(
    JSON.parse(localStorage.getItem("Userdetails")) || []
  );
  const [userSession, setUserSession] = useState(
    JSON.parse(localStorage.getItem("UserSession")) || ""
  );
  const [userHistory, setUserHistory] = useState([]);

  const [showLogin, setShowLogin] = useState(false);
  const [showStatement, setShowStatement] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("Records")) || []
  );
  // login info part
  const [loginUserName, setLoginUserName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // income part
  const [incomeList, setIncomeList] = useState("");
  const [incomeRemarks, setIncomeRemarks] = useState("");
  const [incomeAmount, setincomeAmount] = useState(0);

  // expense part
  const [expenseList, setExpenseList] = useState("");
  const [expenseRemarks, setExpenseRemarks] = useState("");
  const [expenseAmount, setExpenseAmount] = useState(0);

  const [showHistory, setShowHistory] = useState(true);
  const [showAddIncomeForm, setShowAddIncomeForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [balance, setBalance] = useState(localStorage.getItem("Balance") || 0);

  // sort descending order
  const sortdesc = (a, b) => {
    var dateA = new Date(a.createdDate),
      dateB = new Date(b.createdDate);
    return dateB - dateA;
  };

  // clear all the input box
  const clearincome = () => {
    setIncomeList("");
    setincomeAmount(0);
    setIncomeRemarks("");
  };
  const clearexpense = () => {
    setExpenseList("");
    setExpenseAmount(0);
    setExpenseRemarks("");
  };

  const clearloginbox = () => {
    setLoginUserName("");
    setLoginPassword("");
  };
  const incomelist = (e) => {
    setIncomeList(e.target.value);
  };
  const incomeamount = (e) => {
    setincomeAmount(e.target.value);
  };
  const incomeremark = (e) => {
    setIncomeRemarks(e.target.value);
  };

  const submitincome = () => {
    history.push({
      source: incomeList,
      amount: incomeAmount,
      remarks: incomeRemarks,
      type: "income",
      createdDate: new Date(),
    });
    localStorage.setItem("Records", JSON.stringify(history));
    setBalance(parseFloat(balance) + parseFloat(incomeAmount));
    console.log("BAlanceState", balance);
    let tempBalance = parseFloat(balance) + parseFloat(incomeAmount);
    localStorage.setItem("Balance", tempBalance);
    console.log(history);
    clearincome();
    setShowHistory(true);
    setShowExpenseForm(false);
    setShowAddIncomeForm(false);
    somefunction();
  };
  const expenselist = (e) => {
    setExpenseList(e.target.value);
  };
  const expenseamount = (e) => {
    setExpenseAmount(e.target.value);
  };
  const expenseremark = (e) => {
    setExpenseRemarks(e.target.value);
  };

  const submitexpense = () => {
    history.push({
      source: expenseList,
      amount: expenseAmount,
      remarks: expenseRemarks,
      type: "expense",
      createdDate: new Date(),
    });
    localStorage.setItem("Records", JSON.stringify(history));
    setBalance(parseFloat(balance) - parseFloat(expenseAmount));
    let tempBalance = parseFloat(balance) - parseFloat(expenseAmount);
    localStorage.setItem("Balance", tempBalance);
    clearexpense();
    setShowHistory(true);
    setShowExpenseForm(false);
    setShowAddIncomeForm(false);
    somefunction();
  };
  const username = (e) => {
    setUserName(e.target.value);
  };
  const useremail = (e) => {
    setUserEmail(e.target.value);
  };
  const userid = (e) => {
    setUserId(e.target.value);
  };
  const userpassword = (e) => {
    setUserPassword(e.target.value);
  };
  const register = () => {
    userDetails.push({
      username: userName,
      useremail: userEmail,
      userid: userId,
      password: userPassword,
    });
    localStorage.setItem("Userdetails", JSON.stringify(userDetails));
    setShowLogin(true);
    setShowForm(false);
    setShowStatement(false);
  };
  const remove = (index) => {
    let tempHistory = [...history];
    let tempAmount = tempHistory[index].amount;
    if (tempHistory[index].type === "income") {
      let tempBalance = parseFloat(balance) - parseFloat(tempAmount);
      console.log("balanceincome", tempBalance);
      console.log("balance", balance);
      console.log("incomeamount", incomeAmount);

      localStorage.setItem("Balance", tempBalance);
      setBalance(tempBalance);
    } else {
      let tempBalance = parseFloat(balance) + parseFloat(tempAmount);
      localStorage.setItem("Balance", tempBalance);
      setBalance(tempBalance);
    }
    tempHistory.splice(index, 1);
    setHistory(tempHistory);
    localStorage.setItem("Records", JSON.stringify(tempHistory));
  };
  const createaccount = () => {
    setShowLogin(false);
    setShowForm(true);
    setShowStatement(false);
  };
  const loginusername = (e) => {
    setLoginUserName(e.target.value);
  };
  const loginpassword = (e) => {
    setLoginPassword(e.target.value);
  };
  const [userID, setUserID] = useState(
    "" || localStorage.getItem("UserSession")
  );

  const login = () => {
    if (loginUserName !== "" && loginPassword !== "") {
      let tempUserDetail = [...userDetails];
      const user = tempUserDetail.find((element) => {
        return element.username === loginUserName;
      });
      if (
        loginUserName === user?.username &&
        loginPassword === user?.password
      ) {
        localStorage.setItem("UserSession", user?.userid);
        setUserID(user?.userid);
        setShowLogin(false);
        setShowForm(false);
        setShowStatement(true);
      } else {
        alert("Please type correct Email and Password to continue.");
      }
    } else {
      alert("please fill all the field");
    }
  };

  useEffect(() => {
    if (userID) {
      setShowLogin(false);
      setShowForm(false);
      setShowStatement(true);
      const userList = JSON.parse(localStorage.getItem("Userdetails"));
      const user = userList.find((el) => el.userid === userID);
      setLoggedInUserDetails(user);
      console.log("loggedinuser", user);
    } else {
      setShowLogin(true);
      setShowForm(false);
      setShowStatement(false);
    }
  }, [userID]);
  const getUserById = (userID) => {
    let userName = {};
    const userList = JSON.parse(localStorage.getItem("Userdetails"));
    userName = userList.find((el) => el.userid === userID);
    return userName;
  };
  const logout = () => {
    localStorage.removeItem("UserSession");
    setShowLogin(true);
    setShowForm(false);
    setShowStatement(false);
    clearloginbox();
  };
  let tempHistory = [];
  let tempBalance = [];
  const somefunction = () => {
    const userId = localStorage.getItem("UserSession");
    const userList = JSON.parse(localStorage.getItem("UserList")) || [];
    const balance = localStorage.getItem("Balance");
    const history = JSON.parse(localStorage.getItem("Records"));
    console.log("user", userId, balance, history);
    if (userList.length > 0) {
      const x = userList.find((el) => el.userId === userId);
      if (x) {
        tempHistory = x.history;
        tempBalance = x.balance;
      }
    } else {
      userList.push({ userId: userId, history: history, balance: balance });
    }
    tempHistory = history;
    tempBalance = balance;
    let newUserList = userList.map((el) =>
      el.userId === userId
        ? { ...el, history: tempHistory, balance: tempBalance }
        : el
    );
    localStorage.setItem("UserList", JSON.stringify(newUserList));
  };
  // somefunction();
  const getHistory = () => {
    const history = JSON.parse(localStorage.getItem("Records"));
    let lastElement = {};
  };

  if (showLogin) {
    return (
      <>
        <p>If you already have an account , Please login.</p>

        <div>
          <input
            type="text"
            placeholder="Username"
            onChange={loginusername}
            value={loginUserName}
          ></input>
          <br></br>
          <input
            type="password"
            placeholder="Password"
            onChange={loginpassword}
            value={loginPassword}
          ></input>
          <br></br>
          <button
            onClick={() => {
              login();
            }}
          >
            Login
          </button>
        </div>
        <p>You can create free account</p>
        <button
          onClick={() => {
            createaccount();
          }}
        >
          Create Free Account
        </button>
      </>
    );
  } else if (showForm) {
    return (
      <>
        <p>SIGN UP</p>
        <p>Its quick and easy.</p>
        <div>
          id<input type="number" onChange={userid} value={userId}></input>
        </div>
        <div>
          Username
          <input type="text" onChange={username} value={userName} />
        </div>
        <div>
          Email
          <input type="email" onChange={useremail} value={userEmail} />
        </div>
        <div>
          Password
          <input type="password" onChange={userpassword} value={userPassword} />
        </div>
        <button
          onClick={() => {
            register();
          }}
        >
          Register
        </button>
      </>
    );
  } else {
    return (
      <>
        <div className="parent">
          <div>
            <div className="flex space-between ">
              <h4>Hello, {loggedInUserDetails.username}</h4>
              <button
                className="button-height"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </button>
            </div>
            <div className="box">{balance}</div>
            <div className="flex space-evenly">
              <button
                onClick={() => {
                  setShowHistory(true);
                  setShowExpenseForm(false);
                  setShowAddIncomeForm(false);
                }}
              >
                History
              </button>
              <button
                onClick={() => {
                  setShowHistory(false);
                  setShowExpenseForm(false);
                  setShowAddIncomeForm(true);
                }}
              >
                Add Fund
              </button>
              <button
                onClick={() => {
                  setShowHistory(false);
                  setShowExpenseForm(true);
                  setShowAddIncomeForm(false);
                }}
              >
                Add Expense
              </button>
            </div>
          </div>
          {showHistory && (
            <div className="history-box">
              {history?.sort(sortdesc)?.map((e, index) => {
                return (
                  <>
                    <div
                      className={
                        e.type === "expense" ? "flex red" : "flex green"
                      }
                    >
                      <div className="w-30">{e.source}</div>
                      <div className="w-30">{e.amount}</div>
                      <div className="w-30">{e.remarks}</div>
                      <div className="w-10">
                        <button
                          onClick={() => {
                            remove(index);
                          }}
                        >
                          del
                        </button>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          )}
          {showAddIncomeForm && (
            <div>
              <div>
                <div>
                  <div className="flex space-between">
                    Income Source{" "}
                    <input
                      type="text"
                      onChange={incomelist}
                      value={incomeList}
                    ></input>
                  </div>
                  <div className="flex space-between">
                    Income Amount{" "}
                    <input
                      type="number"
                      onChange={incomeamount}
                      value={incomeAmount}
                    ></input>
                  </div>
                  <div className="flex space-between">
                    Income Remarks{" "}
                    <input
                      type="text"
                      onChange={incomeremark}
                      value={incomeRemarks}
                    ></input>
                  </div>
                </div>

                <button
                  onClick={() => {
                    submitincome();
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
          {showExpenseForm && (
            <div>
              <div>
                <div>
                  <div className="flex space-between">
                    Expense Source{" "}
                    <input
                      type="text"
                      onChange={expenselist}
                      value={expenseList}
                    ></input>
                  </div>
                  <div className="flex space-between">
                    Expense Amount{" "}
                    <input
                      type="number"
                      onChange={expenseamount}
                      value={expenseAmount}
                    ></input>
                  </div>
                  <div className="flex space-between">
                    Expense Remarks{" "}
                    <input
                      type="text"
                      onChange={expenseremark}
                      value={expenseRemarks}
                    ></input>
                  </div>
                </div>

                <button
                  onClick={() => {
                    submitexpense();
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
};

export default App;
