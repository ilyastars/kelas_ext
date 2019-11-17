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
    // $('listAyat').value = 7
}

function jumlahAyat(res){
    jumlahayat = res.hasil[0].ayat
    $('jumlahAyat').innerHTML = jumlahayat
    console.log(jumlahayat)
    return jumlahayat
}

function ayat(res){
    $('ayat').innerHTML = res.ayat.data.ar[0].teks
    $('terjemah').innerHTML = res.ayat.data.id[0].teks
    console.log(res);
}

function change(surahSelect, ayatSelect) {
    get("https://api.banghasan.com/quran/format/json/surat/" + surahSelect + "/ayat/" + ayatSelect, ayat)
}

function imsak(res){
    $('imsak').innerHTML = res.jadwal.data.imsak
    console.log(res.jadwal.data);
    // console.log(Date())
}
function subuh(res){
    $('subuh').innerHTML = res.jadwal.data.subuh

}
function terbit(res){
    $('terbit').innerHTML = res.jadwal.data.terbit
    console.log(res.jadwal.data);
    // console.log(Date())
}
function dhuha(res){
    $('dhuha').innerHTML = res.jadwal.data.dhuha

}function dzuhur(res){
    $('dzuhur').innerHTML = res.jadwal.data.dzuhur
    console.log(res.jadwal.data);
    // console.log(Date())
}
function ashar(res){
    $('ashar').innerHTML = res.jadwal.data.ashar

}function maghrib(res){
    $('maghrib').innerHTML = res.jadwal.data.maghrib
    console.log(res.jadwal.data);
    // console.log(Date())
}
function isya(res){
    $('isya').innerHTML = res.jadwal.data.isya

}
function tanggal(res){
    $('tanggal').innerHTML = res.jadwal.data.tanggal

}

function waktuSholat(res){
    console.log(res)
}

// function printText(){
//     document.getElementById("date").innerHTML = Date;
// }
// printText();

// var d = new Date(){
//     console.log(d);
// }


window.onload = function (){
    surahSelected = 1
    ayatSelected = 1
    jumlahayat = 7
    //even surah
    $('listSurah').addEventListener('change', function(){
        // console.log("ok")
        surahSelected = this.value
        change(surahSelected, ayatSelected, jumlahAyat)
        get("https://api.banghasan.com/quran/format/json/surat/" + surahSelected,jumlahAyat) /*jumlahAyat*/
        ayatSelected = 1
        // change(surahSelected, ayatSelected)
        get("https://api.banghasan.com/quran/format/json/surat/"+surahSelected, listAyat)
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
        // console.log(jumlahayat)
        if (ayatSelected != jumlahayat) {
            ayatSelected += 1
            change(surahSelected, ayatSelected)
            // console.log(surahSelected, ayatSelected, jumlahayat, this.value);
        } else {
            console.log(surahSelected, ayatSelected, jumlahayat, this.value);
            ayatSelected = 1
            surahSelected ++
            get("https://api.banghasan.com/quran/format/json/surat/"+surahSelected, listAyat)
            $('listSurah').value = surahSelected
            change(surahSelected, ayatSelected)
            get("https://api.banghasan.com/quran/format/json/surat/" + surahSelected,jumlahAyat)
            jumlahayat = $('jumlahAyat').value
            // console.log("ganti surah wooi")
        }
        //     $('jumlahAyat').value = jumlahayat
        // if (ayatSelected <= jumlahayat){    
            // } else {
                
                //     surahSelected ++
                //     ayatSelected = 1
                //     // ayatSelected += 1
                //     change(surahSelected, 1, jumlahAyat)
                //     get("https://api.banghasan.com/quran/format/json/surat/" + surahSelected,jumlahAyat)
                //     // change(surahSelected, jumlahAyat)
                // }
                // // change(surahSelected, ayatSelected)
                $('listAyat').value = ayatSelected
                // get("https://api.banghasan.com/quran/format/json/surat/" + surahSelected + "/ayat/" + this.value, ayat)
                // console.log(jumlahayat)
                console.log(surahSelected, ayatSelected, jumlahayat, this.value);
            })
            
            $('prev').addEventListener('click', function(){
                // change('prev = listAyat + 1')
                // result
                if (ayatSelected != 1){
                    ayatSelected -= 1
                    change(surahSelected, ayatSelected)
                    $('listAyat').value = ayatSelected
                    console.log(surahSelected, ayatSelected, jumlahayat, this.value);
                    
                } else {
                    console.log(surahSelected, ayatSelected, jumlahayat, this.value);
                    surahSelected--
                    get("https://api.banghasan.com/quran/format/json/surat/" + surahSelected,jumlahAyat)
                    // ayatSelected = $('jumlahAyat').value
                    // $('listSurah').value = surahSelected
                    // change(surahSelected, ayatSelected)
                    // jumlahayat = $('jumlahAyat').value
                    // // console.log($('jumlahAyat').value)
                    // // $('jumlahAyat').value = jumlahayat
                    get("https://api.banghasan.com/quran/format/json/surat/"+surahSelected, listAyat)
                    ayatSelected = jumlahayat
                    $('listAyat').value = 7
                    // // $('ayat').value = ayatSelected
                    
                    
                }
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
                
    var d = new Date();
    var now =  d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate();
    // var d = new Date();
    var hours = d.getHours()+':'+d.getMinutes();
    document.getElementById("date").innerHTML = hours
    // console.log(d);
    
                get("https://api.banghasan.com/quran/format/json/surat/1/ayat/1", ayat)
                get("https://api.banghasan.com/quran/format/json/surat", listSurah)
                get("https://api.banghasan.com/quran/format/json/surat/1", listAyat)
                get("https://api.banghasan.com/quran/format/json/surat/1", jumlahAyat)
                // get("https://muslimsalat.com/daily.json?8f2133630b3d84073c895327c7ec72ef", jadwalSholat)
                get("https://api.banghasan.com/sholat/format/json/jadwal/kota/783/tanggal/"+now+"", imsak)
                get("https://api.banghasan.com/sholat/format/json/jadwal/kota/783/tanggal/"+now+"", subuh)
                get("https://api.banghasan.com/sholat/format/json/jadwal/kota/783/tanggal/"+now+"", terbit)
                get("https://api.banghasan.com/sholat/format/json/jadwal/kota/783/tanggal/"+now+"", dhuha)
                get("https://api.banghasan.com/sholat/format/json/jadwal/kota/783/tanggal/"+now+"", dzuhur)
                get("https://api.banghasan.com/sholat/format/json/jadwal/kota/783/tanggal/"+now+"", ashar)
                get("https://api.banghasan.com/sholat/format/json/jadwal/kota/783/tanggal/"+now+"", maghrib)
                get("https://api.banghasan.com/sholat/format/json/jadwal/kota/783/tanggal/"+now+"", isya)
                get("https://api.banghasan.com/sholat/format/json/jadwal/kota/783/tanggal/"+now+"", tanggal)

                

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