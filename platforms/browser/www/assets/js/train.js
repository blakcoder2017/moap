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
    } catch (e) {
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

    var benid = $('#benid').val();
    var trainid = $('#trainid').val();
    var title = $('#title').val();
    var des = $('#des').val();
    var dot = $('#dot').val();
    var venue = $('#venue').val();
  

    var sql = 'INSERT INTO training_ben (benid,training_id,training_title,description,dot,venue) VALUES (?, ?, ?, ?, ?,?)';

    db.transaction(
        function (transaction) {
            transaction.executeSql(sql, [benid, trainid, title, des, dot, venue], showRecordsAndResetForm, handleErrors);
            console.debug('executeSql: ' + sql);
        }
    );
}

function deleteRecord(id) {
    console.debug('called deleteRecord()');

    var sql = 'DELETE FROM training_ben WHERE id=?';

    db.transaction(
        function (transaction) {
            transaction.executeSql(sql, [id], showRecords, handleErrors);
            console.debug('executeSql: ' + sql);
            alert('Delete Sucessfully');
        }
    );

    resetForm();
}



function dropTable() {
    console.debug('called dropTable()');

    if (navigator.onLine) {
        var shortName = 'moapdb';
        var version = '1.0';
        var table = "ben";
        var displayName = 'Moap Database';
        var maxSizeInBytes = 22222222;
        db = openDatabase(shortName, version, displayName, maxSizeInBytes);

        db.transaction(function (tx) {
            var l = [];
            tx.executeSql('select * from ' + table, null, function (tx, res) {
                for (var i = 0; i < res.rows.length; i++) {
                    l.push(res.rows.item(i));
                }
                var data1 = (JSON.stringify(l, null, '\t'));
                console.log(data1);
                var sendUrl = 'http://moapsystem.com/readjson.php';
                $.ajax({
                    type: "POST",
                    url: sendUrl,
                    async: false,
                    data: {
                        ben: data1
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

        var sql = 'DELETE FROM training_ben';

        db.transaction(
            function (transaction) {
                transaction.executeSql(sql, [], showRecords, handleErrors);
            }
        );

        resetForm();

        //initDatabase();
    } else {
        alert('No connection, try again');
    }
}

function resetForm() {
    console.debug('called resetForm()');


    $('#benid').val('');
    $('#trainid').val('');
    $('#title').val('');
    $('#des').val('');
    $('#dot').val('');
    $('#venue').val('');
  
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

    var sql = "SELECT * FROM training_ben";

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
            html = html + '      <h3>Training: ' + item['training_title'] + '</h3>';
            html = html + '      <h3>Description: ' + item['description'] + '</h3>';
            html = html + '      <h3>Ben ID: ' + item['benid'] + '</h3>';
            html = html + '      <p>';
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
    $('#btnSave').on('click', function () {
        insertRecord()
    });
    $('#btnSave').on('click', function () {
        cancelAction()
    });
   
}

function loadRecord(i) {
    console.debug('called loadRecord()');

    var item = dataset.item(i);

    $('#benid').val(item['benid']);
    $('#trainid').val(item['trainid']);

    $('#title').val(item['title']);
    $('#des').val(item['des']);
    $('#dot').val(item['dot']);
    $('#venue').val(item['venue']);
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
