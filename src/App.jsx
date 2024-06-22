import { useState,useCallback,useEffect,useRef } from 'react'
import './App.css'


function App() {
  const [length,setLength]=useState(8);
  const [number,setnumberAllowed]=useState(false);
  const [chracters,setChracter]=useState(false);
  const [password,setPassword]=useState();

  //Reference hook
  const passwordRef=useRef(null);
  // GENERATING PASSWORD
  const passwordGenerator=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
     if(number)str+="0123456789"
     if(chracters)str+="!@#$%^&*()"

     for (let i = 1; i <=length; i++) {
      let char=Math.floor(Math.random()*str.length+1) ;
      pass+=str.charAt(char);
      
    }
    
    

    setPassword(pass);
    
  },[length,number,chracters,setPassword]);

  const copypasswordToclik=useCallback(()=>{
      passwordRef.current?.select();
      window.navigator.clipboard.writeText(password)
  },[password])

  // function copypasswordToclik(){
  //   window.navigator.clipboard.writeText(password)
  // }

  useEffect(()=>{
    passwordGenerator()
  },[length,number,chracters,passwordGenerator])

  
 

  return (
    <>
     <div className='w-full max-w-md mx-auto  shadow-md rounded-lg px-4 py-2 my-12 text-orange-500 bg-gray-800'>Password Generator
        <div className='flex shadow-rounded-lg overflow-hidden mb-4'>
           <input type='text' value={password} className='outline-none w-full py-1 px-3' placeholder='password' readOnly  ref={passwordRef}   />
           <button onClick={copypasswordToclik} 
            className='outline-none bg-blue-700 px-3 py-0.5 shrink-0'>Copy</button>
        </div>
         
            <div className='flex text-sm gap-x-4'>

                <div className='flex items-center gap-x-1'>
                   <input 
                   type='range'
                    min={6}
                    max={30}
                    value={length}
                    className='cursor-pointer'
                    onChange={(e)=>{setLength(e.target.value)}}/>
                   <label>length:{length}</label>
                </div>

                   <div className='flex items-center gap-x-1 '>
                   <input 
                    type='checkbox'
                    defaultChecked={number}
                    id='numberInput'
                    onChange={()=>{setnumberAllowed((prev)=>!prev);
                    }}
                   />
                   <label htmlFor='numberInput'>Numbers:</label>
                  </div>


                  <div className='flex items-center gap-x-1'>
                   <input 
                    type='checkbox'
                    defaultChecked={chracters}
                    id='chracterInput'
                    onChange={()=>{setChracter((prev)=>!prev);
                    }}
                    />
                    <label htmlFor='chracterInput'>Chracter:</label>
                </div>









           </div>
     </div>
    </>
  )
}

export default App
