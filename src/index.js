import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class WaterBills extends React.Component {
    render() {
        return (
            <>
                <h1>Water Bill</h1>
                <table>
                    <tbody>
                        <tr>
                            <th>Tenant</th>
                            <td>Keirra</td>
                        </tr>
                        <tr>
                            <th>Address</th>
                            <td>931 Hidden Acres</td>
                        </tr>
                        <tr>
                            <th>Service Period From</th>
                            <td>1/5/2023</td>
                        </tr>
                        <tr>
                            <th>Service Period To</th>
                            <td>2/2/2023</td>
                        </tr>
                        <tr>
                            <th>Days of Service</th>
                            <td>28</td>
                        </tr>
                        <tr>
                            <th>Starting Reading (CF)</th>
                            <td>266,556</td>
                        </tr>
                        <tr>
                            <th>Ending Reading (CF)</th>
                            <td>267,042</td>
                        </tr>
                        <tr>
                            <th>Usage (CF)</th>
                            <td>487</td>
                        </tr>
                        <tr>
                            <th>Usage (CCF) (1 CCF = 100 CF)</th>
                            <td>4.87</td>
                        </tr>
                        <tr>
                            <th>Water Service/Base Charge</th>
                            <td>$2.24</td>
                        </tr>
                        <tr>
                            <th>Water Commodity/Usage Charges</th>
                            <td>$16.31</td>
                        </tr>
                        <tr>
                            <th>Stormwater Charges</th>
                            <td>$2.36</td>
                        </tr>
                        <tr>
                            <th>Sewer Service Charge</th>
                            <td>$1.16</td>
                        </tr>
                        <tr>
                            <th>Sewer Usage</th>
                            <td>$24.83</td>
                        </tr>
                        <tr>
                            <th>Clean River Fund</th>
                            <td>$1.94</td>
                        </tr>
                        <tr>
                            <th>Administrative Fee</th>
                            <td>$5.00</td>
                        </tr>
                        <tr>
                            <th>Current Water Charges</th>
                            <td>$53.83</td>
                        </tr>
                    </tbody>

                </table>
                </>
        );
    }
}


// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<WaterBills />);
