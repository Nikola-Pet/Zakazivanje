prikaziTermine();



function obradiFormu() {
  // Dohvati podatke iz forme
  var ime = document.getElementById("ime").value;
  var prezime = document.getElementById("prezime").value;
  var brojTelefona = document.getElementById("broj_telefona").value;
  var datum = document.getElementById("datum").value;
  var vreme = document.getElementById("vreme").value;
  var usluga = document.getElementById("usluga").value;

  axios.post('https://63ac862434c46cd7ae848bb5.mockapi.io/termini', {
    ime: ime,
    prezime: prezime,
    broj_telefona: brojTelefona,
    datum: datum,
    vreme: vreme,
    usluga: usluga
  });

  prikaziTermine();
}

function prikaziTermine() {
  axios.get('https://63ac862434c46cd7ae848bb5.mockapi.io/termini')
  .then(response => {
    // Učitavanje je uspjelo, podaci se nalaze u response.data
    var data = response.data;

    var termini = data;
    // Inicijalizuj promenljivu za HTML kod tabele
var tableHTML = "<tr>" +
"<th>Ime</th>" +
"<th>Prezime</th>" +
"<th>Broj telefona</th>" +
"<th>Datum</th>" +
"<th>Vreme</th>" +
"<th>Usluga</th>" +
"</tr>";  // Petljom prolazi kroz sve termine i dodaje ih u HTML kod tabele
  for (var i = 0; i < termini.length; i++) {
    var termin = termini[i];
     tableHTML += "<tr>" +
                   "<td>" + termin.ime + "</td>" +
                   "<td>" + termin.prezime + "</td>" +
                   "<td>" + termin.broj_telefona + "</td>" +
                   "<td>" + termin.datum + "</td>" +
                   "<td>" + termin.vreme + "</td>" +
                   "<td>" + termin.usluga + "</td>" +
                 "</tr>";
  }

  // Dohvati element tabele i postavi HTML kod tabele
  var table = document.getElementById("appointmetsTable");
  table.innerHTML = tableHTML;
  })
}

//prikaziTermine();

//////////////////////
function sortirajPoDatumuIVremenu() {
  axios.get('https://63ac862434c46cd7ae848bb5.mockapi.io/termini')
  .then(response => {
    // Učitavanje je uspjelo, podaci se nalaze u response.data
    var data = response.data;
    var termini = data;

  // Sortiraj termine po datumu i vremenu
  termini.sort(function(a, b) {
    var datumA = new Date(a.datum + " " + a.vreme);
    var datumB = new Date(b.datum + " " + b.vreme);
    return datumA - datumB;
  });

  // Inicijalizuj promenljivu za HTML kod tabele
  var tableHTML = "<tr>" +
                    "<th>Ime</th>" +
                    "<th>Prezime</th>" +
                    "<th>Broj telefona</th>" +
                    "<th>Datum</th>" +
                    "<th>Vreme</th>" +
                    "<th>Usluga</th>" +
                  "</tr>";


  // formatiramo datum 
  var d = new Date();
  var month = '' + (d.getMonth() + 1);
  var day = '' + d.getDate();
  var year = d.getFullYear();

  if (month.length < 2) 
    month = '0' + month;
  if (day.length < 2) 
    day = '0' + day;

  
  d = [year, month, day].join('-');

  // Petljom prolazi kroz sve sortirane termine i dodaje ih u HTML kod tabele
  for (var i = 0; i < termini.length; i++) {
    var termin = termini[i];
    if(termin.datum >= d)
    {
      tableHTML += "<tr>" +
      "<td>" + termin.ime + "</td>" +
      "<td>" + termin.prezime + "</td>" +
      "<td>" + termin.broj_telefona + "</td>" +
      "<td>" + termin.datum + "</td>" +
      "<td>" + termin.vreme + "</td>" +
      "<td>" + termin.usluga + "</td>" +
    "</tr>";
    }
    
  }

  // Dohvati element tabele i postavi HTML kod tabele
  var table = document.getElementById("appointmetsTable");
  table.innerHTML = tableHTML;
    console.log(data);
  })
  }


  ////////////////////////////////////////
  prikaziTermine();