import express from "express";
import mysql from "mysql";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "spark_bank",
});
app.get("/", (req, res) => {
  const sql = "SELECT * FROM customers";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "error inside server" });
    return res.json(result);
  });
});
app.post("/customers", (req, res) => {
  const sql =
    "INSERT INTO customers (`name`,`acc_number`,`balance`) VALUES (?)";
  console.log(req.body);
  const values = [req.body.name, req.body.acc_number, req.body.balance];
  db.query(sql, [values], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});
app.get("/read/:id", (req, res) => {
  const sql = "SELECT * FROM customers WHERE id=? ";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "error inside server" });
    return res.json(result);
  });
});
app.post('/transaction',(req,res)=>{
  const sender=req.body.sender;
  const receiver=req.body.receiver;
  const balance=req.body.balance;

if(balance>0){
  const senderBlc = db.query(`SELECT * FROM customers where id=${sender}`)
  console.log(senderBlc);
  return res.status(200).json({
    senderBlc
  })



  db.query("INSERT INTO transfers (sender,receiver,balance) VALUES (?,?,?)",
  [sender,receiver,balance],(err,result)=>{
      if(err){
        console.log(err);
      }
      else{
        res.send("Values Inserted.");
      }
  }
);
}
});
app.put("/update",(req,res)=>{
  const receiver=req.body.receiver;
  const balance=req.body.balance;
  db.query(
    "UPDATE customers SET balance=? WHERE name=?",
    [balance,receiver],
    (err,result)=>{
      if(err){
        console.log(err);
      }else{
        res.send(result);
      }
    }
  );
});

// app.put("/moneyTransfer/:id", (req, res) => {
//   const sql = "UPDATE customers SET `balance`=? WHERE id=?";
//   const id = req.params.id;
//   db.query(sql, [req.body.balance, id], (err, result) => {
//     if (err)return res.json({ Message: "error inside server" });
//     return res.json(result);
//   });
// });

app.listen(8000, () => {
  console.log("hello backend");
});
