<button class="btn btn-success btn-lg btn-center" style="margin-left:185px; height: 111px; width: 414px; font-size: 31px; display: inline-block;" onclick="generate_gl_textfile('<?= $fileName ?>')">Generate GL/ Entry Textfile</button>

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


    function generate_gl_textfile(textfile) {

        var doc_arr = [<?= $document_string ?>];
        io.open("POST", "<?= base_url() . $url ?>", {
            "document_no": JSON.stringify(doc_arr),
            "textfile_name": textfile
        }, "_blank");

    }
</script>