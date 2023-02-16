import { useState } from 'react';
import { differenceInCalendarDays } from 'date-fns';

export default function WaterBills() {
    const [fromDate, setFromDate] = useState(new Date('1/5/23'));
    const [toDate, setToDate] = useState(new Date('2/2/23'));
    const [startReading, setStartReading] = useState(266556);
    const [endReading, setEndReading] = useState(267043);

    const waterServRate = 9.61;
    const numberOfUnits = 4;
    const waterCommRate = 3.35;
    const stormwaterRate = 0.1687;
    const sewerServRate = 4.96;
    const sewerCommRate = 5.1;
    const cleanRiverRate = 0.1381;
    const equivResUnits = 2;
    const adminCharge = 500;

    const daysOfService = fromDate.valueOf() && toDate.valueOf() && differenceInCalendarDays(toDate, fromDate);
    const usageCF = endReading - startReading;
    const waterServiceCharge = Math.round(waterServRate * daysOfService / 30 / numberOfUnits * 100);
    const waterCommodityCharge = Math.round(waterCommRate * usageCF);
    const stormwaterCharge = Math.round(stormwaterRate * daysOfService * equivResUnits / numberOfUnits * 100);
    const sewerServiceCharge = Math.round(sewerServRate * daysOfService / 30 / numberOfUnits * 100);
    const sewerUsageCharge = Math.round(sewerCommRate * usageCF);
    const cleanRiverCharge = Math.round(cleanRiverRate * daysOfService * equivResUnits / numberOfUnits * 100);
    const totalCharge = waterServiceCharge + waterCommodityCharge + stormwaterCharge + sewerServiceCharge + sewerUsageCharge + cleanRiverCharge + adminCharge;

    function penniesToDollarsAndCents(p) {
        const char = p.toString().split('');
        return '$' + [...char.slice(0,-2), '.', ...char.slice(-2)].join('');
    }

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
                                placeholder={fromDate.toLocaleDateString()}
                                onBlur={(e) => e.target.value && setFromDate(new Date(e.target.value))}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Service Period To</th>
                        <td>
                            <input 
                                placeholder={toDate.toLocaleDateString()}
                                onBlur={(e) => e.target.value && setToDate(new Date(e.target.value))}
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
                                placeholder={startReading}
                                onChange={(e) => setStartReading(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Ending Reading (CF)</th>
                        <td>
                            <input
                                placeholder={endReading}
                                onChange={(e) => setEndReading(e.target.value)}
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
                        <td>{penniesToDollarsAndCents(waterServiceCharge)}</td>
                    </tr>
                    <tr>
                        <th>Water Commodity/Usage Charges</th>
                        <td>{penniesToDollarsAndCents(waterCommodityCharge)}</td>
                    </tr>
                    <tr>
                        <th>Stormwater Charges</th>
                        <td>{penniesToDollarsAndCents(stormwaterCharge)}</td>
                    </tr>
                    <tr>
                        <th>Sewer Service Charge</th>
                        <td>{penniesToDollarsAndCents(sewerServiceCharge)}</td>
                    </tr>
                    <tr>
                        <th>Sewer Usage</th>
                        <td>{penniesToDollarsAndCents(sewerUsageCharge)}</td>
                    </tr>
                    <tr>
                        <th>Clean River Fund</th>
                        <td>{penniesToDollarsAndCents(cleanRiverCharge)}</td>
                    </tr>
                    <tr>
                        <th>Administrative Fee</th>
                        <td>{penniesToDollarsAndCents(adminCharge)}</td>
                    </tr>
                    <tr>
                        <th>Current Water Charges</th>
                        <td>{penniesToDollarsAndCents(totalCharge)}</td>
                    </tr>
                </tbody>

            </table>
        </>
    );
}

