import React, { Component, Fragment } from "react";

import PropTypes from "prop-types";



class Autocomplete extends Component {

    static propTypes = {

        suggestions: PropTypes.instanceOf(Array)

    };



    static defaultProps = {

        suggestions: []

    };



    constructor(props) {

        super(props);



        this.state = {

            // The active selection's index

            activeSuggestion: 0,

            // The suggestions that match the user's input

            filteredSuggestions: [],

            // Whether or not the suggestion list is shown

            showSuggestions: false,

            // What the user has entered

            userInput: "",

            medis:[]

        };

    }



    onChange = e => {

        const { suggestions } = this.props;

        const userInput = e.currentTarget.value;

        // console.log(userInput)

        // Filter our suggestions that don't contain the user's input

        const filteredSuggestions = suggestions.filter(

            suggestion =>

                suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1

        );



        this.setState({

            activeSuggestion: 0,

            filteredSuggestions,

            showSuggestions: true,

            userInput: e.currentTarget.value

        });
        // console.log(this.state.userInput)
    };



    onClick = e => {

        this.setState({

            activeSuggestion: 0,

            filteredSuggestions: [],

            showSuggestions: false,

            userInput: e.currentTarget.innerText

        });

    };



    onKeyDown = e => {

        const { activeSuggestion, filteredSuggestions } = this.state;



        // User pressed the enter key

        if (e.keyCode === 13) {

            this.setState({

                activeSuggestion: 0,

                showSuggestions: false,

                userInput: filteredSuggestions[activeSuggestion]

            });

        }

        // User pressed the up arrow

        else if (e.keyCode === 38) {

            if (activeSuggestion === 0) {
                return;
            }

            this.setState({ activeSuggestion: activeSuggestion - 1 });

        }

        // User pressed the down arrow

        else if (e.keyCode === 40) {

            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }
            this.setState({ activeSuggestion: activeSuggestion + 1 });
        }

    };


    // const medis=[]
    


    
    render() {

        const {

            onChange,

            onClick,

            onKeyDown,

            medPrint,

            state: {

                activeSuggestion,

                filteredSuggestions,

                showSuggestions,

                userInput

            }

        } = this;

        this.medPrint = ()=>{
            console.log(document.querySelector('.autoinpu').value)
            this.state.medis.push(document.querySelector('.autoinpu').value)
    
        };
        console.log(this.state.medis)
        let suggestionsListComponent;

        localStorage.setItem("medicines",this.state.medis)

        if (showSuggestions && userInput) {

            if (filteredSuggestions.length) {

                suggestionsListComponent = (

                    <ul class="suggestions">

                        {filteredSuggestions.map((suggestion, index) => {

                            let className;



                            // Flag the active suggestion with a class

                            if (index === activeSuggestion) {

                                className = "suggestion-active";

                            }



                            return (

                                <li className={className} key={suggestion} onClick={onClick} style={{listStyle:"none"}}>

                                    {suggestion}

                                </li>

                            );

                        })}

                    </ul>

                );

            } else {

                suggestionsListComponent = (

                    <div class="no-suggestions">

                        <em>No suggestions</em>

                    </div>

                );

            }

        }

        
        

        return (

            <Fragment>
                <h2 className="headin">MEDICINE</h2>
                <input
                    type="text"
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={userInput}
                    className="autoinpu"
                />

                <button onClick={medPrint}>ADD MEDICINE</button>

                {suggestionsListComponent}

            </Fragment>

        );

    }

}



export default Autocomplete;