// create variables
var tbody = d3.select("tbody");
var dateSelect = d3.select("#datetime");
var citySelect = d3.select("#city");
var stateSelect = d3.select("#state");
var countrySelect = d3.select("#country");
var shapeSelect = d3.select("#shape");
var filterButton = d3.select("#filter-btn");
var resetButton = d3.select("#reset-btn");

// function to clear the table body to prepare for new data display
function clearTable() {
    tbody.html("");
};

// clear filters
function resetForm() {
    document.getElementById('formFilter').reset();
}
// create a function to reset the table to default
function resetTable() {

    // clear the current data - clearTable and resetForm
    clearTable();
    resetForm();

    // use forEach and Object.values to populate the initial table
    data.forEach((ufoSighting) => {
        var row = tbody.append("tr");
        Object.values(ufoSighting).forEach(value => {
            var cell = row.append("td");
            cell.text(value);
            cell.attr("class", "table-style");
        });
    });
};

function populateDropdowns() {
    // create arrays to store variables and sort in ascending order
    // then use set to get unique values and then form array from the set
    var dates = Array.from(new Set(data.map(sighting => sighting.datetime))).sort(d3.ascending);;
    var cities = Array.from(new Set(data.map(sighting => sighting.city))).sort(d3.ascending);
    var states = Array.from(new Set(data.map(sighting => sighting.state))).sort(d3.ascending);
    var countries = Array.from(new Set(data.map(sighting => sighting.country))).sort(d3.ascending);
    var shapes = Array.from(new Set(data.map(sighting => sighting.shape))).sort(d3.asending);

    // then forLoop over elements to populate populate dropdowns
    dates.forEach(date => {
        var option = dateSelect.append("option");
        option.text(date);
    });

    cities.forEach(city => {
        var option = citySelect.append("option");
        option.text(city);
    });

    states.forEach(state => {
        var option = stateSelect.append("option");
        option.text(state);
    });

    countries.forEach(country => {
        var option = countrySelect.append("option");
        option.text(country);
    });

    shapes.forEach(shape => {
        var option = shapeSelect.append("option");
        option.text(shape);
    });

}

// create a function to update table according to the date input by the user
function filterTable() {
    // Prevent the page from refreshing
    d3.event.preventDefault();

    // get the user input for filtering 
    var inputDate = dateSelect.property("value")
    var inputCity = citySelect.property("value")
    var inputState = stateSelect.property("value")
    var inputCountry = countrySelect.property("value")
    var inputShape = shapeSelect.property("value")

    // make a copy of the data for filtering
    var filteredData = data;

    // if there is a date input, check that the dates are present in the input array and filter
    if (inputDate) {
        filteredData = filteredData.filter(sighting => sighting.datetime == inputDate);
    }

    // city input
    if (inputCity) {
        filteredData = filteredData.filter(sighting => sighting.city == inputCity);
    }

    // state input
    if (inputState) {
        filteredData = filteredData.filter(sighting => sighting.state == inputState);
    }

    // country input
    if (inputCountry) {
        filteredData = filteredData.filter(sighting => sighting.country == inputCountry);
    }

    // shape input
    if (inputShape) {
        filteredData = filteredData.filter(sighting => sighting.shape == inputShape);
    }

    // reset the table
    clearTable();

    // create condition if the filteredData array is empty
    if (filteredData.length == 0){
        var row = tbody.text("There are no sightings with the chosen filters.");
    } else {
        filteredData.forEach((ufoSighting) => {
            var row = tbody.append("tr");
            Object.values(ufoSighting).forEach(value => {
                var cell = row.append("td");cell.text(value);cell.attr("class", "table-style");
            });
        });
    };
};

// initially populate the table by default
resetTable();

// populate dropdowns in the filter forms
populateDropdowns();

// use the `on` function in d3 to attach a click event to the handler function for filterButton
filterButton.on("click", filterTable);

// use the `on` function in d3 to attach a click event to the handler function for resetButton
resetButton.on("click", resetTable);