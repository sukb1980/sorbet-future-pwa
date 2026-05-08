export const productCategories = [
    { id: "pcat-skin", name: "Skin" },
    { id: "pcat-nails", name: "Nails" }
];

export const products = [
    {
        id: "prd-serum-hydra",
        name: "Hydra Renewal Serum",
        brand: "Sorbet Skin",
        category: "pcat-skin",
        concerns: ["dryness"],
        skinType: "Dry",
        price: { ZAR: 420, BWP: 305, MUR: 1150 },
        stockByStore: {
            "store-01": 15,
            "store-02": 4,
            "store-mw-01": 0
        },
        alternatives: ["prd-serum-barrier"],
        image: "/images/products/serum-hydra.jpg",
        description: "Hydrating serum for dull, dehydrated skin."
    },
    {
        id: "prd-nail-oil",
        name: "Nourish Cuticle Oil",
        brand: "Sorbet Nails",
        category: "pcat-nails",
        concerns: ["brittle-nails"],
        price: { ZAR: 120, BWP: 85, MUR: 340 },
        stockByStore: {
            "store-01": 20,
            "store-02": 12,
            "store-mw-01": 5
        },
        image: "/images/products/nail-oil.jpg",
        description: "Daily care oil for healthy nails and cuticles."
    }
];
