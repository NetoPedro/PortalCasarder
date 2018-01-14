import authService from './auth/AuthenticationService';

export default {
    newRating(bookingId, priceRating, accessesRating, premisesRating, comment) {

        if(priceRating === null || priceRating === undefined){
            priceRating = 0;
        }

        return fetch('https://casarder.azurewebsites.net/pt/api/ratings',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authService.token()
                },
                body:JSON.stringify(
                    {
                        BookingId: bookingId,
                        PremisesValue: premisesRating,
                        AccessesValue: accessesRating,
                        PriceValue: priceRating,
                        Comment: comment
                    })
            })
            .then(function handleErrors(response) {
                if (response.status !== 201) {
                    throw Error(response);
                }
                return response;
            })
            .then((response) => response.json())
            .then(function(data) {

                console.log(data);

                return data.id;

            }).catch(function(error) {
                console.log(error);

                return -1;
            });
    },

    updateRating(ratingId, priceRating, accessesRating, premisesRating, comment) {

        if(priceRating === null || priceRating === undefined){
            priceRating = 0;
        }

        return fetch('https://casarder.azurewebsites.net/pt/api/ratings/' + ratingId,
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authService.token()
                },
                body:JSON.stringify(
                    {
                        Id: ratingId,
                        PremisesValue: premisesRating,
                        AccessesValue: accessesRating,
                        PriceValue: priceRating,
                        Comment: comment
                    })
            })
            .then(function handleErrors(response) {
                if (response.status !== 204) {
                    throw Error(response);
                }
                return ratingId;
            }).catch(function(error) {
                console.log(error);

                return -1;
            });
    },
}
