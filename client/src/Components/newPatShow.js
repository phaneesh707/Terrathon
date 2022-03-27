import React ,{useState,useRef} from "react";
// import Editor from "./editor";
import axios from 'axios'
import  { Component } from "react";
import ReactQuill from "react-quill";
import "quill-mention";
import "quill-mention/dist/quill.mention.css";
import {Alert} from 'react-bootstrap'
import "../css/PatientShow.css";

function PatientShow() {

  const [text,setText]=useState("");
  const [error,setError]=useState("")
  const [mes,setMes]=useState("")
  const jj=useRef()
  
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
    
    console.log((content))
    // setText(content)
    arearef.current.focus();
  };


  const handleChange =()=>{
    console.log('in handle change ')
  
    console.log(document.querySelector(".ql-editor").innerHTML)
    
    let today = new Date().toLocaleDateString()
    // console.log(today)
    const pres={pcode:patList[0],prescription:today+":-"+document.querySelector(".ql-editor").innerHTML}
    console.log(pres);

   

  }
  // ---------------------------------------------------editor end -------------------------.

    const mys={
        fontFamily:'sans-serif',
        textAlign:'center'
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
      <button className="lxj" onClick={handleClick} >{namie}</button>
      )

    }
    var dat;
    var patid = patList[0];
    console.log(patid)

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
      const se={pcode:patList[0],docusername:jj.current.value}
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

  return (
    <div style={mys}>
      <h1 className="hki">PATIENTS LIST</h1>
      {patList.map(createName)}
      <hr></hr>
      <fieldset className="fsett">
      <h2>ADD DETAILED DESRIPTION </h2>
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
      </fieldset>
      <div className="jox">
      <button className="fto1" onClick={handleChange}>SUBMIT</button>
      <button className="fto1" onClick={handleBClick}>NEXT PATIENT</button>
        
      </div>
      <br></br>
      <hr className="qli"></hr>
      <div className="klop">
        <label className="ops" for="hj">REFER TO </label>
        <input id="hj" ref={jj} type="text" ></input>
        <button className="fto" onClick={handleSubform}>SUBMIT</button>
      </div>
      {mes && <Alert variant="success">{mes}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
    </div>
  );
}

export default PatientShow;
