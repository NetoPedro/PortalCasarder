import authService from './auth/AuthenticationService';
import moment from 'moment';

export default {
   timeSlotById(id) {
        return fetch('https://casarder.azurewebsites.net/pt/api/timeslots/' + id,
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

    bookTimeSlot(id, supplementalEquipmentIds, participantEmails) {

        return fetch('https://casarder.azurewebsites.net/pt/api/timeslots/' + id + '/book',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authService.token()
                },
                body:JSON.stringify(
                    {
                        SupplementalEquipmentIds: supplementalEquipmentIds,
                        Participants: participantEmails
                    })
            })
            .then(function handleErrors(response) {
                if (response.status !== 201) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => response.json())
            .then(function(data) {

                console.log(data);

                return data;

            }).catch(function(error) {
                console.log(error);

                return null;
            });
    },

    myBookings(isAuthor, beginDate, endDate) {

        console.log('https://casarder.azurewebsites.net/pt/api/timeslots/booked?from='
            + beginDate.format('YYYY-MM-DD')
            + '&to=' + endDate.format('YYYY-MM-DD') + '&isAuthor=' + isAuthor);

        return fetch('https://casarder.azurewebsites.net/pt/api/timeslots/booked?from='
            + beginDate.format('YYYY-MM-DD')
            + '&to=' + endDate.format('YYYY-MM-DD') + '&isAuthor=' + isAuthor ,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authService.token()
                }
            })
            .then((response) => response.json())
            .then(function(data) {

                console.log(data);

                return data;

            }).catch(function(error) {
                console.log(error);
            });
    },

    cancelBooking(timeSlotId) {

        return fetch('https://casarder.azurewebsites.net/pt/api/timeslots/' + timeSlotId + '/booking/cancel',
            {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authService.token()
                }
            })
            .then(function handleErrors(response) {
                if (!response.ok) {
                    throw Error(response.statusText);
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
}