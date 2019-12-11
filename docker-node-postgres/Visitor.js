
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

// addNewVisitor({name: 'phumlani',
// age: 17,
// date: '23-06-2010',
// time: '18:00:00',
// assistant: 'neo',
// comments: 'up to so far he is a good person'});

// addNewVisitor({name: 'tebza',
// age: 24,
// date: '25-06-2010',
// time: '19:00:00',
// assistant: 'neo',
// comments: 'up to so far he is a bad person'});

// addNewVisitor({name: 'kenneth',
// age: 24,
// date: '20-06-2012',
// time: '22:00:00',
// assistant: 'lwandile',
// comments: 'up to so far he is a bad person'});


const seeAllVisiters = () =>{
  pool.query('SELECT * FROM Visiters', (error, results)=>{
    if(error){
      throw error;
    }else{
      console.log(results.rows);
      
    }
  });
}

//seeAllVisiters();


const deleteVisiter = (Data) =>{
  pool.query('DELETE FROM Visiters WHERE name=($1)', 
  [Data.name], (error, results) =>{
    if(error){
      throw error;
    }else{
      console.log("the visiter has been deleted from the database");
      seeAllVisiters();
    }
  });
}

//deleteVisiter({name: 'tebogo'})


const updateVisiter = (Data) =>{
  pool.query('UPDATE Visiters SET name=($1), age=($2), date=($3), time=($4), assistant=($5), comments=($6) WHERE id=($7)',
  [Data.name, Data.age, Data.date, Data.time, Data.assistant, Data.comments, Data.id],
  (error, results) =>{
    if(error){
      throw error;
    }else{
      console.log("the Visiters has been updated"+'\n');
      seeAllVisiters();
      
    }
  });
}

// updateVisiter({name: 'makhenzo',
// age: 15,
// date: '16-09-2019',
// time: '18:00:00',
// assistant: 'andy',
// comments: 'up to so far he is a good person',
// id: 5});

const viewOneVisiter = (id) =>{
  pool.query(`SELECT * FROM Visiters WHERE id= ${id}`,
  (error, results) =>{
    if(error){
      throw error;
    }else{
      console.log("is this a Visiter you are looking for?"+"\n");
      console.log(results.rows);
    }
    
  });
}

//viewOneVisiter(5);


const deleteAllVisiters = () =>{
  pool.query('DELETE FROM Visiters',
   (error, results) =>{
     if(error){
       throw error;
     }else{
       console.log(results);
       
     }
   });
}

//deleteAllVisiters()
