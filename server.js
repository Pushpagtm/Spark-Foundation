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

app.post("/transaction", (req, res) => {
  try {
    const sender = req.body.sender;
    const receiver = req.body.receiver;
    const balance = req.body.balance;

    if (balance > 0) {
      const senderBlc = `SELECT * FROM customers where id=${sender}`;
      const receiverBlc = `SELECT * FROM customers where id=${receiver}`;

      db.query(senderBlc, async (err, result) => {
        if (err) {
          return res.status(500).json({
            message: "Internal server error",
          });
        }
        await db.query(receiverBlc, async (err, result2) => {
          if (err) {
            return res.status(500).json({
              message: "Internal server error",
            });
          }

          if (parseInt(result[0].balance) < parseInt(balance)) {
            return res.status(500).json({
              message: "Insufficient balance",
            });
          }

          const updateblcsender =
            parseInt(result[0].balance) - parseInt(balance);
          const updateblcreceiver =
            parseInt(result[0].balance) + parseInt(balance);

          const senderBlc = `UPDATE customers SET balance = ${updateblcsender} WHERE id = ${result[0].id}`;
          const receiverBlc = `UPDATE customers SET balance = ${updateblcreceiver} WHERE id = ${result2[0].id}`;

          await db.query(senderBlc);
          await db.query(receiverBlc);

          const insertQuery =
            "INSERT INTO transactions (sender, receiver, amount) VALUES (?, ?, ?)";
          const customerData = [sender, receiver, balance];

          db.query(insertQuery, customerData, (err, result) => {
            if (err) {
              return res.status(500).json({
                message: err.message,
              });
            }
            console.log("transaction created successfully");
          });

          return res.status(200).json({
            senderUser: result,
            receiver: result2,
          });
        });
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});
app.get("/transfer", (req, res) => {
  
  const sql = "SELECT * FROM transactions";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "error inside server" });
    return res.json(result);
  });
 
});
app.put("/update", (req, res) => {
  const receiver = req.body.receiver;
  const balance = req.body.balance;
  db.query(
    "UPDATE customers SET balance=? WHERE name=?",
    [balance, receiver],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.listen(8000, () => {
  console.log("hello backend");
});
