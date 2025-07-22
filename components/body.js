
import React from 'react';
import ReactDOM from 'react-dom/client';
import ApiCall from '../apicall/api';
import { useRef ,useState} from 'react';
import Solution from '../apicall/api';


function Body() {
    const apiInputRef = useRef(null);
   const [query,setquery] = useState(null);


   const handleApiInputKeyPress = (event) => {
    if (event.key === "Enter") {
        const inputValue = event.target.value;
        // console.log("API Key Entered:", inputValue);

       
    }
};
    const handletextInputkeyPress = (event)=>{
        if (event.key === "Enter") {
            const input = event.target.value;
            // console.log("Text Input Entered:", inputValue);
            if(input){
                setquery(input)
                event.target.value="";
            }
           
        }
    };


    return (
        <>
            <main>
                <div className="container">
                    <h1>AI your personal assisstent</h1>
                    <p>
                        "By using this webpage you will make own website with <br />
                        live view just in one minute"
                    </p>
                </div>
                <div className="api">
                    <input
                        type="text"
                        id="api"
                        placeholder="Enter your api key ...."
                        ref={apiInputRef}
                        onKeyPress={handleApiInputKeyPress}
                    />
                    <a href='https://aistudio.google.com/apikey'>
                    <button id="butapi" >
                        Get api
                    </button>
                    </a>
                </div>
                 <div className='api-call'>
                    <React.StrictMode>
                 <ApiCall apiKey={apiInputRef.current?.value} query={query} />
                 </React.StrictMode>
                   </div>

                <div className="text">
                    <input type="text" id="text" placeholder="Enter your query ...."  onKeyPress={handletextInputkeyPress}/>
                </div>
               
               
          
                
                
            </main>
        </>
    );
}

export default Body;