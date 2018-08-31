var db;
var dataset;
var ben = [];
var training =[];
var bentraining = [];
var users = [];
function createAll(){
    if(navigator.onLine){
        console.log('initializing database');
        try{
            
            if(!window.openDatabase) {
                alert('Not supported');
            }else{
                var shortName = 'moapdb';
                var version = '1.0';
                var displayName = 'Moap Database';
                var maxSizeInBytes = 2222222222;
                db = openDatabase(shortName, version, displayName, maxSizeInBytes);

       
                var sql = "CREATE TABLE IF NOT EXISTS benNew (id INTEGER PRIMARY KEY AUTOINCREMENT, benid text NOT NULL,fname text NOT NULL,surname text NOT NULL,gender text NOT NULL,yob text NOT NULL,group_name text NOT NULL,prev_ben text NOT NULL,hhsize text NOT NULL,gps text NOT NULL,value_chain text NOT NULL,community text NOT NULL,region text NOT NULL,district text NOT NULL,farm_size text NOT NULL,role text NOT NULL,pic text NOT NULL,officer text NOT NULL,regdate text NOT NULL)";
                db.transaction(
                      function (transaction) {
                          transaction.executeSql(sql, []);
                          console.debug('executeSql: ' + sql);
                      }
                  );
               
                  var training = "CREATE TABLE IF NOT EXISTS training (id INTEGER PRIMARY KEY AUTOINCREMENT,tid text NOT NULL, title text NOT NULL,description text NOT NULL,dot text NOT NULL,venue text NOT NULL, status text NOT NULL)";
                  db.transaction(
                      function (transaction) {
                          transaction.executeSql(training, []);
                          console.debug('executeSql: ' + sql);
                      }
                  );
                  var training_ben = "CREATE TABLE IF NOT EXISTS training_ben (id INTEGER PRIMARY KEY AUTOINCREMENT, benid text NOT NULL, training_id text NOT NULL,training_title text NOT NULL,description text NOT NULL,dot text NOT NULL, venue text NOT NULL)";
                  db.transaction(
                      function (transaction) {
                          transaction.executeSql(training_ben, []);
                          console.debug('executeSql: ' + sql);
                      }
                  );

                    var user = "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, fullname text NOT NULL,username text NOT NULL,password text NOT NULL,level text NOT NULL)";
                    db.transaction(
                        function (transaction) {
                            transaction.executeSql(user, []);
                            console.debug('executeSql: ' + sql);
                        }
                    );

                      var sql = "CREATE TABLE IF NOT EXISTS prev (id INTEGER PRIMARY KEY AUTOINCREMENT, benid text NOT NULL,fname text NOT NULL,surname text NOT NULL,gender text NOT NULL,yob text NOT NULL,group_name text NOT NULL,prev_ben text NOT NULL,hhsize text NOT NULL,gps text NOT NULL,value_chain text NOT NULL,community text NOT NULL,region text NOT NULL,district text NOT NULL,farm_size text NOT NULL,role text NOT NULL,officer text NOT NULL,regdate text NOT NULL)";
                      
                      db.transaction(
                          
                      function (transaction) {
                          transaction.executeSql(sql, []);
                          console.debug('executeSql: ' + sql); 
                      }
                      
                  );
                            //console.log(this.ben);   
                            
            }
        }catch(e){
            if (e==2){
                alert('Invalid database version');
            }else{
                alert('unknown error ' + e);
            }
            return;
        }
    }else{
        alert('No internet connnection could not update the App');
    }
}
function loadBen(){
$.ajax({
    url: "http://www.moapsystem.com/moapapi/api/ben/read.php",
    success:function(data){
        var bens= data.data;
         var sql = 'INSERT INTO prev (benid,fname,surname,gender,yob,group_name,prev_ben,hhsize,gps,value_chain,community,region,district,farm_size,role,officer,regdate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        bens.forEach(function(entry){
            var benid= entry.benid;
            var fname = entry.fname;
            var surname = entry.surname;
            var gender = entry.gender;
            var yob = entry.yob;
            var group_name = entry.group_name;
            var prev_ben = entry.prev_ben;
            var hhsize = entry.prev_ben;
            var gps = entry.gps;
            var value_chain = entry.value_chain;
            var community = entry.community;
            var region = entry.region;
            var district = entry.district;
            var farm_size = entry.farm_size;
            var role = entry.role;
            var officer = entry.officer;
            var regdate = entry.regdate;
            db.transaction(function(tx) {
            
             tx.executeSql(sql, [benid,fname,surname,gender,yob,group_name,prev_ben,hhsize,gps,value_chain,community,region,district,farm_size,role,officer,regdate]);
             console.debug("executeSql: " + sql);
            })
        })
    }
})
}

function loadtrain(){
  $.ajax({
    url: "http://www.moapsystem.com/moapapi/api/train/read.php",
    //http://www.moapsystem.com/moapapi/api/train/read.php
    success:function(data){
        var bens= data.data;
         var sql = 'INSERT INTO training (tid, title,description,dot,venue,status) VALUES (?, ?, ?, ?, ?, ?)';
        bens.forEach(function(entry){ 
            var tid= entry.id;
            var title = entry.title;
            var des = entry.description;
            var dot = entry.dot;
            var venue = entry.venue;
            var status = entry.status;
            db.transaction(function(tx) {
             tx.executeSql(sql, [tid,title,des,dot,venue,status]);
             console.debug("executeSql: " + sql);
            })
        })
    }
})
}

function loadData(){
    if(navigator.onLine){
        var shortName = 'moapdb';
        var version = '1.0';
        var displayName = 'Moap Database';
        var maxSizeInBytes = 2222222222;
        db = openDatabase(shortName, version, displayName, maxSizeInBytes);

        db.transaction(function(t) {
            t.executeSql("DROP TABLE prev", [], function(t, results) {
                console.error("Deleted");
              }, function(t, error) {
                console.error("error " + error.message);
              });
        })
        var sql = "CREATE TABLE IF NOT EXISTS prev (id INTEGER PRIMARY KEY AUTOINCREMENT, benid text NOT NULL,fname text NOT NULL,surname text NOT NULL,gender text NOT NULL,yob text NOT NULL,group_name text NOT NULL,prev_ben text NOT NULL,hhsize text NOT NULL,gps text NOT NULL,value_chain text NOT NULL,community text NOT NULL,region text NOT NULL,district text NOT NULL,farm_size text NOT NULL,role text NOT NULL,officer text NOT NULL,regdate text NOT NULL)";
        db.transaction(
            function (transaction) {
                transaction.executeSql(sql, []);
                console.debug('executeSql: ' + sql);
            }
        );

        db.transaction(function (t) {
            t.executeSql("DROP TABLE training", [], function (t, results) {
                console.error("Deleted");
            }, function (t, error) {
                console.error("error " + error.message);
            });
        })
        var training = "CREATE TABLE IF NOT EXISTS training (id INTEGER PRIMARY KEY AUTOINCREMENT,tid text NOT NULL, title text NOT NULL,description text NOT NULL,dot text NOT NULL,venue text NOT NULL, status text NOT NULL)";
        db.transaction(
            function (transaction) {
                transaction.executeSql(training, []);
                console.debug('executeSql: ' + sql);
            }
        );

        loadBen();
        loadtrain();
        alert('App Updated successfully');
    }else{
        alert('No Internet Connection, Please try again later')
    }
}

