import React from 'react';
import ReactDOM from 'react-dom';
import { hydrate, render } from 'react-dom';
import * as firebase from "firebase";
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import authService from './service/auth/AuthenticationService';
import counterpart from 'counterpart';
// Import routing components
import {BrowserRouter} from 'react-router-dom';

import App from "./App";

authService.refreshToken();

counterpart.registerTranslations('en', {

    general: {
        book: 'Book',
        begin_date: 'Begin date',
        end_date: 'End date',
        begin_time: 'Begin time',
        end_time: 'End time',
        facility: 'Facility',
        date: 'Date',
        participants: 'Participants',
        equipments: 'Equipments',
        Base: 'Base',
        supplemental: 'Supplemental',
        base_equipments: 'Base equipments',
        supplemental_equipments: 'Supplemental equipments',
        comments: 'Comments',
        ratings: "Ratings",
        price: 'Price',
        premises: "Premises",
        accesses: "Accesses",
        send: "Send",
        close: "Close",
        profile: "Profile",
        placeholder:"Try searching for facilities here",
        cancel: "Cancel",
        save: "Save",
        booking: "Booking"
    },

    footer:{
        contacts:"Contacts",
        about:"About Us",
        terms:"Terms and conditions"
    },

    navbar: {
        login: "Login",
        signup: "Sign up",
        mybookings: "My bookings",
        logout: "Logout"
    },

    homepage: {
        header_text: 'Find the perfect place for your game',
        searchbar: {
            placeholder: 'Try to search for a facility by name',
            button: 'Search',
            advancedsearch: "Advanced search"
        },
        featured_facilities: {
            title: 'Featured facilities',
        },
        featured_locations: {
            title: 'Find facilities by locations',
        }
    },

    searchpage: {
        sidebar: {
            search: 'Search',
            search_placeholder: 'Search for...',
            searchbydate: 'Search by date',
            searchbyrange: 'Search by range',
            sports: 'Sports',
            categories: 'Categories',
            map: 'Map',
            date: 'Date',
            meters: 'meters',
            range_explained: 'Range between 500 and 50000 meters',
            searchbyratings: 'Ratings (at least)',
            ratings:{
                general:"General",
                price:"Price",
                acesses:"Acesses",
                premises:"Premises"
            }
        },
        navigatebackward: "Previous 10",
        navigateonward: "Next 10",
        facilityMoreInformation: "More",
        orderType: {
            bestRatings: "Best Ratings",
            closer: "Closer"
        }
    },

    mybookingspage: {
        as_author: 'As author',
        as_participant: 'As participant',
        no_bookings: 'No bookings to the selected dates.'
    },

    facilitypage: {
        max_participants_allowed: 'Max participants allowed'
    },

    signinmodal: {
        title: "Sign in",
        rememberme: "Remember me",
        errorMessage: "The username or password you entered is incorrect."
    },

    facilityDetails: {
        ratingsEvaluation: {
            ratingsNoEvaluation: "No rating given",
            ratingsVeryBad: "Very bad",
            ratingsBad: "Bad",
            ratingsGood: "Good",
            ratingsVeryGood: "Very good",
            ratingsExcelent: "Excelent",
        }
    },
    
    profilepage:{
        editinfo: "Edit info",
        deleteaccount: "Delete account",
        newpassword: "New Password"
    },

    bookinginfomodal:{
        editrating: "Edit rating",
        ratebooking: "Rate booking"
    },

    passwordconfirmation:{
        confirmAction: "Confirm action",
        enterPassword: "Please insert your password to confirm this action:",
        confirm: "Confirm"
    },

    bookfacilitypage:{
        title: "Book facility",
        invitefriends: "Invite your friends to join you",
        equipmentsdescription: "This facility allows you to use the following equipments",
        supplementalequipmentsdescription: "Choose the supplemental equipments you want to use"
    }

});

counterpart.registerTranslations('pt', {

    general: {
        book: 'Reservar',
        begin_date: 'Data de início',
        end_date: 'Data de fim',
        begin_time: 'Hora início',
        end_time: 'Hora fim',
        facility: 'Recinto',
        date: 'Data',
        participants: 'Participantes',
        equipments: 'Equipmentos',
        Base: 'Base',
        base_equipments: 'Equipamentos base',
        supplemental: 'Suplementar',
        supplemental_equipments: 'Equipamentos suplementares',
        comments: 'Comentários',
        ratings: "Avaliações",
        price: 'Preço',
        premises: "Instalações",
        accesses: "Acessos",
        send: "Enviar",
        close: "Fechar",
        profile: "Perfil",
        placeholder:"Experimente pesquisar por recintos aqui",
        cancel: "Cancelar",
        save: "Guardar",
        booking: "Reserva"
    },

    footer:{
        contacts:"Contactos",
        about:"Sobre nós",
        terms:"Termos e condições"
    },

    navbar: {
        login: "Entrar",
        signup: "Registar",
        mybookings: "Minhas reservas",
        logout: "Sair"
    },

    homepage: {
        header_text: 'Encontre o lugar ideal para o seu jogo',
        searchbar: {
            placeholder: 'Experimente procurar um recinto pelo seu nome',
            button: 'Procurar',
            advancedsearch: "Pesquisa avançada"
        },
        featured_facilities: {
            title: 'Recintos em destaque',
        },
        featured_locations: {
            title: 'Encontre recintos por localização',
        }
    },

    searchpage: {
        sidebar: {
            search: 'Procurar',
            search_placeholder: 'Procurar por...',
            searchbydate: 'Procurar por data',
            searchbyrange: 'Procurar por distância',
            sports: 'Desportos',
            categories: 'Categorias',
            map: 'Mapa',
            date: 'Data',
            meters: 'metros',
            range_explained: 'Distância entre 500 a 50000 metros',
            searchbyratings: 'Avaliações (no mínimo)',
            ratings:{
                general:"Geral",
                price:"Preço",
                acesses:"Acessos",
                premises:"Instalações"
            }
        },
        navigatebackward: "10 anteriores",
        navigateonward: "Próximos 10",
        facilityMoreInformation: "Mais",
        orderType: {
            bestRatings: "Melhores avaliações",
            closer: "Mais perto"
        }
    },

    mybookingspage: {
        as_author: 'Como autor',
        as_participant: 'Como participante',
        no_bookings: 'Sem reservas para as datas selecionadas.'
    },

    facilitypage: {
        max_participants_allowed: 'Máximo de participantes permitidos'
    },

    signinmodal: {
        title: "Entrar",
        rememberme: "Lembrar credenciais",
        errorMessage: "Username or password incorretos."
    },

    facilityDetails: {
        ratingsEvaluation: {
            ratingsNoEvaluation: "Não avaliado",
            ratingsVeryBad: "Muito mau",
            ratingsBad: "Mau",
            ratingsGood: "Bom",
            ratingsVeryGood: "Muito bom",
            ratingsExcelent: "Excelente",
        }
    },
    
    profilepage:{
        editinfo: "Editar dados",
        deleteaccount: "Apagar conta",
        newpassword: "Nova Password"
    },

    bookinginfomodal:{
        editrating: "Editar avaliação",
        ratebooking: "Avaliar reserva"
    },

    passwordconfirmation:{
        confirmAction: "Confirmar ação",
        enterPassword: "Por favor, insira a sua password atual para confirmar esta ação:",
        confirm: "Confirmar"
    },

    bookfacilitypage:{
        title: "Reservar recinto",
        invitefriends: "Convide os seus amigos",
        equipmentsdescription: "Este recinto permite o uso dos seguintes recintos",
        supplementalequipmentsdescription: "Escolha equipamentos extra que deseja usar"
    }
});

counterpart.setLocale(localStorage.getItem('locale') || 'pt');


/*
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBO4-7K3KvZK5eZoprPm4hxKR-uujKB0RA",
    authDomain: "casarder-6e2ec.firebaseapp.com",
    databaseURL: "https://casarder-6e2ec.firebaseio.com",
    projectId: "casarder-6e2ec",
    storageBucket: "casarder-6e2ec.appspot.com",
    messagingSenderId: "971876798141"
};
firebase.initializeApp(config);


// Retrieve Firebase Messaging object.
const messaging = firebase.messaging();

messaging.requestPermission()
    .then(function() {
        console.log('Notification permission granted.');
        // TODO(developer): Retrieve an Instance ID token for use with FCM.
        return messaging.getToken();
    }).then(function (token) {
        console.log(token);
    })
    .catch(function(err) {
        console.log('Error occurred', err);
    });


// Get Instance ID token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
messaging.getToken()
    .then(function(currentToken) {
        if (currentToken) {
            localStorage.setItem('fcmToken', currentToken);
            //sendTokenToServer(currentToken);
            //updateUIForPushEnabled(currentToken);
        } else {
            // Show permission request.
            console.log('No Instance ID token available. Request permission to generate one.');
            // Show permission UI.
            //updateUIForPushPermissionRequired();
            //setTokenSentToServer(false);
        }
    })
    .catch(function(err) {
        console.log('An error occurred while retrieving token. ', err);
        //showToken('Error retrieving Instance ID token. ', err);
        //setTokenSentToServer(false);
    });


// Callback fired if Instance ID token is updated.
messaging.onTokenRefresh(function() {
    messaging.getToken()
        .then(function(refreshedToken) {
            console.log('Token refreshed.');
            localStorage.setItem('fcmToken', refreshedToken);
            // Indicate that the new Instance ID token has not yet been sent to the
            // app server.
            //setTokenSentToServer(false);
            // Send Instance ID token to app server.
            //sendTokenToServer(refreshedToken);
            // ...
        })
        .catch(function(err) {
            console.log('Unable to retrieve refreshed token ', err);
        });
});

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a sevice worker
//   `messaging.setBackgroundMessageHandler` handler.
messaging.onMessage(function(payload) {
    console.log("Message received. ", payload);
    // ...
});

*/



const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
    hydrate(
        <BrowserRouter>
            <App />
        </BrowserRouter>, rootElement);
} else {
    render(
        <BrowserRouter>
            <App />
        </BrowserRouter>, rootElement);
}

/*
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);
*/

registerServiceWorker();
