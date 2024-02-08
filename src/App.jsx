import React, { useState, useCallback, useEffect,useRef } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [Allownum, setAllownum] = useState(false);
  const [Allowchar, setAllowchar] = useState(false);
  const [password, setPassword] = useState('');

  //UseREF Hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWZYZabcdefghijklmnopqrestuvwzyz';

    if (Allownum) {
      str = str + '0123456789';
    }
    if (Allowchar) {
      str = str + '!@#$%^&*()_+{}';
    }

    for (let i = 1; i <= length; i++) {
      let char = (Math.floor(Math.random() * str.length));
      pass += str.charAt(char);
    }
    setPassword(pass);

  }, [length, Allownum, Allowchar]);

  const copyPasswordtoClipboard = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)

  },[password])
 
  useEffect(()=>{
    passwordGenerator()
  },[length, Allownum, Allowchar,passwordGenerator]
  )

  return (
    <>
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">

      <h1 className='text-center font-bold text-white my-2 mx-2'>Password Generator</h1>
      
       {/* Password Text Section*/}
      <section className=' flex shadow rounded-lg overflow-hidden mb-4'>
        <input
          className='outline-none w-full py-1 px-3'
          type='text'
          value={password}
          placeholder='Password'
          ref={passwordRef}
        />
        <button 
        onClick={copyPasswordtoClipboard}
        className='outline-none bg-blue-800 text-white shrink-0 py-1 px3'>
          Copy
        </button>
      </section>



        {/* Dependencies Section*/}
        <section className='flex text-sm gap-x-4'>    

          <div className='flex items-center gap-x-3'>

            <input
              type='range'
              min={8}
              max={20}
              value={length}
              className='cursor-pointer'
              onChange={(e)=>{setLength(e.target.value)}}

            />
            <label>Length:{length}</label>
            </div>

            <div className='flex items-center gap-x-3'>
            <input
              type='checkbox'
              defaultChecked={Allownum}
              id='NumberInput'
              onChange={()=>{
                setAllownum((Prev)=>!Prev)
              }}
            />
            <label htmlFor='NumberInput'>Number</label>
            </div>

            <div className='flex items-center gap-x-3'>
            <input
              type='checkbox'
              defaultChecked={Allowchar}
              id='CharacterInput'
              onChange={()=>{
                setAllowchar((Prev)=>!Prev)
              }}
            />
            <label htmlFor='CharacterInput'>Character</label>

            </div>
          
        </section>     
    </div>
    </>
  );
}

export default App;
