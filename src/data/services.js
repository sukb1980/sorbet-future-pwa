export const serviceCategories = [
    {
        id: "cat-skin",
        name: "Skin",
        subcategories: [
            {
                id: "sub-facials",
                name: "Facials",
                services: [
                    {
                        id: "srv-facial-hydra",
                        name: "Hydro Facial",
                        description: "Deep hydration and radiance facial.",
                        durationMin: 60,
                        price: { ZAR: 850, BWP: 620, MUR: 2400 },
                        addOns: ["srv-led-therapy"],
                        aftercareProducts: ["prd-serum-hydra"],
                        recommendedCadenceDays: 30
                    }
                ]
            }
        ]
    }
];

export const citizens = [
    {
        id: "cit-01",
        name: "Maria R.",
        skills: ["srv-facial-hydra", "srv-led-therapy"],
        rating: 4.8
    },
    {
        id: "cit-02",
        name: "Tia L.",
        skills: ["srv-nail-gel", "srv-nail-polish"],
        rating: 4.9
    }
];

export const availability = [
    {
        storeId: "store-01",
        citizenId: "cit-01",
        serviceId: "srv-facial-hydra",
        slots: [
            { date: "2026-04-09", period: "Morning", time: "09:30", available: true },
            { date: "2026-04-09", period: "Afternoon", time: "14:00", available: true },
            { date: "2026-04-10", period: "Evening", time: "18:00", available: false }
        ]
    }
];
