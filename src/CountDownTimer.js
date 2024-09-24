import React, { useState } from 'react'

function CountDownTimer() {

    // state Management
    const [count , setCount] = useState(0);
    const [history , setHistory] = useState([]);
    const [undoStack , setUndoStack] = useState([])
    const [redoStack , setRedoStack] = useState([])

    // add a new action in history
    const addActionToHistory = (action , after , before) =>{
         setHistory([...history , `${action} ( ${before} -> ${after} ) `])
         if(history.length >= 50){
            setHistory((prev) => prev.slice(1));
         }
    }

    // increment or decrement count 
    const handleChangeCount = (value) =>{
        const before = count;
        const after = count + value;
        setCount(after);
        addActionToHistory( value > 0  ? `+${value}` : `${value}` ,  before ,after)
        setUndoStack([...undoStack , value]);
        setRedoStack([]);

    }

    // undoStack functionality
    const handleUndoStack = ()=>{
        if(undoStack.length > 0){
         const lastAction = undoStack.pop()
         const  before = count;
         const after = count - lastAction;
         setCount(after)
         setUndoStack([ ...undoStack]) // remove the last action in undo
         setRedoStack([...redoStack , lastAction]) // add the last action in redo
         addActionToHistory(`undo ${lastAction > 0 ? `+${lastAction}`: lastAction  }` , after , before)

        }
    }

     // redoStack functionality
     const handleRedoStack = ()=>{
        if(redoStack.length > 0){
         const lastAction = redoStack.pop()
         const  before = count;
         const after = count + lastAction;
         setCount(after)
         setUndoStack([...undoStack , lastAction]) // add the last action in undo stack
         setRedoStack([...redoStack ])
         addActionToHistory(`redo ${lastAction > 0 ? `+${lastAction}`: lastAction  }` , after , before)

        }
    }



  return (
    <div style={{marginTop:20 , textAlign:"center"}}>

     {/* undo and redo buttons */}
     <div style={{marginTop:20}}>
     <button onClick={handleUndoStack} disabled={undoStack.length === 0}>Undo</button>
     <button onClick={handleRedoStack} disabled={redoStack.length === 0}>Redo</button>
     </div>

      {/*  increment and decrement button */}
      <div style={{marginTop:20}}>
      <button onClick={()=>handleChangeCount(1)}>1</button>
      <button onClick={()=>handleChangeCount(10)}>+10</button>
      <button onClick={()=>handleChangeCount(100)}>+100</button>

      <h1>Counter : {count}</h1>

      <button onClick={()=>handleChangeCount(-1)}>-1</button>
      <button onClick={()=>handleChangeCount(-10)}>-10</button>
      <button onClick={()=>handleChangeCount(-100)}>-100</button>

      </div>

      {/* history */}
      <h1>History </h1>
      <div style={{
        marginTop:20,
        padding:20,
        borderRadius:5,
        border:"1px solid black"
      }}>

       <div>
       {history.map((value , index) => (
        <div key={index}>{value}</div>
       ))}
       </div>

      </div>




    </div>
  )
}

export default CountDownTimer