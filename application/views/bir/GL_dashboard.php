<style>
    .card-1 {
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
        margin-bottom: 20px;
        padding: 15px;
        margin-left: 25px;
        color: black;
    }

    .services-box {
        display: flex;
        justify-content: left;
        align-items: center;
        flex-wrap: wrap;
        margin-left: 15px;
    }

    .service {
        margin: 8px;
    }

    .flip-box {
        background-color: transparent;
        width: 150px;
        height: 90px;
        border: 1px solid #f1f1f1;
        border-radius: 10px;
        perspective: 1000px;
    }

    .flip-box-inner {
        position: relative;
        width: 100%;
        height: 100%;
        text-align: center;
        transition: transform 0.8s;
        transform-style: preserve-3d;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .flip-box:hover .flip-box-inner {
        transform: rotateY(180deg);
    }

    .flip-box-front,
    .flip-box-back {
        position: absolute;
        width: 100%;
        height: 100%;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .flip-box-front {
        background-color: #fff;
        color: #2d9fc4;
        border-radius: 10px;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    }

    .flip-box-front img {
        height: 40px;
        width: 40px;
        margin-bottom: -17px;
    }

    .flip-box-back {
        background-color: #ffffff;
        color: #2d9fc4;
        transform: rotateY(180deg);
        border-radius: 10px;
        padding: 16px;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    }

    .flip-box-back a {
        text-decoration: underline;
        color: #2d9fc4;
        font-size: 16px;
        display: block;
        overflow-wrap: break-word;
        max-width: 100%;
    }

    /* CLOCK */
    @font-face {
        font-family: 'Digital-7';
        src: url('fonts/digital-7.ttf') format('woff2'), b, g, mdrx url('digital-7.woff') format('woff');
    }

    .clockdate-wrapper {
        background-image: linear-gradient(#7b8caa, #cec7c7);
        /* fallback for old browsers */
        /* background: -webkit-linear-gradient(to right, #243B55, #141E30); */
        /* Chrome 10-25, Safari 5.1-6 */
        /* background: linear-gradient(to right, #243B55, #141E30); */
        /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        padding: 15px;
        width: 200px;
        /* Consistent width with flip-box */
        height: 90px;
        /* Consistent height with flip-box */
        text-align: center;
        border-radius: 10px;
        /* Consistent border-radius with flip-box */
        margin: 8px;
        /* Consistent margin with service */
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    }

    #clock {
        font-family: Digital-7, 'sans-serif';
        font-size: 20px;
        text-shadow: 0px 0px 1px #fff;
        color: #fff;
    }

    #clock span {
        color: #333;
        text-shadow: 0px 0px 1px #333;
        font-size: 20px;
        position: relative;
        top: 0;
        left: 0;
    }

    #date {
        letter-spacing: 3px;
        font-size: 14px;
        font-family: arial, sans-serif;
        color: #383434;
    }

    .services-container {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;
        margin-left: 15px;
    }
</style>

<div class="card-1">
    <a class="weatherwidget-io" href="https://forecast7.com/en/9d67123d87/tagbilaran-city/"
        data-label_1="TAGBILARAN CITY" data-label_2="WEATHER" data-font="Open Sans" data-icons="Climacons Animated"
        data-theme="weather_one"
        style="display: block; position: relative; height: 213px; padding: 0px; overflow: hidden; text-align: left; text-indent: -299rem;">
        TAGBILARAN CITY WEATHER
        <iframe id="weatherwidget-io-0" class="weatherwidget-io-frame" title="Weather Widget" scrolling="no"
            frameborder="0" width="100%" src="https://weatherwidget.io/w/"
            style="display: block; position: absolute; top: 0px; height: 213px;">
        </iframe>
    </a>
</div>

<div style="display: flex; align-items: center">
    <div class="services-box">
        <div class="service">
            <div class="flip-box">
                <div class="flip-box-inner">
                    <div class="flip-box-front">
                        <img src="<?php echo base_url(); ?>assets/img/rfs-tor.png">
                        <h4>RFS | TOR</h4>
                    </div>
                    <div class="flip-box-back">
                        <a href="http://172.16.161.43/rfstor" target="_blank" title="Click to open site">
                            http://172.16.161.43/rfstor
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="clockdate">
        <div class="clockdate-wrapper">
            <div id="clock"></div>
            <div id="date"></div>
        </div>
    </div>
</div>

<script>
    function startTime() {
        var today = new Date();
        var hr = today.getHours();
        var min = today.getMinutes();
        var sec = today.getSeconds();
        ap = (hr < 12) ? "<span>AM</span>" : "<span>PM</span>";
        hr = (hr == 0) ? 12 : hr;
        hr = (hr > 12) ? hr - 12 : hr;
        //Add a zero in front of numbers<10
        hr = checkTime(hr);
        min = checkTime(min);
        sec = checkTime(sec);
        document.getElementById("clock").innerHTML = hr + ":" + min + ":" + sec + " " + ap;

        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var curWeekDay = days[today.getDay()];
        var curDay = today.getDate();
        var curMonth = months[today.getMonth()];
        var curYear = today.getFullYear();
        var date = curWeekDay + ", " + curDay + " " + curMonth + " " + curYear;
        document.getElementById("date").innerHTML = date;

        var time = setTimeout(function () { startTime() }, 500);
    }
    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
    startTime();
</script>