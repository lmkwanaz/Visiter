
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "user",
  host: "localhost",
  database: "db",
  password: "pass",
  port: 5432
});

pool.connect(function(error){
    if(error){
        console.log(error);
        
    }else{
        console.log("connected");
        
    }
});

const createTables = () =>{
  pool.query('CREATE TABLE Visiters(id serial PRIMARY KEY, name VARCHAR(50), age INTEGER, date VARCHAR(50), time TIME, assistant VARCHAR(50), comments VARCHAR(50))',
  (error, results)=>{
    if(error){
      throw error;
    }else{
      console.log(results);
    }
  });
//  pool.end(); 
}

//createTables();

const dropTables = () =>{
  pool.query('DROP TABLE Visiters', (error)=>{
    if(error){
      throw error;
    }else{
      console.log("the table has been removed from the database");
      
    }
  });
  //pool.end(); 
}
//dropTables();
 
const addNewVisitor = (Data) =>{
  pool.query(`INSERT INTO Visiters(name, age, date, time, assistant, comments) VALUES($1, $2, $3, $4, $5, $6)`,[Data.name, 
    Data.age, Data.date, Data.time, Data.assistant, Data.comments] ,(error, results)=>{
    if(error){
      throw error;
    }else{
       console.log(results);
      
     }
    });
  pool.end(); 
}

// addNewVisitor({name: 'siyabonga',
// age: 20,
// date: '22-06-2010',
// time: '18:00:00',
// assistant: 'neo',
// comments: 'up to so far he is a good person'});


const seeTable = () =>{
  pool.query('SELECT * FROM Visiters', (error, results)=>{
    if(error){
      throw error;
    }else{
      console.log(results.rows);
      
    }
  });
}

seeTable();
// const helloWorld = () => {
//   pool.query(
//     "SELECT $1::text as message",
//     ["Hello world!"],
//     (error, results) => {
//       if (error) {
//         throw error;
//       }

//       console.log(results.rows);
//     }
//   );
// };

// helloWorld();
