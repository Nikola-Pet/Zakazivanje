




function obradiFormu() {
  // Dohvati podatke iz forme
  var ime = document.getElementById("ime").value;
  var prezime = document.getElementById("prezime").value;
  var brojTelefona = document.getElementById("broj_telefona").value;
  var datum = document.getElementById("datum").value;
  var vreme = document.getElementById("vreme").value;
  var usluga = document.getElementById("usluga").value;

  // Napravi objekat sa podacima
  var termin = {
    ime: ime,
    prezime: prezime,
    brojTelefona: brojTelefona,
    datum: datum,
    vreme: vreme,
    usluga: usluga
  };




  // Proveri da li postoji item u Web Storage sa nazivom "termini"
  if (localStorage.getItem("termini") === null) {
    // Ako ne postoji, napravi novi niz i dodaj trenutni termin u njega
    var termini = [];
    termini.push(termin);
    // Upisi niz u Web Storage pod nazivom "termini"
    localStorage.setItem("termini", JSON.stringify(termini));
  } else {
    // Ako postoji, dohvati niz iz Web Storage-a i dodaj trenutni termin u njega
    var termini = JSON.parse(localStorage.getItem("termini"));
    termini.push(termin);
    // Upisi niz sa novim terminom u Web Storage
    localStorage.setItem("termini", JSON.stringify(termini));
  }

  // Prikaži sve zakazane termine u tabeli
}

function prikaziTermine() {
  fetch("./appointments.json")
  .then(response => {
     return response.json();
  })
  .then(data => {

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
  }
    
  );
 


}

prikaziTermine();

//////////////////////
function sortirajPoDatumuIVremenu() {
  fetch("./appointments.json")
  .then(response => {
     return response.json();
  })
  .then(data => {
    // Dohvati niz sa zakazanim terminima iz Web Storage-a
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

  });


  }