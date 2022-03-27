import React from "react";
import { render } from "react-dom";
import Autocomplete from "./AutoComplete";
import "../css/PatientShow.css";

function AutoWarp() {
   return (
        <div>
            <fieldset className="fsett">
            {/* <h2>Start typing and experience the autocomplete wizardry!</h2>// */}
            <Autocomplete
                suggestions={[

                    "dolo 650",
                    "dolo 500",
                    "crocin",
                    "pandy",
                    "wikyril",
                    "calapl",
                    "Brufin",
                    "paracetemol",
                    "vokacet",
                    "sporolac",
                    "hajmola"
                ]}
            />
            </fieldset>
        </div>
    );
}

export default AutoWarp;
