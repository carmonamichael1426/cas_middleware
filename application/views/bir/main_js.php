<script>
    // Get the current date
    var currentDate = new Date();
    // Format the current date as "yyyy-MM-dd"
    var formattedDate = currentDate.toISOString().substr(0, 10);
    // Set the value of the input field to the current date
    document.getElementById("date_from").value = formattedDate;
    document.getElementById("date_to").value = formattedDate;

    function validateDates() {
        var dateFrom = new Date($("#date_from").val());
        var dateTo = new Date($("#date_to").val());
        if (dateTo < dateFrom) {
            //alert("Date To cannot be less than Date From!");
            swal_display('error', 'opps', 'Date From must be greater than or equal to Date To');
            document.getElementById("date_from").value = formattedDate;
            document.getElementById("date_to").value = formattedDate;
        }
    }


    function swal_display(icon, title, text) {
        Swal.fire({
            icon: icon,
            title: title,
            text: text
        });
    }

    window.io = {
        open: function (verb, url, data, target) {
            var form = document.createElement("form");
            form.action = url;
            form.method = verb;
            form.target = target || "_self";
            if (data) {
                for (var key in data) {
                    var input = document.createElement("textarea");
                    input.name = key;
                    input.value = typeof data[key] === "object" ?
                        JSON.stringify(data[key]) :
                        data[key];
                    form.appendChild(input);
                }

            }
            form.style.display = 'none';
            document.body.appendChild(form);
            form.submit();
            document.body.removeChild(form);
        }
    };

    function generate_textfile(vendor_type) {
        var db_id = $("#database_id").val();
        var dateFrom = $("#date_from").val();
        var dateTo = $("#date_to").val();


        $.ajax({
            type: 'POST',
            url: '<?php echo base_url(); ?>BIR_ctrl/load_server',
            data: {
                'db_id': db_id
            },
            dataType: 'JSON',
            success: function (data) {
                if (data.nav_type == 'NATIVE') {
                    nav_type = 'NATIVE';
                } else {
                    nav_type = 'SQL';
                }



                io.open("POST", "<?php echo base_url(); ?>BIR_ctrl/generate_textfile", {
                    "dateFrom": dateFrom,
                    "dateTo": dateTo,
                    "database_id": db_id,
                    "vendor_type": vendor_type
                }, "_blank");

            }
        });
    }

    function generate_ledger_textfile() {
        var db_id = $("#database_id").val();
        var dateFrom = $("#date_from").val();
        var dateTo = $("#date_to").val();

        io.open("POST", "<?php echo base_url(); ?>BIR_ctrl/generate_ledger_textfile", {
            "dateFrom": dateFrom,
            "dateTo": dateTo,
            "database_id": db_id
        }, "_blank");
    }

    function red_color(store) {
        $('#' + store).css('border-color', 'red');
    }

    function revert_color(store) {
        $('#' + store).css('border-color', '');
    }

    // function run_gl_entry_middleware() {
    //     const sql_array = [
    //         '3', '5', '19', '20', '22', '23', '24', '25', '26', '38',
    //         '39', '40', '41', '42', '43', '44', '45', '46', '47', '48',
    //         '49', '50', '51', '52', '53', '54', '55', '61', '62', '63',
    //         '64', '65', '66', '67', '68', '69', '70', '71', '72', '73',
    //         '74', '75', '76', '77', '82', '83', '84', '85', '91', '98',
    //         '99', '100', '101', '104', '105', '106', '107',
    //         '108', '109', '110', '111', '112', '113', '114', '115',
    //         '116', '117', '118', '119', '21', '120', '121'
    //     ];
    //     var db_id = $("#database_id").val();
    //     if (sql_array.includes(db_id)) {
    //         console.log(`${db_id} exists in the array.`);
    //         run_gl_entry_middleware_SQL(db_id);
    //     } else {
    //         run_gl_entry_middleware_textfile();
    //         console.log(`${db_id} does not exist in the array.`);
    //     }
    // }

    function run_gl_entry_middleware() {
        var db_id = $("#database_id").val();
        $.ajax({
            url: "<?php echo base_url('BIR_ctrl/get_db_id/'); ?>" + db_id,
            type: 'GET',
            success: function (response) {
                if (response) {
                    console.log(`${db_id} exists in the array.`);
                    run_gl_entry_middleware_SQL(db_id);
                } else {
                    run_gl_entry_middleware_textfile();
                    console.log(`${db_id} does not exist in the array.`);
                }
            },
            error: function (error) {
                console.error(error.responseText);
            }
        });
    }

    function run_gl_entry_transfer_middleware() {
        $.ajax({
            type: 'POST',
            url: '<?php echo base_url(); ?>BIR_ctrl/check_db_details',
            data: {
                'db_id': $("#database_id").val()
            },
            dataType: 'JSON',
            success: function (data) {
                if (data.nav_type == 'SQL') {
                    io.open('POST', '<?php echo base_url('BIR_ctrl/run_gl_entry_middleware'); ?>', {
                        'db_id': $("#database_id").val(),
                        'dateFrom': $("#date_from").val(),
                        'dateTo': $("#date_to").val(),
                        'filter_doc': $("#filter_doc").val(),
                        'filter_vend_cust': $("#filter_vend_cust").val(),
                        'nav_type': 'SQL',
                        'filter_gl': $("#filter_gl").val(),
                        'entry_start': $("#entry_start").val(),
                        'entry_end': $("#entry_end").val(),
                        'transaction_type': $("#transaction_type").val(),
                        'filter_type': $("#filter_type").val()
                    }, '_blank');
                } else {
                    var txt_data = new FormData();
                    var input = $('#sales_txt_file')[0];
                    $.each(input.files, function (i, file) {
                        txt_data.append('files[]', file);
                    });


                    var proceed = true;
                    if (input.files.length == 0) {
                        //pag kuha sa mga  input nga  wala pa nag select ug file
                        red_color('sales_txt_file'); //pag red sa mga wala pa nag select ug file
                        Swal.fire({
                            icon: 'error',
                            title: '',
                            text: 'Please input TXT file'
                        });
                        proceed = false;
                    }


                    if (proceed == true) {
                        for (const entry of txt_data.entries()) {
                            const fieldName = entry[0]; // Get the field name
                            const file = entry[1]; // Get the file object

                            // Access file properties
                            const fileName = file.name; // File name
                            const fileSize = file.size; // File size in bytes
                            const fileType = file.type; // File type
                            if (fileType != 'text/csv' && fileType != 'text/plain') {
                                Swal.fire({
                                    icon: 'error',
                                    title: '',
                                    text: 'Please input csv/txt file '
                                });
                                break;

                                proceed = false;
                            }

                            if (proceed == true) {
                                // You can perform further operations with the file, such as reading its contents
                                // For example, to read the file as text:
                                const reader = new FileReader();

                                reader.onload = function (event) {
                                    const fileContent = event.target.result; // The file content    


                                    var search_dimension1 = new RegExp(data.dimension_1);
                                    var string_search = false;
                                    if (search_dimension1.test(fileContent)) {
                                        //console.log("String found");
                                        var search_dimension2 = new RegExp(data.dimension_2);
                                        if (search_dimension2.test(fileContent)) {
                                            string_search = true;
                                        } else {
                                            string_search = false;
                                        }
                                    } else {
                                        //console.log("String not found");
                                        string_search = false;
                                    }


                                    var invoice_type = '';
                                    var search_invoice_type = new RegExp(',"SALES",');
                                    if (search_invoice_type.test(fileContent)) {
                                        invoice_type = 'SALES';
                                    }

                                    var search_invoice_type = new RegExp(',"PURCHASES",');
                                    if (search_invoice_type.test(fileContent)) {
                                        invoice_type = 'PURCHASES';
                                    }


                                    // console.log('string found? '+string_search);

                                    if (string_search == true) {

                                        var lines = fileContent.split('\n');

                                        // ********************************************mao nig mu new tab siya .i divide niya ang usa ka textfile array into chunk of array para dili bug at  sa side sa php server****************************
                                        var arrayLength = lines.length;

                                        var length_arr = [20000, 40000, 60000, 80000, 100000, 120000, 140000, 160000, 180000, 200000, 240000, 260000, 280000, 300000, 320000, 340000, 360000, 380000, 400000];

                                        for (var a = 0; a < length_arr.length; a++) {
                                            if (arrayLength < length_arr[a]) {
                                                var number_of_loop = a + 1;
                                                break;
                                            }

                                            if (a === length_arr - 1) {
                                                var number_of_loop = a + 1;
                                            }
                                        }

                                        console.log('number of loop' + number_of_loop);
                                        console.log('number of lines' + arrayLength);

                                        var chunkSize = Math.ceil(arrayLength / number_of_loop); // Calculate the size of each chunk                                                  
                                        var chunkedArray = []; // Initialize an empty array to store the chunks

                                        for (var i = 0; i < arrayLength; i += chunkSize) {
                                            var chunk = lines.slice(i, i + chunkSize); // Get a chunk of the original array
                                            chunkedArray.push(chunk); // Push the chunk to the file_content
                                        }


                                        for (var a = 0; a < chunkedArray.length; a++) {

                                            io.open('POST', '<?php echo base_url('BIR_ctrl/run_gl_entry_middleware'); ?>', {
                                                'db_id': $("#database_id").val(),
                                                'dateFrom': $("#date_from").val(),
                                                'dateTo': $("#date_to").val(),
                                                'filter_doc': $("#filter_doc").val(),
                                                'filter_vend_cust': $("#filter_vend_cust").val(),
                                                file_content: JSON.stringify(chunkedArray[a]),
                                                'module': 'transfers_middleware',
                                                'store_no': data.store_no,
                                                'nav_type': data.nav_type,
                                                'invoice_type': invoice_type
                                            }, '_blank');

                                        }

                                    } else {
                                        Swal.fire({
                                            icon: 'error',
                                            title: '',
                                            text: 'this is not a ' + data.store + ' textfile'
                                        });
                                    }

                                };
                                reader.readAsText(file); // Read the file as text
                            }


                        }
                    }
                }
            }
        });


    }


    function generate_transfer_qty() {
        $.ajax({
            type: 'POST',
            url: '<?php echo base_url(); ?>BIR_ctrl/check_db_details',
            data: {
                'db_id': $("#database_id").val()
            },
            dataType: 'JSON',
            success: function (data) {
                if (data.nav_type == 'SQL') {
                    io.open('POST', '<?php echo base_url('BIR_ctrl/generate_transfer_qty'); ?>', {
                        'db_id': $("#database_id").val(),
                        'dateFrom': $("#date_from").val(),
                        'dateTo': $("#date_to").val(),
                        'filter_doc': $("#filter_doc").val(),
                        'filter_vend_cust': $("#filter_vend_cust").val(),
                        'nav_type': data.nav_type,
                        'entry_start': $("#entry_start").val(),
                        'entry_end': $("#entry_end").val(),
                        'transaction_type': $("#transaction_type").val(),
                        'filter_type': $("#filter_type").val()
                    }, '_blank');
                } else {
                    //console.log("nav type is"+data.nav_type+'\n'+'dimension 1:'+data.dimension_1 + '\n' + 'dimension 2:'+data.dimension_2 );


                    var txt_data = new FormData();
                    var input = $('#sales_txt_file')[0];
                    $.each(input.files, function (i, file) {
                        txt_data.append('files[]', file);
                    });


                    var proceed = true;
                    if (input.files.length == 0) {
                        //pag kuha sa mga  input nga  wala pa nag select ug file
                        red_color('sales_txt_file'); //pag red sa mga wala pa nag select ug file
                        Swal.fire({
                            icon: 'error',
                            title: '',
                            text: 'Please input TXT file'
                        });
                        proceed = false;
                    }


                    if (proceed == true) {
                        for (const entry of txt_data.entries()) {
                            const fieldName = entry[0]; // Get the field name
                            const file = entry[1]; // Get the file object

                            // Access file properties
                            const fileName = file.name; // File name
                            const fileSize = file.size; // File size in bytes
                            const fileType = file.type; // File type
                            if (fileType != 'text/csv' && fileType != 'text/plain') {
                                Swal.fire({
                                    icon: 'error',
                                    title: '',
                                    text: 'Please input csv/txt file '
                                });
                                break;

                                proceed = false;
                            }

                            if (proceed == true) {
                                // You can perform further operations with the file, such as reading its contents
                                // For example, to read the file as text:
                                const reader = new FileReader();

                                reader.onload = function (event) {
                                    const fileContent = event.target.result; // The file content    


                                    var search_dimension1 = new RegExp(data.dimension_1);
                                    var string_search = false;
                                    if (search_dimension1.test(fileContent)) {
                                        //console.log("String found");
                                        var search_dimension2 = new RegExp(data.dimension_2);
                                        if (search_dimension2.test(fileContent)) {
                                            string_search = true;
                                        } else {
                                            string_search = false;
                                        }
                                    } else {
                                        //console.log("String not found");
                                        string_search = false;
                                    }


                                    var invoice_type = '';
                                    var search_invoice_type = new RegExp(',"SALES",');
                                    if (search_invoice_type.test(fileContent)) {
                                        invoice_type = 'SALES';
                                    }

                                    var search_invoice_type = new RegExp(',"PURCHASES",');
                                    if (search_invoice_type.test(fileContent)) {
                                        invoice_type = 'PURCHASES';
                                    }


                                    // console.log('string found? '+string_search);

                                    if (string_search == true) {

                                        var lines = fileContent.split('\n');

                                        // ********************************************mao nig mu new tab siya .i divide niya ang usa ka textfile array into chunk of array para dili bug at  sa side sa php server****************************
                                        var arrayLength = lines.length;

                                        var length_arr = [20000, 40000, 60000, 80000, 100000, 120000, 140000, 160000, 180000, 200000, 240000, 260000, 280000, 300000, 320000, 340000, 360000, 380000, 400000];

                                        for (var a = 0; a < length_arr.length; a++) {
                                            if (arrayLength < length_arr[a]) {
                                                var number_of_loop = a + 1;
                                                break;
                                            }

                                            if (a === length_arr - 1) {
                                                var number_of_loop = a + 1;
                                            }
                                        }

                                        console.log('number of loop' + number_of_loop);
                                        console.log('number of lines' + arrayLength);

                                        var chunkSize = Math.ceil(arrayLength / number_of_loop); // Calculate the size of each chunk                                                  
                                        var chunkedArray = []; // Initialize an empty array to store the chunks

                                        for (var i = 0; i < arrayLength; i += chunkSize) {
                                            var chunk = lines.slice(i, i + chunkSize); // Get a chunk of the original array
                                            chunkedArray.push(chunk); // Push the chunk to the file_content
                                        }


                                        for (var a = 0; a < chunkedArray.length; a++) {
                                            io.open('POST', '<?php echo base_url('BIR_ctrl/generate_transfer_qty_native'); ?>', {
                                                'db_id': $("#database_id").val(),
                                                'dateFrom': $("#date_from").val(),
                                                'dateTo': $("#date_to").val(),
                                                'filter_doc': $("#filter_doc").val(),
                                                'filter_vend_cust': $("#filter_vend_cust").val(),
                                                file_content: JSON.stringify(chunkedArray[a]),
                                                'nav_type': data.nav_type,
                                                'store_no': data.store_no,
                                                'invoice_type': invoice_type
                                            }, '_blank');
                                        }

                                    } else {
                                        Swal.fire({
                                            icon: 'error',
                                            title: '',
                                            text: 'this is not a ' + data.store + ' textfile'
                                        });
                                    }

                                };
                                reader.readAsText(file); // Read the file as text
                            }


                        }
                    }





                }
            }
        });



    }




    function run_gl_entry_middleware_SQL(db_id) {
        io.open('POST', '<?php echo base_url('BIR_ctrl/run_gl_entry_middleware'); ?>', {
            'db_id': db_id,
            'dateFrom': $("#date_from").val(),
            'dateTo': $("#date_to").val(),
            'nav_type': 'SQL',
            'filter_gl': $("#filter_gl").val(),
            'filter_type': $("#filter_type").val(),
            'entry_start': $("#entry_start").val(),
            'entry_end': $("#entry_end").val(),
            'transaction_type': $("#transaction_type").val(),
            'filter_type': $("#filter_type").val()
        }, '_blank');
    }


    function run_gl_entry_middleware_textfile() {

        var txt_data = new FormData();

        var input = $('#sales_txt_file')[0];
        $.each(input.files, function (i, file) {
            txt_data.append('files[]', file);
        });

        if (input.files.length == 0) {
            //pag kuha sa mga  input nga  wala pa nag select ug file
            red_color('sales_txt_file'); //pag red sa mga wala pa nag select ug file
        }


        // Assuming you have the file data stored in the txt_data variable as a FormData object
        var file_list = [];

        for (const entry of txt_data.entries()) {
            const fieldName = entry[0]; // Get the field name
            const file = entry[1]; // Get the file object

            // Access file properties
            const fileName = file.name; // File name
            const fileSize = file.size; // File size in bytes
            const fileType = file.type; // File type
            if (fileType != 'text/csv' && fileType != 'text/plain') {
                Swal.fire({
                    icon: 'error',
                    title: '',
                    text: 'Please input csv file'
                });
                break;
            }

            file_list.push(fileName);

            // You can perform further operations with the file, such as reading its contents
            // For example, to read the file as text:
            const reader = new FileReader();

            reader.onload = function (event) {
                const fileContent = event.target.result; // The file content                                
                var lines = fileContent.split('\n');

                // ********************************************mao nig mu new tab siya .i divide niya ang usa ka textfile array into chunk of array para dili bug at  sa side sa php server****************************
                var arrayLength = lines.length;

                var length_arr = [20000, 40000, 60000, 80000, 100000, 120000, 140000, 160000, 180000, 200000, 240000, 260000, 280000, 300000, 320000, 340000, 360000, 380000, 400000];

                for (var a = 0; a < length_arr.length; a++) {
                    if (arrayLength < length_arr[a]) {
                        var number_of_loop = a + 1;
                        break;
                    }

                    if (a === length_arr - 1) {
                        var number_of_loop = a + 1;
                    }
                }

                console.log('number of loop' + number_of_loop);
                console.log('number of lines' + arrayLength);

                var chunkSize = Math.ceil(arrayLength / number_of_loop); // Calculate the size of each chunk                                                  
                var chunkedArray = []; // Initialize an empty array to store the chunks

                for (var i = 0; i < arrayLength; i += chunkSize) {
                    var chunk = lines.slice(i, i + chunkSize); // Get a chunk of the original array
                    chunkedArray.push(chunk); // Push the chunk to the file_content
                }

                var db_id = $("#database_id").val();


                $.ajax({
                    type: 'POST',
                    url: '<?php echo base_url(); ?>BIR_ctrl/check_textfile',
                    data: {
                        'db_id': db_id,
                        file_content: JSON.stringify(chunkedArray[0])
                    },
                    dataType: 'JSON',
                    success: function (data) {
                        if (data.response == 'proceed') {

                            console.log(data.response);
                            for (var a = 0; a < chunkedArray.length; a++) {
                                io.open('POST', '<?php echo base_url('BIR_ctrl/run_gl_entry_middleware'); ?>', {
                                    'db_id': db_id,
                                    'dateFrom': $("#date_from").val(),
                                    'dateTo': $("#date_to").val(),
                                    file_content: JSON.stringify(chunkedArray[a]),
                                    'fileName': fileName,
                                    'nav_type': 'NATIVE',
                                    'transaction_type': $("#transaction_type").val()
                                }, '_blank');
                            }
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: '',
                                text: data.response
                            });
                            red_color('sales_txt_file');
                        }
                    }
                });

            };
            reader.readAsText(file); // Read the file as text
        }

        if (input.files.length == 0) {
            Swal.fire({
                icon: 'error',
                title: '',
                text: 'Please input file'
            });
        }
    }


    function load_items() {

        var nav_type = '';


        $.ajax({
            type: 'POST',
            url: '<?php echo base_url(); ?>BIR_ctrl/load_server',
            data: {
                'db_id': $("#database_id").val()
            },
            dataType: 'JSON',
            success: function (data) {
                if (data.nav_type == 'NATIVE') {
                    nav_type = 'NATIVE';
                } else {
                    nav_type = 'SQL';
                }


                var txt_data = new FormData();

                var input = $('#sales_txt_file')[0];
                $.each(input.files, function (i, file) {
                    txt_data.append('files[]', file);
                });

                if (input.files.length == 0) {
                    //pag kuha sa mga  input nga  wala pa nag select ug file
                    red_color('sales_txt_file'); //pag red sa mga wala pa nag select ug file
                }

                // Assuming you have the file data stored in the txt_data variable as a FormData object
                var file_list = [];
                var file_content = [];
                var csv_file = true;

                if (nav_type == 'NATIVE') {


                    for (const entry of txt_data.entries()) {
                        const fieldName = entry[0]; // Get the field name
                        const file = entry[1]; // Get the file object

                        // Access file properties
                        const fileName = file.name; // File name
                        const fileSize = file.size; // File size in bytes
                        const fileType = file.type; // File type
                        console.log(file.type);
                        console.log(fileType);
                        if (fileType != 'text/csv' && fileType != 'text/plain') {
                            Swal.fire({
                                icon: 'error',
                                title: '',
                                text: 'Please input csv file'
                            });
                            csv_file = false;
                            break;
                        }

                        file_list.push(fileName);

                        // You can perform further operations with the file, such as reading its contents
                        // For example, to read the file as text:
                        const reader = new FileReader();
                        reader.onload = function (event) {
                            const fileContent = event.target.result; // The file content
                            // console.log("File Content:", fileContent);
                            var lines = fileContent.split('\n');
                            var arrayLength = lines.length;

                            var length_arr = [20000, 40000, 60000, 80000, 100000, 120000, 140000, 160000, 180000, 200000, 240000, 260000, 280000, 300000, 320000, 340000, 360000, 380000, 400000, 420000, 440000, 460000, 480000, 500000, 520000, 540000, 560000, 580000, 600000, 620000, 640000, 660000, 680000, 700000];

                            for (var a = 0; a < length_arr.length; a++) {
                                if (arrayLength < length_arr[a]) {
                                    var number_of_loop = a + 1;
                                    break;
                                }

                                if (a === length_arr - 1) {
                                    var number_of_loop = a + 1;
                                }
                            }

                            console.log('number of loop' + number_of_loop);
                            console.log('number of lines' + arrayLength);


                            var chunkSize = Math.ceil(arrayLength / number_of_loop); // Calculate the size of each chunk

                            var chunkedArray = []; // Initialize an empty array to store the chunks

                            for (var i = 0; i < arrayLength; i += chunkSize) {
                                var chunk = lines.slice(i, i + chunkSize); // Get a chunk of the original array
                                chunkedArray.push(chunk); // Push the chunk to the file_content
                            }

                            var db_id = $("#database_id").val();
                            console.log('db_id =>' + db_id);
                            $.ajax({
                                type: 'POST',
                                url: '<?php echo base_url(); ?>BIR_ctrl/check_textfile',
                                data: {
                                    'db_id': db_id,
                                    file_content: JSON.stringify(chunkedArray[0])
                                },
                                dataType: 'JSON',
                                success: function (data) {

                                    //if (fileContent.includes(data.store_no) || fileContent.includes('","') || fileContent.includes('"|"')) 
                                    if (data.response == 'proceed') {
                                        for (var a = 0; a < chunkedArray.length; a++) {
                                            io.open('POST', '<?php echo base_url('BIR_ctrl/load_item_table'); ?>', {
                                                'db_id': db_id,
                                                'dateFrom': $("#date_from").val(),
                                                'dateTo': $("#date_to").val(),
                                                file_content: JSON.stringify(chunkedArray[a]),
                                                'nav_type': nav_type
                                            }, '_blank');
                                        }
                                    } else {
                                        // Swal.fire({
                                        //               icon: 'error',
                                        //               title: '',
                                        //               text: 'Store number: '+data.store_no+' does not exist in the CSV file'                                  
                                        //           });    
                                        Swal.fire({
                                            icon: 'error',
                                            title: '',
                                            text: data.response
                                        });
                                        red_color('sales_txt_file');
                                    }
                                }
                            });
                            //******************************************************************************************************************************************************************************** 




                        };
                        reader.readAsText(file); // Read the file as text
                    }
                }


                //console.log(file_content[0]);    


                if (input.files.length == 0 && nav_type == 'NATIVE') {
                    Swal.fire({
                        icon: 'error',
                        title: '',
                        text: 'Please input file'
                    });
                } else
                    if (nav_type == 'SQL') {

                        var db_id = $("#database_id").val();

                        io.open('POST', '<?php echo base_url('BIR_ctrl/load_item_table'); ?>', {
                            'db_id': db_id,
                            'dateFrom': $("#date_from").val(),
                            'dateTo': $("#date_to").val(),
                            file_content: JSON.stringify(file_content),
                            'nav_type': nav_type
                        }, '_blank');

                    }


            }
        });

    }


    filter_store();

    function filter_store() {
        load_server();
        setTimeout(function () {
            filter_database();
        }, 1000);
    }


    // load_server();

    function load_server() {
        var store = $("#store_id").val();
        $.ajax({
            type: 'POST',
            url: '<?php echo base_url(); ?>BIR_ctrl/load_server',
            data: {
                'store': store
            },
            dataType: 'json',
            success: function (data) {
                $("#database_id").html(data.html);
            }
        });
    }



    function loader_() {

        Swal.fire({
            imageUrl: '<?php echo base_url(); ?>assets/img/Cube-1s-200px.svg',
            imageHeight: 203,
            imageAlt: 'loading',
            text: 'preparing for upload, please wait',
            allowOutsideClick: false,
            showCancelButton: false,
            showConfirmButton: false
        })
    }

    function filter_database() {
        $.ajax({
            type: 'POST',
            url: '<?php echo base_url(); ?>BIR_ctrl/load_server',
            data: {
                'db_id': $("#database_id").val()
            },
            dataType: 'JSON',
            success: function (data) {
                if (data.nav_type == 'NATIVE') {
                    console.log('database is native');
                    $("#sales_txt_file").show();
                } else {
                    console.log('database is sql')
                    $("#sales_txt_file").hide();
                    $("#date_from").show();
                    $("#date_from_label").show();
                    $("#date_to").show();
                    $("#date_to_label").show();
                    $("#generate_div").show();
                }


                if ($("#database_id").val() == 23 || $("#database_id").val() == 38) {
                    $("#generate_pof_sof").show();
                    $("#filter_pof").show();
                    $("#pof").show();
                    $("#sof").show();
                } else {
                    $("#generate_pof_sof").hide();
                    $("#filter_pof").hide();
                    $("#pof").hide();
                    $("#sof").hide();
                }
            }
        });
    }


    function animateProgressBar(dataArray) {
        $("#button").html("");

        //const progressBar = document.querySelector('.progress');
        let currentIndex = 0;
        var rowproC = 1;
        var total_files = dataArray.length;

        function updateProgress() {


            if (rowproC > 0 && total_files > 0) {
                percent = (rowproC / total_files * 100);
            } else {
                percent = "100";
            }

            const progress = document.querySelector('.progress');
            progress.style.width = `${percent}%`;

            //$("div#percontent").css({"width": '"'+percent+'"'});


            $("span.status").text("Status: " + parseInt(percent) + "% Complete");
            rowproC++;


            //  const data =currentIndex;

            // const progressPercentage = (data / 100) * 100; // Adjust as per your data
            // //console.log(progressPercentage);

            // progressBar.style.width = `${progressPercentage}%`;
            const line_arr = dataArray[currentIndex].split('","');
            var date_arr = [];

            if (line_arr.length > 1) {
                //console.log(line_arr[15]);

                var line_date = line_arr[15]; //date sa line ani nga textfile

                // Convert the date string to a JavaScript Date object
                var date = new Date(line_date);

                // Extract the year, month, and day components from the Date object
                var year = date.getFullYear();
                var month = String(date.getMonth() + 1).padStart(2, '0');
                var day = String(date.getDate()).padStart(2, '0');

                // Create the desired date string in 'Y-m-d' format
                var formattedDate = year + '-' + month + '-' + day;

                // console.log(formattedDate+'---->'+line_arr[15]);

                // Check if date_sample is already in date_arr
                if (!date_arr.includes(formattedDate)) {
                    // Push date_sample into date_arr
                    date_arr.push(formattedDate);
                }

                //console.log(date_arr);

                if (date_arr.length > 1) {
                    var date_from = date_arr[0];
                    var date_to = date_arr[(date_arr.length - 1)];
                } else {
                    var date_from = date_arr[0];
                    var date_to = date_arr[(date_arr.length - 1)];
                }

                //console.log('date_from'+date_from+'--->'+'date_to'+date_to);

                $("span.filename").text("ITEM CODE - " + line_arr[4]);
                $.ajax({
                    type: 'POST',
                    url: '<?php echo base_url(); ?>BIR_ctrl/load_native_item_table',
                    data: {
                        'line': dataArray[currentIndex],
                        'db_id': $("#database_id").val(),
                        'dateFrom': date_from,
                        'dateTo': date_to
                    },
                    dataType: 'JSON',
                    success: function (data) {
                        //console.log(parseInt(percent));
                        if (parseInt(percent) == 99) {
                            $("#button").html(data.button);
                        }

                        $("span.rowprocess").text("Processed Row: " + (rowproC + 1) + " out of " + (total_files + 1));
                        currentIndex++;


                        if (currentIndex < dataArray.length) {
                            setTimeout(updateProgress, 0); // Adjust the delay as desired
                        }
                    }
                });

            }
            // $("span.rowprocess").text("Processed Row: "+rowproC+" out of "+(total_files+1) );
            // currentIndex++;



            // if (currentIndex < dataArray.length)
            // {
            //       setTimeout(updateProgress, 100); // Adjust the delay as desired
            // }

        }

        updateProgress();
    }

    function generate_ledger_report() {
        var db_id = $("#database_id").val();
        var selectedStore = $("#store_id option:selected").text();
        var selectedBU = $("#database_id option:selected").text();

        io.open('POST', '<?php echo base_url('BIR_ctrl/generate_ledger_report'); ?>', {
            'db_id': db_id,
            'dateFrom': $("#date_from").val(),
            'dateTo': $("#date_to").val(),
            'store_name': selectedStore,
            'bu_name': selectedBU
        }, '_blank');
    }


    function generate_ledger_report_excel_excel() {
        var db_id = $("#database_id").val();
        var selectedStore = $("#store_id option:selected").text();
        var selectedBU = $("#database_id option:selected").text();

        io.open('POST', '<?php echo base_url('BIR_ctrl/generate_ledger_report_excel'); ?>', {
            'db_id': db_id,
            'dateFrom': $("#date_from").val(),
            'dateTo': $("#date_to").val(),
            'store_name': selectedStore,
            'bu_name': selectedBU

        }, '_blank');
    }


    function generate_ledger_report_excel_monthly() {
        var db_id = $("#database_id").val();
        var selectedStore = $("#store_id option:selected").text();
        var selectedBU = $("#database_id option:selected").text();

        io.open('POST', '<?php echo base_url('BIR_ctrl/generate_ledger_report_excel_monthly'); ?>', {
            'db_id': db_id,
            'dateFrom': $("#date_from").val(),
            'dateTo': $("#date_to").val(),
            'store_name': selectedStore,
            'bu_name': selectedBU

        }, '_blank');
    }



    // Get all the <li> elements under the "sidebar-menu"
    const menuItems = document.querySelectorAll('.sidebar-menu li');

    // Add a click event listener to each <li> element
    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            // Remove the "active" class from all <li> elements
            menuItems.forEach(menuItem => menuItem.classList.remove('active'));

            // Add the "active" class to the clicked <li> element
            this.classList.add('active');
        });
    });

    function generate_pof_sof(type) {
        var db_id = $("#database_id").val();

        io.open('POST', '<?php echo base_url('BIR_ctrl/generate_pof_sof'); ?>', {
            'db_id': db_id,
            'dateFrom': $("#date_from").val(),
            'dateTo': $("#date_to").val(),
            'filter_start': $("#filter_start").val(),
            'filter_end': $("#filter_end").val(),
            'type': type
        }, '_blank');
    }
</script>