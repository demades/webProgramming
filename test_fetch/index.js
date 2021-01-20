var covid = [];
var url = "https://disease.sh/v3/covid-19/countries";


function gatherData(){
    fetch(url)
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      for (let prop in data) {

       //  console.log(data[prop].country);
        covid[prop].country = data[prop].country;
        covid[prop].cases = data[prop].cases;
        covid[prop].recovered = data[prop].recovered;
        covid[prop].deaths = data[prop].deaths;
      } return covid;
    } );
}

gatherData();
for (let prop in covid) {
    console.log(covid[prop].country);
  } 
