// window.onload = function() {
//     $('locationButon').addEventListener('click', function(){
//         if (navigator.geolocation)
//         navigator.geolocation.getCurrentPosition(function(position){
//             console.log(position);
//         })
//     else
//         console.log("geolocation is not suspended");
//         //     window.onload = function() {
//         //   var startPos;
//         //   var geoSuccess = function(position) {
//         //     startPos = position;
//         //     document.getElementById('startLat').innerHTML = startPos.coords.latitude;
//         //     document.getElementById('startLon').innerHTML = startPos.coords.longitude;
//         //   };
//         //   navigator.geolocation.getCurrentPosition(geoSuccess);
//         //   console.log(startPos)
//         // };
//     });
// }

// $.getJSON('https://api.pray.zone/v2/times/day.json', function(data) {
//     console.log(data);
// });
function $(id) {
    return document.getElementById(id);
}
/*cari sneped*/

function create(name, props) {
    element = document.createElement(name)
    
    for (var i in props) {
        element[i] = props[i]
    }
    
    return element
}

function get(url, nameFunc){

    // ajax js native
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function (){
        if (this.readyState == 4 && this.status == 200){
            nameFunc(JSON.parse(this.responseText))
        }
    }
    
    xhttp.open('GET', url, true)
    xhttp.send()
}

function listSurah(res){
    // console.log(res);
    
    var msgContainer = document.createDocumentFragment()

    for (var i = 0; i < res.hasil.length; i++) {
        msgContainer.appendChild(create('option', {
            text: res.hasil[i].nama,
            value: res.hasil[i].nomor
        }))
    }

    $('listSurah').appendChild(msgContainer)
}


function listAyat(res){
    // console.log(res);
    $('listAyat').innerHTML = ""
    msgContainer = document.createDocumentFragment()

    for (var i = 1; i <= res.hasil[0].ayat; i++) {
        msgContainer.appendChild(create('option', {
            text: i,
            value: i
        }))
    }

    $('listAyat').appendChild(msgContainer)
    // default ayat
    $('listAyat').value = 1
}

function jumlahAyat(res){
    jumlahayat = res.hasil[0].ayat
    $('jumlahAyat').innerHTML = jumlahayat
}

function ayat(res){
    $('ayat').innerHTML = res.ayat.data.ar[0].teks
    $('terjemah').innerHTML = res.ayat.data.id[0].teks
    
}

function change(surahSelect, ayatSelect) {
    get("https://api.banghasan.com/quran/format/json/surat/" + surahSelect + "/ayat/" + ayatSelect, ayat)
}



window.onload = function (){
    surahSelected = 1
    ayatSelected = 1
    // jumlahayat = 7
    //even surah
    $('listSurah').addEventListener('change', function(){
        // console.log("ok")
        surahSelected = this.value
        change(surahSelected, 1, jumlahAyat)
        get("https://api.banghasan.com/quran/format/json/surat/" + surahSelected,jumlahAyat) /*jumlahAyat*/
        ayatSelected = 1
        change(surahSelected, 1)
        get("https://api.banghasan.com/quran/format/json/surat/" + surahSelected,ayatSelected)
        // $('jumlahAyat').innerHTML
    })
    
    //even ayat
    $('listAyat').addEventListener('change', function(){
        change(surahSelected, this.value )
        // get("https://api.banghasan.com/quran/format/json/surat/" + surahSelected + "/ayat/"+ + this.value, ayat)
    })
    
    $('jumlahAyat').addEventListener('change', function(){
        // $('listSurah').value = 
        change(surahSelected, this.value)
        // get("https://api.banghasan.com/quran/format/json/surat/" + surahSelected + "/ayat/"+ + this.value, ayat)
    })
    
    $('next').addEventListener('click', function(){
        
        // for (ayatSelected = jumlahAyat; ayatSelected.innerHTML = surahSelected; ayatSelected++){
            //     console.log(ayatSelected += 1);
            // }
            // console.log (res);
            // surahSelected = ayatSelected + ayatSelected
            ayatSelected += 1
            // change(surahSelected, ayatSelected)
            if (ayatSelected <= jumlahayat){
                // ayatSelected = document.getElementById("listSurah");
            // ayatSelected.value = surahSelected.innerHTML;
            // $('listAyat').value = ayatSelected
            // $('listSurah').value + 1
            // $('listAyat').value = 1
            
            change(surahSelected, ayatSelected)
            console.log(surahSelected, ayatSelected, jumlahayat, this.value);
        } else {
            
            surahSelected ++
            ayatSelected = 1
            $('listSurah').value = surahSelected
            $('jumlahAyat').value = jumlahayat
            // ayatSelected += 1
            change(surahSelected, 1, jumlahAyat)
            get("https://api.banghasan.com/quran/format/json/surat/" + surahSelected,jumlahAyat)
            // change(surahSelected, jumlahAyat)
            console.log(surahSelected, ayatSelected, jumlahayat, this.value);
        }
        // change(surahSelected, ayatSelected)
        $('listAyat').value = ayatSelected
        // get("https://api.banghasan.com/quran/format/json/surat/" + surahSelected + "/ayat/" + this.value, ayat)
        // console.log(jumlahayat)
    })
    
    $('prev').addEventListener('click', function(){
        // change('prev = listAyat + 1')
        // result
        ayatSelected -= 1
        if (ayatSelected = 1){
            change(surahSelected, ayatSelected)
            surahSelected --
            ayatSelected = 1
            $('listSurah').value = surahSelected
            $('jumlahAyat').value = jumlahayat
            
            console.log(surahSelected, ayatSelected, jumlahayat, this.value);
        } else {
            

            change(surahSelected, 1, jumlahAyat)
            console.log(surahSelected, ayatSelected, jumlahayat, this.value);
            // get("https://api.banghasan.com/quran/format/json/surat/" + surahSelected,jumlahAyat)
        }
        $('listAyat').value = ayatSelected
        // get("https://api.banghasan.com/quran/format/json/surat/" + surahSelected + "/ayat/" + this.value, ayat)
        // console.log(surahSelected, this.value)
    })
    
    
    
    if("geolocation" in navigator) {
        // console.log('Geolocation tersedia, bosque!');
        navigator.geolocation.getCurrentPosition(function(position){
            console.log(position);
            
        })}else{
            console.log('Geolocation tidak tersedia pada browser kamu!');
        }
        
        get("https://api.banghasan.com/quran/format/json/surat/1/ayat/1", ayat)
        get("https://api.banghasan.com/quran/format/json/surat", listSurah)
        get("https://api.banghasan.com/quran/format/json/surat/1", listAyat)
        get("https://api.banghasan.com/quran/format/json/surat/1", jumlahAyat)
    }
    
    // function clickCounter() {
        //   if(typeof(Storage) !== "undefined") {
            //     if (localStorage.clickcount) {
                //       localStorage.clickcount = Number(localStorage.clickcount)+1;
                //     } else {
                    //       localStorage.clickcount = 1;
                    //     }
                    //     document.getElementById("listAyat").innerHTML = "You have clicked the button " + localStorage.clickcount + " time(s).";
                    //   } else {
                        //     document.getElementById("listAyat").innerHTML = "Sorry, your browser does not support web storage...";
                        //   }
                        // }