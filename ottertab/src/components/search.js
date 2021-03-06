import React, {useState} from 'react';
import { isURL } from 'validator';
import { Input } from "antd";

// prepend constants
const HTTP = "https://";
const WWW = "www.";
const SEARCH_URL = "http://www.google.com/search?q=";
const URL_OPTIONS = {"require_protocol": true};
const { Search } = Input;

// search bar used in middle of page
export const SearchBar = () => {
    // current input as state
    const [text, setInputText] = useState("");

    // handles query upon submission
    const handleSubmit = () => {
        // check to see if it has http
        if (isURL(text, URL_OPTIONS)) {
            window.location.href = text;
        }
        // check if the rest is a url (can prepend protocol)
        else if (isURL(text)) {
            if (text.substring(0, 4) === WWW) {
                window.location.href = HTTP + text;
            }
            else {
                window.location.href = HTTP + WWW + text;
            }
        }
        // search query case
        else {
            window.location.href = SEARCH_URL + text;
        }
    }
    // return searchbar that is linked to function above
    return <Search
                style={{width: '80%'}}
                onSearch={handleSubmit}
                size='large'
                type = 'text'
                value = {text}
                onChange={(event) => setInputText(event.target.value)}
                placeholder="Search"
 
            />
}
