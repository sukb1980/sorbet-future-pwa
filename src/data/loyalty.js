export const loyaltyTiers = [
    { id: "bronze", minPoints: 0, benefits: ["Earn points"] },
    { id: "silver", minPoints: 1000, benefits: ["Priority booking", "Exclusive offers"] },
    { id: "gold", minPoints: 2000, benefits: ["Priority booking", "Birthday reward", "Tier boosts"] }
];

export const loyaltyTransactions = [
    {
        id: "trans-01",
        date: "2026-03-15",
        type: "Earn",
        points: 85,
        description: "Service: Hydro Facial"
    }
];

export const promos = [
    {
        id: "promo-01",
        title: "Autumn Glow Bundle",
        description: "Book Hydro Glow Facial and receive 20% off Hydra Renewal Serum",
        type: "bundle",
        validUntil: "2026-06-01",
        visibility: ["Silver", "Gold"],
        storeId: ["store-01"]
    }
];
