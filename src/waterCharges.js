export function calculateWaterCharges (daysOfService, usageCF) {
    const waterServRate = 9.61;
    const numberOfUnits = 4;
    const waterCommRate = 3.35;
    const stormwaterRate = 0.1687;
    const sewerServRate = 4.96;
    const sewerCommRate = 5.1;
    const cleanRiverRate = 0.1381;
    const equivResUnits = 2;
    const adminCharge = 500;

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

    return [
        {
            label: 'Water Service/Base Charge',
            amount: penniesToDollarsAndCents(waterServiceCharge),
        },
        {
            label: 'Water Commodity/Usage Charges',
            amount: penniesToDollarsAndCents(waterCommodityCharge),
        },
        {
            label: 'Stormwater Charges',
            amount: penniesToDollarsAndCents(stormwaterCharge),
        },
        {
            label: 'Sewer Service Charge',
            amount: penniesToDollarsAndCents(sewerServiceCharge),
        },
        {
            label: 'Sewer Usage',
            amount: penniesToDollarsAndCents(sewerUsageCharge),
        },
        {
            label: 'Clean River Fund',
            amount: penniesToDollarsAndCents(cleanRiverCharge),
        },
        {
            label: 'Administrative Fee',
            amount: penniesToDollarsAndCents(adminCharge),
        },
        {
            label: 'Current Water Charges',
            amount: penniesToDollarsAndCents(totalCharge),
        },
    ];
}