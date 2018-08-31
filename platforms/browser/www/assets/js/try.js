   let url = 'http://www.moapsystem.com/moapapi/api/ben/read.php';
                    axios.get(url)
                    .then((response) => {
                        this.ben = response.data.data;
                        this.ben.forEach((entry) => {
                            let benid= entry.benid;
                            let fname = entry.fname;
                            let surname = entry.surname;
                            let gender = entry.gender;
                            let yob = entry.yob;
                            let group_name = entry.group_name;
                            let prev_ben = entry.prev_ben;
                            let hhsize = entry.prev_ben;
                            let gps = entry.gps;
                            let value_chain = entry.value_chain;
                            let community = entry.community;
                            let region = entry.region;
                            let district = entry.district;
                            let farm_size = entry.farm_size;
                            let role = entry.role;
                            let officer = entry.officer;
                            let regdate = entry.regdate;
                            
                            var sql = 'INSERT INTO ben (benid,fname,surname,gender,yob,group_name,prev_ben,hhsize,gps,value_chain,community,region,district,farm_size,role,officer,regdate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
                            this.db.transaction(
                                function(transaction){
                                    console.log('upldate started')
                                    transaction.executeSql(sql, [benid,fname,surname,gender,yob,group_name,prev_ben,hhsize,gps,value_chain,community,region,district,farm_size,role,officer,regdate]);
                                    console.debug('executeSql: ' + sql);
                                }
                            )
                            this.loading = false;
                        })