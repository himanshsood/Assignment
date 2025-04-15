const express = require("express");
const cors = require('cors');



app.post("/register",(req,res)=>{
    const {email,name,mobileNo,githubUsername,rollNo,collegeName,accessCode}=req.body;

    const newUser={
        email,
        name,
        mobileNo,
        githubUsername,
        rollNo,
        collegeName,
        accessCode
    }

    res.json({
        user:newUser
    })
})



/* 

{
  "email": "himansh402.be22@chitkara.edu.in",
  "name": "himansh sood",
  "rollNo": "2210990402",
  "accessCode": "PwzufG",
  "clientID": "020dc824-ddc2-4351-a932-061d27a65103",
  "clientSecret": "QKhgFGETXrkdNUuq"
}


*/


app.post("/auth",(req,res)=>{
    const {email,name,rollNo,accessCode,clientID,clientSecret}=req.body;

    const newUser={
        email,
        name,
        rollNo,
        accessCode,
        clientID,
        clientSecret
    }

    res.json({
        user:newUser
    })

})


/*

{
    "token_type": "Bearer",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ0Njk4NjIzLCJpYXQiOjE3NDQ2OTgzMjMsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjAyMGRjODI0LWRkYzItNDM1MS1hOTMyLTA2MWQyN2E2NTEwMyIsInN1YiI6ImhpbWFuc2g0MDIuYmUyMkBjaGl0a2FyYS5lZHUuaW4ifSwiZW1haWwiOiJoaW1hbnNoNDAyLmJlMjJAY2hpdGthcmEuZWR1LmluIiwibmFtZSI6ImhpbWFuc2ggc29vZCIsInJvbGxObyI6IjIyMTA5OTA0MDIiLCJhY2Nlc3NDb2RlIjoiUHd6dWZHIiwiY2xpZW50SUQiOiIwMjBkYzgyNC1kZGMyLTQzNTEtYTkzMi0wNjFkMjdhNjUxMDMiLCJjbGllbnRTZWNyZXQiOiJRS2hnRkdFVFhya2ROVXVxIn0.oEWeBn-V7qBWgFPFRFuTtcVvyyimXy0M3bBZRvYaWXo",
    "expires_in": 1744698623
}
  
  */
  



const windowSize = 10;
let numberWindow = [];

app.get("/numbers/:id", (req, res) => {
  const id = req.params.id;
  const validIds = ['p', 'f', 'e', 'r'];

  if (!validIds.includes(id)) {
    return res.status(400).json({ error: "Invalid ID type" });
  }

// i will generate random numbers
  const numbers = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));

  const prevState = [...numberWindow];
  const newNumbers = numbers.filter(num => !numberWindow.includes(num));
  numberWindow.push(...newNumbers);

  while (numberWindow.length > windowSize) {
    numberWindow.shift();
  }

  //finding average
  const sum = numberWindow.reduce((a, b) => a + b, 0);
  const count = numberWindow.length;
  const avg = sum / count;

  res.json({
    windowPrevState: prevState,
    windowCurrState: numberWindow,
    numbers: numbers, 
    avg: parseFloat(avg.toFixed(2))
  });
});

app.listen(3000, () => {
  console.log(`server has started`);
});
