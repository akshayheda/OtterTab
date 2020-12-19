import React, {state, useState} from 'react';
import styled from 'styled-components';
import { isURL } from 'validator';

const HTTP = "https://";
const WWW = "www.";
const SEARCH_URL = "http://www.google.com/search?q=";

const URL_OPTIONS = {"require_protocol": true};


const Input = styled.input`

`;



export const SearchBar = () => {
    const [text, setInputText] = useState("");

    
    const handleSubmit = (event) => {
        event.preventDefault();
        // check to see if it has http
        if (isURL(text, URL_OPTIONS)) {
            window.location.href = text;
        }
        // check if the rest is a url (can prepend protocol)
        else if (isURL(text)) {
            console.log(text);
            if (text.substring(0, 4) === WWW) {
                window.location.href = HTTP + text;
            }
            else {
                window.location.href = HTTP + WWW + text;
            }
        }
        else {
            window.location.href = SEARCH_URL + text;
        }
    }


    return <form
        onSubmit={(event) => handleSubmit(event)}
         >
            <Input
                type = 'text'
                value = {text}
                onChange={(event) => setInputText(event.target.value)}
                placeholder="Search"
 
            />
        </form>;
}
