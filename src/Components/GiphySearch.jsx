import { useState, useEffect } from "react"
import { useRef } from "react";
import axios from "axios"

//component from another file
import { Loading } from "./Loading"

//css import
import '../giphy.css'

//images
import pencil from "../images/pencil.jpg"
import photoFrame from "../images/photo.jpg"
import videoCam from "../images/videoCam.jpg"
import profilePic from "../images/profile.jpg"
import eventlogo from "../images/eventlogo.jpg"
import locationlogo from "../images/locationlogo.jpg"
import taglogo from "../images/taglogo.jpg"
import giflogo from "../images/gificon.jpg"


export const GiphySearch = () =>{

    //All usestate

    const [gifResults, setgifResults] = useState([])
    const [isloading, setisLoading] = useState(false)
    const [content, setContent] = useState([])
    const [toggle, setToggle] = useState(false)

    //to fetch tending gifs and display here

    useEffect(()=>{
        const fetchData = async() =>{
            setisLoading(true)
              const results =  await axios("https:api.giphy.com/v1/gifs/trending", {
                params:{
                    api_key: "BjARaKrdtIJIubjjklkQoN3hupj2CYLi", 
                    limit: 1,
                 }
                })
                console.log(results, "trending")
                setgifResults(results.data.data)
                setisLoading(false)
            }
            fetchData()
        }, [])

        const pushImage=(e)=>{
            setContent(e.target.src)
            console.log(content, "content")
        }

        
        const appendImage = () =>{
            {
                return ( <div>
                    <img src={content} alt="" />
                </div> )
            }  
        }

        //to render images for the search query

        const renderGifs = () =>{
            if(isloading){
                return <Loading></Loading>
            }  
            return gifResults.map(e=>{
                return ( <div>
                            <div key = {e.id} className="gif" >
                                 <div onClick={pushImage}> <img className="individual-img" src={e.images.fixed_height.url} alt="" /></div> 
                            </div>
                            </div>
                )
            })
        }


        const disp = () =>{
            {
            return ( <div>
                        <div className="disp-container" >
                                    <div className="arrow"></div>
                                    <div className="popup" >
                                        <input className="input" placeholder="Search for GIFs" onChange={handleChange} type="text" />
                                        <div className="container-gifs" >{renderGifs()}</div>
                                    </div>
                        </div>

                     </div>
                    )
                }
        }

        
        let timeId=useRef();
        const debounce=(fn,time)=>{
            return function(){
                if(timeId.current){
                    clearTimeout(timeId.current);
                }
                timeId.current=setTimeout(()=>{
                fn();
                },time);
            }();
        }

            //to fetch data from giphy

        const handleChange = (e) =>{
            setisLoading(true)
            debounce(()=>{
                axios.get("https://api.giphy.com/v1/gifs/search", {
                params:{
                    api_key: "BjARaKrdtIJIubjjklkQoN3hupj2CYLi",
                    q: e.target.value,
                }
            }).then(function(response){
                console.log(response.data.data)
                setgifResults(response.data.data)
                console.log(response, "gifresults")
                setisLoading(false)
            })
            },600)
        }

        const closePopup = () => {
            setToggle(current=> !current)
        }
  
           
    return( 
        <div>
            <div className="container">

                <div className="three-sections" >

                    <div className="single-section">
                        <img className="pencil-logo" src={pencil} alt="" />
                        <p>Compose Post</p>
                    </div>

                    <div className="vertical-line"></div>
                    <div className="single-section" >
                        <img className="individual-logo" src={photoFrame} alt="" />
                        <p>Photo/Video Album</p>
                    </div>

                    <div className="vertical-line"></div>
                    <div className="single-section" >
                        <img className="videocam-logo" src={videoCam} alt="" />
                        <p>Live Video</p>
                    </div>

                </div>
           
                <div className="input-area">
                    <div className="profile-pic"><img src={profilePic} alt="" /></div>
                    <div contentEditable data-ph="Write something here"></div>
                </div>

                {/* selected image gets added in status*/}

                <div >{appendImage()}</div>
            
       
                <div className="status-options">

                    <div className="first-row">

                        <div className="tag-friends">
                            <div><img className="taglogo" src={taglogo} alt="" /></div>
                            <div> Tag friends</div>
                        </div>
                    
                        <div className="check-in">
                            <img className="locationlogo"  src={locationlogo} alt="" />
                            <div >Check in</div>
                        </div>
                        
                    </div>

                    <div className="second-row"> 
                        
                        <div className="GIF" onClick={closePopup} > 
                            <div><img className="giflogo" src={giflogo} alt="" /></div>
                            <div>GIF</div>  
                        </div>

                        <div className="tag-event" >  
                            <div><img className="eventlogo" src={eventlogo} alt="" /></div>
                            <div>Tag Event</div>
                        </div>
                    </div>

                </div>

                    <div>
                        {toggle && <div className="gif-container" > {disp()} </div>}           
                    </div>
          
            </div>

        </div>   
    )
}






