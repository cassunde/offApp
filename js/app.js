var db = openDatabase(
    'meuBanco', 
    '1.0', 
    'My database',
    2 * 1024 * 1024
    );
    
function atuaGrade(){

    var fLinhaGrade = "";
    
    db.transaction( function (tx) {
        tx.executeSql(
           'select '+
            ' avalia.id,'+
            ' cliente.cliente,'+
            ' modulo.modulo, '+
            ' avalia.situacao, '+
            ' avalia.nota '+
           'from'+
            ' avalia '+
            ' inner join cliente on cliente.id = avalia.fkcliente'+
            ' inner join modulo  on modulo.id  = avalia.fkmodulo',
           [],
           function (tx, results)
           {
              var len = results.rows.length;              
               
              for (var i = 0; i < len; i++)
              {
                 var row = results.rows.item(i);                     
                
                 fLinhaGrade += '<tr>'+
                                    '<th>'+row.id+'</th>'+
                                    '<th>'+row.cliente+'</th>'+
                                    '<th>'+ row.modulo +'</th>'+
                                    '<th>'+ row.situacao +'</th>'+
                                    '<th>'+ row.nota +'</th>'+
                                '</tr>';
                                   
              }
               $("#GradeAvalia tbody tr").remove();            
               $("#GradeAvalia tbody").append(fLinhaGrade);
           },
           function (tx, error)
           {
              alert('ooops ' + error.message);
           }
           );
     });                
    
}

function inicia(){        

    db.transaction( function (tx) {
        tx.executeSql(
           'CREATE TABLE IF NOT EXISTS avalia (id UNIQUE, fkcliente, fkmodulo, situacao ,nota)',
           [],
           function ()
           {}
           );
     });
    
     db.transaction( function (tx) {
        tx.executeSql(
           'CREATE TABLE IF NOT EXISTS modulo (id UNIQUE, modulo)',
           [],
           function ()
           {
              tx.executeSql(
                'INSERT INTO modulo (id, modulo) VALUES (1, "ATE SPA (IS4) ")'
              );
              tx.executeSql(
                'INSERT INTO modulo (id, modulo) VALUES (2, "ATE AMB (IS4)")'
              );
               tx.executeSql(
                'INSERT INTO modulo (id, modulo) VALUES (3, "LAB (IS4)")'
              );
               tx.executeSql(
                'INSERT INTO modulo (id, modulo) VALUES (4, "INTE (IS4)")'
              );
               tx.executeSql(
                'INSERT INTO modulo (id, modulo) VALUES (5, "FARM (IS4)")'
              );
               tx.executeSql(
                'INSERT INTO modulo (id, modulo) VALUES (6, "ALMO (IS4)")'
              );
               tx.executeSql(
                'INSERT INTO modulo (id, modulo) VALUES (7, "BPA (IS4)")'
              );
               tx.executeSql(
                'INSERT INTO modulo (id, modulo) VALUES (8, "AIH")'
              );
               tx.executeSql(
                'INSERT INTO modulo (id, modulo) VALUES (9, "FAT CONV (IS4)")'
              );
               tx.executeSql(
                'INSERT INTO modulo (id, modulo) VALUES (10, "MCE (IS4)")'
              );
               tx.executeSql(
                'INSERT INTO modulo (id, modulo) VALUES (11, "ATE SPA")'
              );
              tx.executeSql(
                'INSERT INTO modulo (id, modulo) VALUES (12, "ATE AMB")'
              );
               tx.executeSql(
                'INSERT INTO modulo (id, modulo) VALUES (13, "LAB")'
              );
               tx.executeSql(
                'INSERT INTO modulo (id, modulo) VALUES (14, "INTE")'
              );
               tx.executeSql(
                'INSERT INTO modulo (id, modulo) VALUES (15, "FARM")'
              );
               tx.executeSql(
                'INSERT INTO modulo (id, modulo) VALUES (16, "ALMO")'
              );
               tx.executeSql(
                'INSERT INTO modulo (id, modulo) VALUES (17, "BPA")'
              );              
               tx.executeSql(
                'INSERT INTO modulo (id, modulo) VALUES (18, "FAT CONV")'
              );
               tx.executeSql(
                'INSERT INTO modulo (id, modulo) VALUES (19, "MCE")'
              );
           }
           );
     });
    db.transaction( function (tx) {
        tx.executeSql(
           'SELECT * FROM modulo',
           [],
           function (tx, results)
           {
              var len = results.rows.length;              
              for (var i = 0; i < len; i++)
              {
                 var row = results.rows.item(i);
            
                  document.getElementById('txtModulo').options[i+1] = new Option( row.modulo, row.id );
                                   
              }
           },
           function (tx, error)
           {
              alert('ooops ' + error.message);
           }
           );
     });
    
    //Criando tablas de cliente
    db.transaction( function (tx) {
        tx.executeSql(
           'CREATE TABLE IF NOT EXISTS cliente (id UNIQUE, cliente)',
           [],
           function ()
           {
              tx.executeSql(
                'INSERT INTO cliente (id, cliente) VALUES (1, "HOSP")'
              );
              tx.executeSql(
                'INSERT INTO cliente (id, cliente) VALUES (2, "UPA")'
              );
               tx.executeSql(
                'INSERT INTO cliente (id, cliente) VALUES (3, "POLI")'
              );
               tx.executeSql(
                'INSERT INTO cliente (id, cliente) VALUES (4, "CEREST")'
              );
               tx.executeSql(
                'INSERT INTO cliente (id, cliente) VALUES (5, "PSF-ZUMBI")'
              );               
           }
           );                
     });
    atuaGrade();
    db.transaction( function (tx) {
        tx.executeSql(
           'SELECT * FROM cliente',
           [],
           function (tx, results)
           {
              var len = results.rows.length;              
              for (var i = 0; i < len; i++)
              {
                 var row = results.rows.item(i);
            
                  document.getElementById('txtCliente').options[i+1] = new Option( row.cliente, row.id );
                                   
              }
           },
           function (tx, error)
           {
              alert('ooops ' + error.message);
           }
           );
     });

    
    /*
    
     db.transaction( function (tx) {
        tx.executeSql(
           'DROP TABLE contacts',
           [],
           function (tx, results)
           {
              alert('Tabela excluída');
           },
           function (tx, error)
           {
              alert('ooops ' + error.message);
           }
           );
    });
    */
}



$("#btnSalvar").click(function(){
    
    var fModulo   = document.getElementById("txtModulo").value;
    var fCliente  = document.getElementById("txtCliente").value;
    var fNota     = document.getElementById("txtNota").value;
    var fSituacao = document.getElementById("txtSituacao").value;
    
    var fproximo = 1;       
    
    db.transaction( function (tx) {
        tx.executeSql(
           'SELECT max(id) as id FROM avalia',
           [],
           function (tx, results)
           {
              var len = results.rows.length;              
              for (var i = 0; i < len; i++)
              {
                 var row = results.rows.item(i);                          
                  
                  if(row.id == null){

                    fproximo = 1;
                  
                  }else{
                      
                    fproximo = row.id + 1;
                  
                  }                                                        
              }                              
               
               if(fModulo.length > 0 && fCliente.length > 0 && fNota.length > 0){
    
                    var fsql = 'INSERT INTO avalia (id, fkcliente, fkmodulo, situacao, nota) VALUES ('+fproximo+','+ fCliente +','+ fModulo +',"'+ fSituacao +'",'+ fNota +')';
        
                    db.transaction( function (tx) {
                        tx.executeSql(
                            fsql
                        );
                    });             
                   atuaGrade();
                }
               
           },
           function (tx, error)
           {
              alert('ooops ' + error.message);
           }
           );
     });                               
});