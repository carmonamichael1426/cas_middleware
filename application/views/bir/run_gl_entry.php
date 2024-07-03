<script>
    window.io = {
        open: function(verb, url, data, target) {
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
            form.style.display = "none";
            document.body.appendChild(form);
            form.submit();
            document.body.removeChild(form);
        }
    };

    function generate_gl_textfile(filename) {
        var doc_arr = [<?= ($document_string) ?>];
        var nav_type = "<?= isset($nav_type) ? ($nav_type) : 'null' ?>";
        var url = "<?= base_url($url) ?>";

        if (nav_type) {
            io.open("POST", url, {
                "document_no": JSON.stringify(doc_arr),
                "textfile_name": filename,
                "transaction_type": "<?= $transaction_type ?>",
                "db_name": "<?= $db_name ?>",
                "filter_type": "<?= $filter_type ?>",
                "entry_start": "<?= $entry_start ?>",
                "entry_end": "<?= $entry_end ?>"
            }, "_blank");
        } else {
            for (var b = 0; b < doc_arr.length; b++) {
                var document_number = doc_arr[b];
                io.open("POST", url, {
                    "document_no": document_number,
                    "textfile_name": filename,
                }, "_blank");
            }
        }
    }
</script>
<button class="btn btn-success btn-lg btn-center" style="margin-left:185px; height: 111px; width: 414px; font-size: 31px; display: inline-block;" onclick="generate_gl_textfile(<?= $filename ?>)">Generate GL/ Entry Textfile</button>
<br>