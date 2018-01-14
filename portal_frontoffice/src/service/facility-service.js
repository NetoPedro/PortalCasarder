export default {
    facilityById(id) {
        return fetch('https://casarder.azurewebsites.net/pt/api/facilities/' + id,
            {
                method: 'GET',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            })
            .then((response) => response.json())
            .then(function(data) {

                console.log(data);

                return data;

            }).catch(function(error) {
                console.log(error);
            });
    },

    searchFacilitiesByDate(date) {
        return fetch('https://casarder.azurewebsites.net/pt/api/facilities/AvailableAt?availableAt=' + date.format('YYYY-MM-DD'),
            {
                method: 'GET',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            })
            .then((response) => response.json())
            .then(function(data) {

                console.log(data);

                return data;

            }).catch(function(error) {
                console.log(error);
            });
    },

    searchLocationsWithSolr(input){
        return fetch('http://casardercdio.ddns.net:22002/solr/locations/suggest?suggest.q=' + input,
            {
                method: 'GET',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            })
            .then((response) => response.json())
            .then(function(data) {

                //console.log(data);

                return data;

            }).catch(function(error) {
                console.log(error);
            });
    },

    searchTop3LocationsWithSolr(){
        return fetch('http://casardercdio.ddns.net:22002/solr/locations/select?q=*:*&rows=3&sort=weight%20desc',
            {
                method: 'GET',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            })
            .then((response) => response.json())
            .then(function(data) {

                //console.log(data);

                return data;

            }).catch(function(error) {
                console.log(error);
            });
    },

    searchFacilitiesSuggestionsWithSolr(input){
        return fetch('http://casardercdio.ddns.net:22002/solr/facilities/suggest?suggest.q=' + input,
            {
                method: 'GET',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            })
            .then((response) => response.json())
            .then(function(data) {

                console.log(data);

                return data;

            }).catch(function(error) {
                console.log(error);
            });
    },

    searchFacilitiesWithSolr(input, averageRating, priceRating, premisesRating, accessesRating, offset, categories, sports, long, lat, distance, searchByDistance, sort, searchByDate, idsFoundByDate){

        let idsQuery = '';
        let categoriesQuery = '';
        let sportsQuery = '';
        let locationQuery = '';


        if(searchByDate){
            if(idsFoundByDate.length > 0) {
                idsQuery = '%20AND%20id:(';
                for (let i = 0; i < idsFoundByDate.length; i++) {
                    i > 0 ? idsQuery += '%20OR%20' + idsFoundByDate[i] : idsQuery += idsFoundByDate[i]
                }
                idsQuery += ')';
            }else{
                idsQuery = '%20AND%20id:(0)';
            }

        }

        if(categories.length > 0) {


            if(sports.length > 0) {
                categoriesQuery += '%20AND%20(';
            }else{
                categoriesQuery += '%20AND%20';
            }

            categoriesQuery += 'categories:(' + categories[0];
            for (let i = 1; i < categories.length; i++) {
                categoriesQuery += '%20OR%20' + categories[i];
            }

            categoriesQuery += ')';
        }

        if(sports.length > 0) {
            if(categoriesQuery !== '') {
                sportsQuery += '%20OR%20';
            }else{
                sportsQuery += '%20AND%20';
            }

            sportsQuery += 'sports:(' + sports[0];
            for (let i = 1; i < sports.length; i++) {
                sportsQuery += '%20OR%20' + sports[i];
            }


            if(categoriesQuery !== '') {
                sportsQuery += '))';
            }else{
                sportsQuery += ')';
            }
        }

        if(searchByDistance){
            locationQuery += '%20AND%20{!geofilt}&sfield=lanlon&pt=' + lat + ',' + long +'&d=' + distance
        }else if(sort === 'distance'){
            locationQuery += '%20AND%20{!geofilt}&sfield=lanlon&pt=' + lat + ',' + long +'&d=' + 10000
        }

        let sortQuery;
        if(sort === 'rating') sortQuery = "&sort=averageRating%20desc";
        if(sort === 'distance') sortQuery = "&sort=geodist()%20asc";

        console.log('http://casardercdio.ddns.net:22002/solr/facilities/select?' +
            'fq=averageRating:[' + averageRating + '%20TO%20*]' +
            '%20AND%20averagePriceRating:[' + priceRating + '%20TO%20*]' +
            '%20AND%20averagePremisesRating:[' + premisesRating + '%20TO%20*]' +
            '%20AND%20averageAccessesRating:[' + accessesRating + '%20TO%20*]' +
            categoriesQuery +
            sportsQuery +
            locationQuery +
            idsQuery +
            '&q=name:' + input + '*%20OR%20city:' + input + '*' + sortQuery + '&start=' + offset);

        return fetch('http://casardercdio.ddns.net:22002/solr/facilities/select?' +
            'fq=averageRating:[' + averageRating + '%20TO%20*]' +
            '%20AND%20averagePriceRating:[' + priceRating + '%20TO%20*]' +
            '%20AND%20averagePremisesRating:[' + premisesRating + '%20TO%20*]' +
            '%20AND%20averageAccessesRating:[' + accessesRating + '%20TO%20*]' +
            categoriesQuery +
            sportsQuery +
            locationQuery +
            idsQuery +
            '&q=name:' + input + '*%20OR%20city:' + input + '*' + sortQuery + '&start=' + offset, {
                method: 'GET',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            })
            .then((response) => response.json())
            .then(function(data) {

                console.log('SOLR', data);

                return data;

            }).catch(function(error) {
                console.log(error);
            });
    },

    searchFacilitiesWithDotNet(input){
        /*
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');

        const main = this;

        let sportString = "";
        for(let i = 0 ; i < this.state.selectedSports.length; i++) {
            let sport = this.state.selectedSports[i];
            sportString += (i === this.state.selectedSports.length - 1) ? sport : sport + ",";
        }

        let categoryString = "";
        for(let i = 0 ; i < this.state.selectedCategories.length; i++) {
            let category = this.state.selectedCategories[i];
            categoryString += (i === this.state.selectedCategories.length - 1) ? category : category + ",";
        }

        let searchByDistanceString = (this.state.searchByDistance)?
            "&range=" + this.state.searchRange/1000 : "";

        let searchByRatingString =
            "&rating=" + (this.state.searchAverageRating > 0.5 ? this.state.searchAverageRating-0.5 : this.state.searchAverageRating);

        console.log('https://casarder.azurewebsites.net/pt/api/facilities?name='+ this.state.searchInput
            + "&sortBy=" + this.state.sortBy
            + (this.state.searchByDate? "&availableOn=" + this.state.date.toISOString() : "")
            + "&sport=" + sportString + "&category=" + categoryString + searchByRatingString
            + searchByDistanceString);

        fetch('https://casarder.azurewebsites.net/'  + counterpart.getLocale() + '/api/facilities?name='+ this.state.searchInput
            + "&sortBy=" + this.state.sortBy + "&latitude=" + this.state.lat + "&longitude=" + this.state.lng
            + (this.state.searchByDate? "&availableOn=" + this.state.date.toISOString() : "")
            + "&sport=" + sportString + "&category=" + categoryString + searchByRatingString
            + searchByDistanceString + "&offset=" + this.state.offset + "&limit=" + 10,
            {
                method: 'GET',
                headers: headers
            })
            .then((response) => response.json())
            .then(function(data) {

                var count = -1;

                let facilityList = data.facilitiesDTO.map((facility) => {

                    count++;

                    return (
                        <FacilityCard facility={facility} key={facility.id} index={count} seeDetails={main.showFacilityDetails}/>
                    )
                });

                console.log(data);

                main.setState({facilityCards: facilityList, facilities: data.facilitiesDTO, searching: false, resultsFound: data.resultsFound});

                return facilityList;

            }).catch(function(error) {
            console.log(error);
        });
        */
    }
}