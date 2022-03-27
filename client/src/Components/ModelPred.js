import React, { useRef } from "react";

import axios from "axios";

export default function Model() {


    const sy1=useRef()
    const sy2=useRef()
    const sy3=useRef()
    const sy4=useRef()
    const sy5=useRef()

    function hanCli(e){
        e.preventDefault()

        let o=[]
        if(sy1.current.value){
            o.push(sy1.current.value)
        }
        if(sy2.current.value){
            o.push(sy2.current.value)
        }
        if(sy3.current.value){
            o.push(sy3.current.value)
        }
        if(sy4.current.value){
            o.push(sy4.current.value)
        }
        if(sy5.current.value){
            o.push(sy5.current.value)
        }
        console.log(o)

        axios({
            method:"post",
            url:"http://localhost:3030/Model1",
            data:{o}
        })
        .then((res)=>{
            console.log(res.data)
            document.querySelector('.llp').innerHTML+=res.data.m1
            if(res.data.m2){
                document.querySelector('.gg').innerHTML+=res.data.m2
            }

        })
        .catch((err)=>{
            console.log(err)
        })
    }
    return (
        <div className="Outer">

            <form onSubmit={hanCli}>
                <h2>Add Symptoms</h2><br></br>
                <input type="text" placeholder="symptom 1" ref={sy1} ></input><br></br>
                <br></br>
                <input type="text" placeholder="symptom 2" ref={sy2} ></input><br></br>
                         <br></br>
                <input type="text" placeholder="symptom 3" ref={sy3} ></input><br></br>
                         <br></br>
                <input type="text" placeholder="symptom 4" ref={sy4} ></input><br></br>
                         <br></br>
                <input type="text" placeholder="symptom 5" ref={sy5} ></input><br></br>
                         <br></br>
                <input type="submit" value="SUBMIT"></input>
            </form>
            <hr></hr>
            <p className="llp">DISEASE:</p>
            <p className="gg">MEDICINES:</p>
        </div>
    )
}