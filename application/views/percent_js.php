<script>
    $("span.filename").text("GL account no - <?= $row_data ?>");
    $("div#percontent").css({
        "width": "<?= $percent ?>"
    });
    $("span.status").text("Status: <?= $percent ?> Complete");
    $("span.rowprocess").text("Processed Row: <?= $rowproc ?> out of <?= $total_files ?>");
    $("span.empname").text("Entry: ");
</script>