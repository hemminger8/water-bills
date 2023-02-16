import { useState } from 'react';
import WaterBill from './WaterBill';

export default function WaterBills() {
    const [units, setUnits] = useState([]);
    const [selectedUnit, setSelectedUnit] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();
        if (!units.find(unit => unit.address == e.target.elements.address.value)) {
            setUnits([ 
                ...units, 
                {
                    key: e.target.elements.address.value, 
                    address: e.target.elements.address.value, 
                    tenant: e.target.elements.tenant.value, 
                    bills: []
                }
            ]);
            e.target.reset();
        }
    }

    function handleSave(bill) {
        const bills = units[selectedUnit].bills;
        // let newBills;
        if (!bills.find(oldBill => oldBill.key == bill.key)) {
            setUnits([...units.slice(0,selectedUnit), 
                {...units[selectedUnit], bills: units[selectedUnit].bills.concat(bill)}, 
                ...units.slice(selectedUnit + 1),
            ]);
            setSelectedUnit(null);
        }
    }

    return (
        <>
            <nav>
                <hr />
                THE WATER WORKS
                <hr />
                <ol>
                    {units.map((unit, i) => 
                        <li key={unit.address} style={{fontWeight: (selectedUnit == i ? 'bold' : 'normal')}}>
                            <button onClick={() => setSelectedUnit(i)}>
                                {unit.address}
                            </button>
                            {unit.bills.length > 0 &&
                                <ul>
                                    {unit.bills.map(bill => 
                                        <li key={bill.key}>{bill.toDate}</li>
                                    )}
                                </ul>
                            }
                        </li>
                    )}
                </ol>
                <form onSubmit={handleSubmit}>
                    <input placeholder='New Tenant' name='tenant'></input>
                    <input placeholder='New Address' name='address'></input>
                    <button>Add</button>
                </form>
            </nav>
            {units[selectedUnit] && (
                <WaterBill 
                    key={units[selectedUnit].address}
                    tenant={units[selectedUnit].tenant} 
                    address={units[selectedUnit].address} 
                    onSave={handleSave}
                />
            )}
        </>
    );
}