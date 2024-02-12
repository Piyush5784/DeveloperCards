import { useRef, useState } from "react";
import axios from "axios"

export const useInputs = () => {
    const name = useRef();
    const description = useRef();
    const linkedIn = useRef();
    const twitter = useRef();
    const interests = useRef();

    return { name, description, linkedIn, twitter, interests };
}


export const BackendUrl = "http://localhost:3001/";

export async function getData() {
    const response = await fetch(`${BackendUrl}` + "getPersons")
    const data = await response.json();
    return data;
}

export async function postData(newPerson) {

    try {
        const response = await axios.post(`${BackendUrl}showCart`, { newPerson })
        console.log(response.data.Message);
    } catch (error) {
        console.log('Error: ' + error);
    }

}

