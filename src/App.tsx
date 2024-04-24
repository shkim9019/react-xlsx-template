import React from 'react';
import './App.css';
import ArrayExample from "./components/ArrayExample";
import JsonExample from "./components/JsonExample";

function App() {
    return (
    <div className="App flex flex-col justify-center items-center gap-20 p-20">
       <ArrayExample />
        <JsonExample />
    </div>
);
}

export default App;
