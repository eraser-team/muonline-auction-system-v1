$(function() {
    $('#bet').click(function() {
        var renas = parseInt($("#batvalue").val());
        var renasCount = parseInt($("#renas_count").html());
        if (renas > 0) {
            if (renas > renasCount) {
                $("#bet_response").hide().html("<br><span class='error'>Нямате достатъчно рени!<span>").slideDown(500).delay(1500).slideUp(500);
            } else {
                $.ajax({
                    type: "POST",
                    url: "./",
                    data: {
                        bet: "bettingTime",
                        count: renas
                    }
                }).done(function(status) {
                    $("#bet_response").hide().html("<br>" + status).slideDown(500).delay(1500).slideUp(500);
                    $("#renas_count").html(renasCount - renas);
                    $("#batvalue").val(1);
                    refreshBets();
                });
            }
        } else {
            $("#bet_response").hide().html("<br><span class='error'>Моля, залагайте повече от 0 рени!<span>").slideDown(500).delay(1500).slideUp(500);
        }

        return false;
    });

    function refreshBets() {
        $.ajax({
            type: "POST",
            url: "./",
            data: {updateBet: true}
        }).done(function(status) {
            $("#bets").html(status);
        });
    }

    refreshBets();

    setInterval(function() {
        refreshBets();
    }, 2000);

    $(".iteminfo").tipTip({maxWidth: "auto"});
});