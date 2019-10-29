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
    //console.log(res.hasil.length);
    
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
    //console.log(res.hasil.length);
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

function ayat(res){
    $('ayat').innerHTML = res.ayat.data.ar[0].teks
    $('terjemah').innerHTML = res.ayat.data.id[0].teks
    
}

function change(surahSelect, ayatSelect) {
    get("https://api.banghasan.com/quran/format/json/surat/" + surahSelect + "/ayat/" + ayatSelect, ayat)
}


window.onload = function (){
    surahSelected = 1
    //even surah
    $('listSurah').addEventListener('change', function(){
        surahSelected = this.value
        change(surahSelected, 1)
        get("https://api.banghasan.com/quran/format/json/surat/" + surahSelected, listAyat)
    })

    //even ayat
    $('listAyat').addEventListener('change', function(){
        change(surahSelected, this.value)
        // get("https://api.banghasan.com/quran/format/json/surat/" + surahSelected + "/ayat/" + this.value, ayat)
    })

    get("https://api.banghasan.com/quran/format/json/surat/1/ayat/1", ayat)
    get("https://api.banghasan.com/quran/format/json/surat", listSurah)
    get("https://api.banghasan.com/quran/format/json/surat/1", listAyat)
}
