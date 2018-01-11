var HushBalance1 = 0;
var HushBalance2 = 0;
var HushValue = 0;
var startDate = new Date("2018-01-11T19:00:00Z");

function updatePage(){
    var currentDate = new Date().getTime();
    var hours = Number(Math.round((currentDate-startDate)/3600000));
    var totalDonations = Number(Math.round(HushBalance1+HushBalance2));
    var hourlyAverage = Number(Math.round(totalDonations/hours));
    var HushBalance1_toBtc = (HushBalance1*HushValue);
    var HushBalance2_toBtc = (HushBalance2*HushValue);
    document.getElementById('statsTxt').innerHTML = "<b>" + totalDonations + " HUSH</b> raised in <b>" + hours + " hours</b>, average: <b>" + hourlyAverage + " HUSH/h</b>";
    document.getElementById('hushBalance1').innerHTML = HushBalance1.toFixed(0) + " HUSH";
    document.getElementById('hushBalance2').innerHTML = HushBalance2.toFixed(0) + " HUSH";
    document.getElementById('hushBalance1_toBtc').innerHTML = "<b>" + HushBalance1_toBtc.toFixed(8) + " BTC</b>";
    document.getElementById('hushBalance2_toBtc').innerHTML = "<b>" + HushBalance2_toBtc.toFixed(8) + " BTC</b>";
    document.getElementById('progressBar1').style.width = (HushBalance1_toBtc/0.025).toFixed(2) + "%";
    document.getElementById('progressPercent1').innerHTML = (HushBalance1_toBtc/0.025).toFixed(0) + "%";
    document.getElementById('progressBar2').style.width = (HushBalance2_toBtc/0.025).toFixed(2) + "%";
    document.getElementById('progressPercent2').innerHTML = (HushBalance2_toBtc/0.025).toFixed(0) + "%";
}

function getBalances(){
    var xhr1 = new XMLHttpRequest();
    xhr1.open("GET", "https://explorer.myhush.org/api/addr/t1h6kmaQwcuyejDLazT3TNZfV8EEtCzHRhc/balance", true);
    xhr1.onload = function(){
        if(this.status == 200){
            var result = xhr1.responseText;
            HushBalance1 = Number(result/100000000);
            updatePage();
        }
    }
    xhr1.send();
    var xhr2 = new XMLHttpRequest();
    xhr2.open("GET", "https://explorer.myhush.org/api/addr/t1h6kmaQwcuyejDLazT3TNZfV8EEtCzHRhc/balance", true);
    xhr2.onload = function(){
        if(this.status == 200){
            var result = xhr2.responseText;
            HushBalance2 = Number(result/100000000);
            updatePage();
        }
    }
    xhr2.send();
    var xhr3 = new XMLHttpRequest();
    xhr3.open("GET", "https://api.coinmarketcap.com/v1/ticker/hush/", true);
    xhr3.onload = function(){
        if(this.status == 200){
            var result = JSON.parse(xhr3.responseText);
            HushValue = Number(result[0].price_btc);
            updatePage();
        }
    }
    xhr3.send();
}

function start(){
    getBalances();
    setInterval(function(){getBalances();}, 300000);
}
