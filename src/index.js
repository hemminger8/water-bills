import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class WaterBills extends React.Component {
    render() {
        return (
            <h1>Water Bills</h1>
        );
    }
}


// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<WaterBills />);
