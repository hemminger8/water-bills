import { useState } from 'react';
import WaterBill from './WaterBill';

export default function WaterBills() {
    const [units, setUnits] = useState([]);
    const [selectedUnit, setSelectedUnit] = useState(0);

    function handleSubmit(e) {
        e.preventDefault();
        if (!units.find(unit => unit.address == e.target.elements.address.value)) {
            setUnits([ ...units, {key: e.target.elements.address.value, address: e.target.elements.address.value, tenant: e.target.elements.tenant.value}]);
            e.target.reset();
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
                />
            )}
        </>
    );
}