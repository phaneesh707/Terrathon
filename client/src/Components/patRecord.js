import React , {useEffect,useRef,useState} from "react"
import axios from "axios"
// import AlternateTimeline from "./TimeLine"

const lo=[]
export default function PatientRecord(){

    const c=useRef()
    function findRec(e){
        e.preventDefault()
        
        
        axios({
            method:"get",
            url:`http://localhost:3030/FindPatient/${c.current.value}`
        })
        .then((res)=>{
            if(res.data.error1){
                console.log(res.data.error1)
            }
            if(res.data.user){
                console.log(res.data.user)
                
                document.querySelector('.prevPres').innerHTML=""
                for(let i=0;i<res.data.user.prescription.length;i++){
                    // console.log(i)

                    const jj=new Object({date:res.data.user.prescription[i].slice(0,9),pres:res.data.user.prescription[i].slice(11,res.data.user.prescription[i].length)})
                    lo.push(jj)
                    document.querySelector('.prevPres').innerHTML+=res.data.user.prescription[i]
                  }
                console.log("lo inside",lo)
                console.log(res.data.user.prescription[0].slice(0,9))
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    console.log(lo)
    function Timme(){

    }

    console.log("lo",lo);
    // const tabu = lo.map((item)=><tr><td>{item.date}</td><td>{item.pres}</td></tr>)
    // console.log("tabu",tabu)

    return(
        <div>
            <div>
                <h2>AADHAR NUMBER</h2>
                <form onSubmit={findRec}>
                    <input type="text" ref={c}></input>
                    <br></br>
                    <input type="submit" value="FETCH RECORDS"></input>
                </form>
            </div>
           
            <div>
              
            </div>
            <div>

            <hr></hr>
            <h2 style={{color:"blue"}}>MEDICAL HISTORY</h2>
            {}
            {/* <table >
                <tbody>
                    <tr>
 
                    <td>
                        Date
                    </td>
                    <td>
                        Prescription
                    </td>
                    </tr>
                </tbody>
                <tbody>
                
                <tr>
                    <td>
                    </td>
                    <td>
                    </td>
                </tr>

          
                </tbody>
               
            </table> */}


                <p className="prevPres"></p>
                <div>
            
                </div>
            </div>

        

            
        </div>
    )
}