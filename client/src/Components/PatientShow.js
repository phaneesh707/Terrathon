import React ,{useState,useRef,useEffect} from "react";
// import Editor from "./editor";
import axios from 'axios'
import  { Component } from "react";
import ReactQuill from "react-quill";
import "quill-mention";
import "quill-mention/dist/quill.mention.css";
import {Alert} from 'react-bootstrap'
import "../css/PatientShow.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AutoCompleteWarp from './AutoCompleteWrap'
import AutoWarp from "./AutoCompleteWrap";
// import Autocomplete from 'react-autocomplete'
// import SpeechToTxt from './SpeechToTxt'
function PatientShow() {

  const [text,setText]=useState("");
  const [error,setError]=useState("")
  const [mes,setMes]=useState("")
  const jj=useRef()

    
  const hhh=JSON.parse(localStorage.getItem("ptn")).Name

  const atValues = [
    { id: 1, value: "Fredrik Sundqvist" },
    { id: 2, value: "Patrik Sjölin" }
  ];
  
  const toolbarOptions = ["bold"];
  const arearef=useRef()
  var modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"]
    ],
    mention: {
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ["@", "#"],
      source: function(searchTerm, renderItem, mentionChar) {
        let values;
        if (mentionChar === "@" || mentionChar === "#") {
          values = atValues;
        }
        if (searchTerm.length === 0) {
          renderItem(values, searchTerm);
        } else {
          const matches = [];
          for (let i = 0; i < values.length; i++)
            if (
              ~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())
            )
              matches.push(values[i]);
          renderItem(matches, searchTerm);
        }
      }
    }
  };

  var formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "mention"
  ];
  const handleProcedureContentChange = (content, delta, source, editor,e) => {
    //let has_attribues = delta.ops[1].attributes || "";
    //console.log(has_attribues);
    //const cursorPosition = e.quill.getSelection().index;
    // this.quill.insertText(cursorPosition, "★");
    //this.quill.setSelection(cursorPosition + 1);
    
    console.log((content))
    // setText(content)
    arearef.current.focus();
  };

  // const uu=JSON.parse(localStorage.getItem("ptn"))
  // console.log(uu)
  // console.log(uu.Name)
  // console.log(uu.Aadhar)

  const handleChange =()=>{
    console.log('in handle change ')
  
    console.log(document.querySelector(".ql-editor").innerHTML)
    

    let today = new Date().toLocaleDateString()
    // console.log(today)

    const uu=JSON.parse(localStorage.getItem("ptn"))
    const yy1=localStorage.getItem("medicines")
    console.log(yy1)
    console.log(uu)
    console.log(uu.Name)

    const pres={pcode:uu.Aadhar,prescription:"<b>"+today+":-"+"</b>"+document.querySelector(".ql-editor").innerHTML+"<br>"+"<b>"+"Medicines:"+"</b>"+yy1+"<hr>"}
    console.log(pres);

    // document.getElementById("output").innerHTML=(document.querySelector(".ql-editor").innerHTML);

        axios({        
            method:"POST",
            url:"http://localhost:3030/AddPrescription",
            data:pres
        })
        .then((res)=>{
            if(res.data.error1){
                console.log("UNABLE TO ADD PRESCRIPTION")
            }
            if(res.data.user){
                console.log(res.data.user)
                console.log("PRESCRIPTION ADDED")
            }
        })

  }
  // ---------------------------------------------------editor end -------------------------.

    const mys={
    fontFamily:'sans-serif',
    textAlign:'center',
    alignItems:'center',
    display:'flex',
    flexDirection:'column'
    }

    var new1=JSON.parse(localStorage.getItem("doctInfo"))
    var patList = new1.patients;
    // patList.unshift("");
    
    function createName(str,index){
      var namie = str.slice(0,str.length-13)

      function handleClick(e){
        console.log(e)
        console.log(document.querySelector(".lxj").innerHTML);
      }
      return(
        // <button className="lxj" key={index} onClick={handleClick} value={str}>{namie}</button>
      // <button className="lxj" onClick={handleClick} ></button>
      <></>
      )

    }
    var dat;
    var patid = patList[0];
    // console.log(patid)

    const [ppid,setppid] = useState(patid)

    function handleBClick(){
      patList.shift();
      // localStorage.setItem('patients', JSON.stringify(patList));
      localStorage.setItem("doctInfo",JSON.stringify({docname:new1.docname,hierarchy:new1.hierarchy,hospcode:new1.hospcode,hospname:new1.hospname,patients:patList,place:new1.place,qualification:new1.qualification,referrals:new1.referrals,username:new1.username,specialisation:new1.specialisation}))
      console.log("handle - "+patList);
      console.log("len"+patList.length)
      console.log(new1.username)
      console.log(ppid)
      const se={pcode:ppid,docusername:new1.username}
      console.log(se)
            //------------REMOVING PATIENT FROM LIST-------
            axios({
              method:"post",
              url:"http://localhost:3030/RemPat",
              data:se
            })
            .then((res)=>{
              if(res.data.error1){
                setError("FAILED TO REMOVE PATIENT")

              }
              if(res.data.success){
                console.log("PATIENT REMOVED")
              }
          })
      window.location.reload();

    }

    const [refdoc,setDoc]=useState("")

    // function handleRef(e){
    //   const va=e.target.value
    //   setDoc(va);
    // }

    function handleSubform(){

      console.log(jj.current.value)
      

      const se={pcode:JSON.parse(localStorage.getItem("ptn")).Name+"_"+JSON.parse(localStorage.getItem("ptn")).Aadhar,docusername:jj.current.value}
      console.log(se)
      axios({
          method:"POST",
          url:"http://localhost:3030/AddReferrals",
          data:se
      })
      .then((res)=>{
          if(res.data.error1){
              console.log("UNABLE TO REFER")
              setMes("")
              setError("UNABLE TO REFER")
          }
          if(res.data.error2){
              console.log("DOCTOR ID NOT FOUND")
              setMes("")
              setError("DOCTOR ID NOT FOUND") 
          }
          if(res.data.success){
            setError("")
            setMes("REFERRED TO "+jj.current.value)         
          }
      })
    }
    
    const [value, setValue] = useState('');
    // const autoin = document.querySelector(".autoinpu").value
    // --------
    // import './App.css'
    
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition
      
    const mic = new SpeechRecognition()
    
    mic.continuous = true
    mic.interimResults = true
    mic.lang = 'en-US'
    
    // function App() {
      const [isListening, setIsListening] = useState(false)
      const [note, setNote] = useState(null)
      const [savedNotes, setSavedNotes] = useState([])
    
      useEffect(() => {
        handleListen()
      }, [isListening])
    
      const handleListen = () => {
        if (isListening) {
          mic.start()
          mic.onend = () => {
            console.log('continue..')
            mic.start()
          }
        } else {
          mic.stop()
          mic.onend = () => {
            console.log('Stopped Mic on Click')
          }
        }
        mic.onstart = () => {
          console.log('Mics on')
        }
    
        mic.onresult = event => {
          const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('')
          console.log(transcript)
          setNote(transcript)
          mic.onerror = event => {
            console.log(event.error)
          }
        }
      }
    
      const handleSaveNote = () => {
        setSavedNotes([...savedNotes, note])
        setNote('')
      }
    // -------



    function findRec(e){
        e.preventDefault()

        const xd=JSON.parse(localStorage.getItem("ptn"))
        axios({
            method:"get",
            url:`http://localhost:3030/FindPatient/${xd.Aadhar}`
        })
        .then((res)=>{
            if(res.data.error1){
                console.log(res.data.error1)
            }
            if(res.data.user){
                console.log(res.data.user)
                
                document.querySelector('.prevPres').innerHTML=""
                for(let i=0;i<res.data.user.prescription.length;i++){
                    console.log(i)
                    document.querySelector('.prevPres').innerHTML+=res.data.user.prescription[i]
                  }

            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
      
  return (
    <div style={mys}>
      {/* <h1 className="hki">PATIENTS LIST</h1> */}
      {patList.map(createName)}
      {/* <fieldset className="fsett"> */}
      <h2 className="headin">PRESCRIPTION</h2>
      <hr></hr>
      <h6 className="iio">NAME: {hhh}</h6>
      <div className="fsett">
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        ref={arearef}
        value={text}
        onChange={handleProcedureContentChange}
      >
        <div className="my-editing-area" />
      </ReactQuill>  
         
      </div>


        <AutoCompleteWarp />
        
      <div className="sttxt">

      <hr className="horirule"></hr>   
      </div>
      <fieldset></fieldset>
      <div>
          {/* <h1>Voice Notes</h1> */}
          <div className="container">
            <div className="box">
              {/* <h2>Current Note</h2> */}
              {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
              <br></br>
              <button onClick={handleSaveNote} disabled={!note}>
                Save Note
              </button>
              <button onClick={() => setIsListening(prevState => !prevState)}>
                Start/Stop
              </button>
              <br></br>
              

              <textbox> <p>{note}</p></textbox>
             
            </div>
            <div className="box">
              <h2 className="headin">RECORDING</h2>
              {savedNotes.map(n => (
                <p key={n}>{n}</p>
              ))}
            </div>
          </div>
        </div>

      <div className="jox">
      <Link to="/Docdashboard"><Button className="fto2">BACK</Button></Link>
      <button className="fto1" onClick={handleChange}>SAVE</button>

      </div>
      <br></br>
      <hr className="qli"></hr>
      <div className="klop">
        <label className="ops" for="hj">REFER TO </label>
        <input id="hj" ref={jj} type="text" ></input>
        <button className="fto" onClick={handleSubform}>SUBMIT</button>
      </div>
      
      <div>


            <table className="table table-bordered">
                
                <thead>
                    <tr>                   
                    <th><button onClick={findRec}>MEDICAL HISTORY</button></th>
                    </tr>
                </thead>               
                </table>
                <p className="prevPres"></p>
            </div>


            
        </div>
  );
}

export default PatientShow;
