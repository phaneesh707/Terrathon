import React from "react";
import '../css/HomeCss.css'
// import {Carousel} from 'react-bootstrap'
import quta from '../images/quta.jpeg'
import doc from '../images/doc.jpeg'
// import ref from '../images/ref.jfif'
// import refi from '../images/refi.png'
import re from '../images/re.jpeg'
import com from '../images/Untitled.jpeg'
import n8 from "../images/nnn.jpg"
import axios from "axios";

export default function Home() {



    return (
        <div className="Outer">

            <img src={n8} alt="img" className="backimg" />

            <div className="headerOuter">
                <h1 className="header">
                    SWASTH
                </h1>
                <h1 className="header2">HOSPITAL IS NO PLACE TO BE SICK</h1>
            </div>
        </div>
    )
}