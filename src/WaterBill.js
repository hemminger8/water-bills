import { useState } from 'react';
import { differenceInCalendarDays } from 'date-fns';
import { calculateWaterCharges } from './waterCharges';

export default function WaterBill({ tenant, address }) {
    let helperDate = new Date();
    helperDate.setDate(1);
    const [toDate, setToDate] = useState(new Date(helperDate));
    helperDate.setMonth(helperDate.getMonth() - 1);
    const [fromDate, setFromDate] = useState(new Date(helperDate));
    const [startReading, setStartReading] = useState(0);
    const [endReading, setEndReading] = useState(0);

    const daysOfService = fromDate.valueOf() && toDate.valueOf() && differenceInCalendarDays(toDate, fromDate);
    const usageCF = endReading - startReading;

    const charges = calculateWaterCharges(daysOfService, usageCF);

    return (
        <>
            <h1>Water Bill</h1>
            <table>
                <tbody>
                    <tr>
                        <th>Tenant</th>
                        <td>{tenant}</td>
                    </tr>
                    <tr>
                        <th>Address</th>
                        <td>{address}</td>
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
                    {charges.map(charge => 
                        <tr key={charge.label}>
                            <th>{charge.label}</th>
                            <td>{charge.amount}</td>
                        </tr>
                    )}
                </tbody>

            </table>
        </>
    );
}

