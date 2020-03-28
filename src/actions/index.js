import {SET_CONTACT, API, FETCH_CONTACT} from "./types";

export function fetchContact() {
    const urlBase = `https://contact-app-spring-boot.herokuapp.com/contact-app/api/collaborator/collaboratorRegistrationNumber/${window.location.pathname.split('/').pop()}`;
    return apiAction({
        url: urlBase,
        onSuccess: setContact,
        onFailure: () => console.log("Error occured loading payment"),
        label: FETCH_CONTACT
    });
}

function setContact(data) {
    console.log(data);
    return {
        type: SET_CONTACT,
        payload: data
    };
}

function apiAction({
                       url = "",
                       method = "",
                       data = null,
                       accessToken = null,
                       onSuccess = () => {
                       },
                       onFailure = () => {
                       },
                       label = "",
                       headersOverride = null
                   }) {
    return {
        type: API,
        payload: {
            url,
            method,
            data,
            accessToken,
            onSuccess,
            onFailure,
            label,
            headersOverride
        }
    };
}
