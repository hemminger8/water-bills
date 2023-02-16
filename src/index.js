import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { differenceInCalendarDays } from 'date-fns';

class WaterBills extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fromDate: new Date('1/5/23'),
            toDate: new Date('2/2/23'),
            startReading: 266556,
            endReading: 267043,
        };
    }

    penniesToDollarsAndCents(p) {
        const char = p.toString().split('');
        return '$' + [...char.slice(0,-2), '.', ...char.slice(-2)].join('');
    }

    render() {
        const waterServRate = 9.61;
        const numberOfUnits = 4;
        const waterCommRate = 3.35;
        const stormwaterRate = 0.1687;
        const sewerServRate = 4.96;
        const sewerCommRate = 5.1;
        const cleanRiverRate = 0.1381;
        const equivResUnits = 2;

        const daysOfService = this.state.fromDate.valueOf() && this.state.toDate.valueOf() && differenceInCalendarDays(this.state.toDate, this.state.fromDate);
        const usageCF = this.state.endReading - this.state.startReading;
        const waterServiceCharge = Math.round(waterServRate * daysOfService / 30 / numberOfUnits * 100);
        const waterCommodityCharge = Math.round(waterCommRate * usageCF);
        const stormwaterCharge = Math.round(stormwaterRate * daysOfService * equivResUnits / numberOfUnits * 100);
        const sewerServiceCharge = Math.round(sewerServRate * daysOfService / 30 / numberOfUnits * 100);
        const sewerUsageCharge = Math.round(sewerCommRate * usageCF);
        const cleanRiverCharge = Math.round(cleanRiverRate * daysOfService * equivResUnits / numberOfUnits * 100);
        const adminCharge = 500;
        const totalCharge = waterServiceCharge + waterCommodityCharge + stormwaterCharge + sewerServiceCharge + sewerUsageCharge + cleanRiverCharge + adminCharge;

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
                            <td>
                                <input 
                                    placeholder={this.state.fromDate.toLocaleDateString()}
                                    onBlur={(e) => e.target.value && this.setState({fromDate: new Date(e.target.value)})}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Service Period To</th>
                            <td>
                                <input 
                                    placeholder={this.state.toDate.toLocaleDateString()}
                                    onBlur={(e) => e.target.value && this.setState({toDate: new Date(e.target.value)})}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Days of Service</th>
                            <td>{daysOfService}</td>
                        </tr>
                        <tr>
                            <th>Starting Reading (CF)</th>
                            <td>
                                <input
                                    placeholder={this.state.startReading}
                                    onChange={(e) => this.setState({startReading: e.target.value})}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Ending Reading (CF)</th>
                            <td>
                                <input
                                    placeholder={this.state.endReading}
                                    onChange={(e) => this.setState({endReading: e.target.value})}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Usage (CF)</th>
                            <td>{usageCF}</td>
                        </tr>
                        <tr>
                            <th>Usage (CCF) (1 CCF = 100 CF)</th>
                            <td>{usageCF / 100}</td>
                        </tr>
                        <tr>
                            <th>Water Service/Base Charge</th>
                            <td>{this.penniesToDollarsAndCents(waterServiceCharge)}</td>
                        </tr>
                        <tr>
                            <th>Water Commodity/Usage Charges</th>
                            <td>{this.penniesToDollarsAndCents(waterCommodityCharge)}</td>
                        </tr>
                        <tr>
                            <th>Stormwater Charges</th>
                            <td>{this.penniesToDollarsAndCents(stormwaterCharge)}</td>
                        </tr>
                        <tr>
                            <th>Sewer Service Charge</th>
                            <td>{this.penniesToDollarsAndCents(sewerServiceCharge)}</td>
                        </tr>
                        <tr>
                            <th>Sewer Usage</th>
                            <td>{this.penniesToDollarsAndCents(sewerUsageCharge)}</td>
                        </tr>
                        <tr>
                            <th>Clean River Fund</th>
                            <td>{this.penniesToDollarsAndCents(cleanRiverCharge)}</td>
                        </tr>
                        <tr>
                            <th>Administrative Fee</th>
                            <td>{this.penniesToDollarsAndCents(adminCharge)}</td>
                        </tr>
                        <tr>
                            <th>Current Water Charges</th>
                            <td>{this.penniesToDollarsAndCents(totalCharge)}</td>
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
