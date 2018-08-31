var db;
var dataset;

function initDatabase() {
    console.debug('called initDatabase()');

    try {
        if (!window.openDatabase) {
            alert('not supported');
        } else {
            var shortName = 'moapdb';
            var version = '1.0';
            var displayName = 'Moap Database';
            var maxSizeInBytes = 2222222;
            db = openDatabase(shortName, version, displayName, maxSizeInBytes);

            createTableIfNotExists();
        }
    } catch(e) {
        if (e == 2) {
            alert('Invalid database version')
        } else {
            alert('Unknown error ' + e);
        }
        return;
    }
}

function createTableIfNotExists() {
    console.debug('called createTableIfNotExists()');

    var sql = "CREATE TABLE IF NOT EXISTS ben (id INTEGER PRIMARY KEY AUTOINCREMENT, benid text NOT NULL,fname text NOT NULL,surname text NOT NULL,gender text NOT NULL,yob text NOT NULL,group_name text NOT NULL,prev_ben text NOT NULL,hhsize text NOT NULL,gps text NOT NULL,value_chain text NOT NULL,community text NOT NULL,region text NOT NULL,district text NOT NULL,farm_size text NOT NULL,role text NOT NULL,pic text NOT NULL,officer text NOT NULL,regdate text NOT NULL)";

    db.transaction(
        function (transaction) {
            transaction.executeSql(sql, [], showRecords, handleErrors);
            console.debug('executeSql: ' + sql);
        }
    );
}

function insertRecord() {
    console.debug('called insertRecord()');

  var benid="N/A";
	var fname=$('#fname').val();
	var surname=$('#surname').val();
	var gender=$('#gender').val();
	var yob=$('#yob').val();
	var group_name=$('#group_name').val();
	var prev_ben=$('#prev_ben').val();
	var hhsize=$('#hhsize').val();
	var gps=$('#gps').val();
	var value_chain=$('#value_chain').val();
	var community=$('#community').val();
	var region=$('#ddl').val();
	var district=$('#ddl2').val();
	var farm_size=$('#farm_size').val();
	var role=$('#role').val();
	var officer=$('#surveyor').val();
  var target = "http://moapsystem.com/pics/default-avatar.png";
  var regdate=new Date();

    var sql = 'INSERT INTO ben (benid,fname,surname,gender,yob,group_name,prev_ben,hhsize,gps,value_chain,community,region,district,farm_size,role,pic,officer,regdate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    db.transaction(
        function (transaction) {
            transaction.executeSql(sql, [benid,fname,surname,gender,yob,group_name,prev_ben,hhsize,gps,value_chain,community,region,district,farm_size,role,target,officer,regdate], showRecordsAndResetForm, handleErrors);
            console.debug('executeSql: ' + sql);
        }
    );
}



function deleteRecord(id) {
    console.debug('called deleteRecord()');

    var sql = 'DELETE FROM ben WHERE id=?';

    db.transaction(
        function (transaction) {
            transaction.executeSql(sql, [id], showRecords, handleErrors);
            console.debug('executeSql: ' + sql);
            alert('Delete Sucessfully');
        }
    );

    resetForm();
}

function updateRecord() {
    console.debug('called updateRecord()');

    var fname=$('#fname').val();
	var surname=$('#surname').val();
	var gender=$('#gender').val();
	var yob=$('#yob').val();
	var group_name=$('#group_name').val();
	var prev_ben=$('#prev_ben').val();
	var hhsize=$('#hhsize').val();
	var gps=$('#gps').val();
	var value_chain=$('#value_chain').val();
	var community=$('#community').val();
	var region=$('#ddl').val();
	var district=$('#ddl2').val();
	var farm_size=$('#farm_size').val();
	var role=$('#role').val();
	var officer = $('#surveyor').val();
    var id = $("#id").val();

    var sql = 'UPDATE ben SET fname=?,surname=?,gender=?,yob=?,group_name=?,prev_ben=?,hhsize=?,gps=?,value_chain=?,community=?,region=?,district=?,farm_size=?,role=?,officer=? WHERE id=?';

    db.transaction(
        function (transaction) {
            transaction.executeSql(sql, [fname,surname,gender,yob,group_name,prev_ben,hhsize,gps,value_chain,community,region,district,farm_size,role,officer, id], showRecordsAndResetForm, handleErrors);
            console.debug('executeSql: ' + sql);
        }
    );
}


function dropTable() {
    console.debug('called dropTable()');

if (navigator.onLine){
    var shortName = 'moapdb';
    var version = '1.0';
    var table = "ben";
    var displayName = 'Moap Database';
    var maxSizeInBytes = 22222222;
    db = openDatabase(shortName, version, displayName, maxSizeInBytes);

    db.transaction(function (tx) {
    var l = [];
    tx.executeSql('select * from ' + table, null, function(tx, res){
        for (var i = 0; i < res.rows.length; i++) {
            l.push(res.rows.item(i));
        }
      var data1 =(JSON.stringify(l, null, '\t'));
      console.log(data1);
      var sendUrl = 'http://moapsystem.com/readjson.php';
     $.ajax({
       type: "POST",
       url: sendUrl,
       async: false,
       data:{ben : data1},
       success: function(data){
          alert(data);
          return true;
       },
       complete: function() {},
       error: function(xhr, textStatus, errorThrown) {
         alert('Successful');
         return false;
       }
    });
  })
})

    db.transaction(function (tx) {
        var k = [];
        tx.executeSql('select * from training_ben', null, function (tx, res) {
            for (var i = 0; i < res.rows.length; i++) {
                k.push(res.rows.item(i));
            }
            var data1 = (JSON.stringify(k, null, '\t'));
            console.log(data1);
            var sendUrl = 'http://moapsystem.com/trainjson.php';
            $.ajax({
                type: "POST",
                url: sendUrl,
                async: false,
                data: {
                    train: data1
                },
                success: function (data) {
                    alert(data);
                    return true;
                },
                complete: function () {},
                error: function (xhr, textStatus, errorThrown) {
                    alert('Successful');
                    return false;
                }
            });
        })
    })

    var sql = 'DELETE FROM ben';

    db.transaction(
        function (transaction) {
            transaction.executeSql(sql, [], showRecords, handleErrors);
        }
    );

     var sql = 'DELETE FROM training_ben';

     db.transaction(
         function (transaction) {
             transaction.executeSql(sql, [], showRecords, handleErrors);
         }
     );

    resetForm();

    //initDatabase();
    }else{
        alert('No connection, try again');
    }
}

function resetForm() {
    console.debug('called resetForm()');

    
  $('#id').val('');
  $('#fname').val('');
	$('#surname').val('');
	$('#gender').val('');
	$('#yob').val('');
	$('#group_name').val('');
	$('#prev_ben').val('');
	$('#hhsize').val('');
	$('#gps').val('');
	$('#value_chain').val('');
	$('#community').val('');
	$('#ddl').val('');
	$('#ddl2').val('');
	$('#farm_size').val('');
	$('#role').val('');
	$('#surveyor').val('');
}

function showRecordsAndResetForm() {
    console.debug('called showRecordsAndResetForm()');

    resetForm();
    showRecords()
}

function handleErrors(transaction, error) {
    console.debug('called handleErrors()');
    console.error('error ' + error.message);

    alert(error.message);
    return true;
}

function showRecords() {
    console.debug('called showRecords()');

    var sql = "SELECT * FROM ben";

    db.transaction(
        function (transaction) {
            transaction.executeSql(sql, [], renderRecords, handleErrors);
        }
    );
}

function renderRecords(transaction, results) {
    console.debug('called renderRecords()');

    html = '';
    $('#results').html('');

    dataset = results.rows;

    if (dataset.length > 0) {
        html = html + '  <ul data-role="listview">';

        for (var i = 0, item = null; i < dataset.length; i++) {
            item = dataset.item(i);

            html = html + '    <li>';
            html = html + '      <h3>Name: ' + item['fname'] +' ' + item['surname']+ '</h3>';
            html = html + '      <h3>Community: ' + item['community'] + '</h3>';
           
            html = html + '      <p>';
            html = html + '        <button type="button" data-icon="arrow-u" onClick="prepareEdit(' + i + ');">edit</button>';
            html = html + '        <button type"button" data-icon="delete" onClick="deleteRecord(' + item['id'] + ');">delete</button>';
            html = html + '      </p>';
            html = html + '    </li>';
        }

        html = html + '  </ul>';

        $('#results').append(html);
        $('#results ul').listview();
    }
}

function renderRecordsTrain(transaction, results) {
    console.debug('called renderRecords()');

    html = '';
    $('#results').html('');

    dataset = results.rows;

    if (dataset.length > 0) {
        html = html + '  <ul data-role="listview">';

        for (var i = 0, item = null; i < dataset.length; i++) {
            item = dataset.item(i);

            html = html + '    <li>';
            html = html + '      <h3>Name: ' + item['fname'] + ' ' + item['surname'] + '</h3>';
            html = html + '      <h3>Community: ' + item['community'] + '</h3>';

            html = html + '      <p>';
            html = html + '        <button type="button" data-icon="arrow-u" onClick="prepareEditTrain(' + i + ');">edit</button>';
            html = html + '        <button type"button" data-icon="delete" onClick="deleteRecord(' + item['id'] + ');">delete</button>';
            html = html + '      </p>';
            html = html + '    </li>';
        }

        html = html + '  </ul>';

        $('#results').append(html);
        $('#results ul').listview();
    }
}

function prepareAdd() {
  $('form').show();
  $('#btnAdd').addClass('ui-disabled');
  $('#results').addClass('ui-disabled');
  $('#btnSave').on('click', function(){ insertRecord() });
  $('#btnSave').on('click', function(){ cancelAction() });
  $('#fname').focus();
}

function prepareAddTrain() {
  $('form').show();
  $('#btnAdd1').addClass('ui-disabled');
  $('#results1').addClass('ui-disabled');
  $('#btnSave1').on('click', function(){ insertRecord() });
  $('#btnSave1').on('click', function(){ cancelAction() });
 
}

function prepareEditTrain(i) {
    loadRecord(i)

    $('form').show();
    $('#btnAdd1').addClass('ui-disabled');
    $('#results1').addClass('ui-disabled');
    $('#btnSave1').on('click', function () { updateRecord() });
    $('#btnSave1').on('click', function () { cancelAction() });
    
}
function prepareEdit(i) {
  loadRecord(i)

  $('form').show();
  $('#btnAdd').addClass('ui-disabled');
  $('#results').addClass('ui-disabled');
  $('#btnSave').on('click', function(){ updateRecord() });
  $('#btnSave').on('click', function(){ cancelAction() });
  $('#fname').focus();
}

function loadRecord(i) {
    console.debug('called loadRecord()');

    var item = dataset.item(i);

    $('#name').val(item['name']);
    $('#phone').val(item['phone']);
  
    $('#fname').val(item['fname']);
	$('#surname').val(item['surname']);
	$('#gender').val(item['gender']);
	$('#yob').val(item['yob']);
	$('#group_name').val(item['group_name']);
	$('#prev_ben').val(item['prev_ben']);
	$('#hhsize').val(item['hhsize']);
	$('#gps').val(item['gps']);
	$('#value_chain').val(item['value_chain']);
	$('#community').val(item['community']);
	$('#ddl').val(item['ddl']);
	$('#ddl2').val(item['ddl2']);
	$('#farm_size').val(item['farm_size']);
	$('#role').val(item['role']);
	$('#surveyor').val(item['officer']);
    $('#id').val(item['id']);
}

function cancelAction() {
  $('form').hide();
  $('#btnAdd').removeClass('ui-disabled');
  $('#results').removeClass('ui-disabled');
  $('#btnSave').off('click');
}

function cancelAction1() {
    $('form').hide();
    $('#btnAdd1').removeClass('ui-disabled');
    $('#results1').removeClass('ui-disabled');
    $('#btnSave1').off('click');
}


function updateCacheContent(event) {
    console.debug('called updateCacheContent()');
    window.applicationCache.swapCache();
}

$(document).ready(function () {
    window.applicationCache.addEventListener('updateready', updateCacheContent, false);

    initDatabase();
    cancelAction();
});
