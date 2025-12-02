import React, { useState, useEffect } from 'react';

const flavorOptions = [
     {
        value: 'Limited Edition Snickerdoodle',
        label: 'Limited Edition Snickerdoodle',
        subText: 'Sugar, spice, and a glassful of nice!',
        color: '#F0AB53',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0677/0537/2962/files/Tiny_Template_-_Snickerdoodle.png?v=1764714539',
        textColor: '#FFFFFF',
    },
      {
        value: 'Limited Edition Almond Sponge Cake',
        label: 'Limited Edition Almond Sponge Cake',
        subText: 'Sophisticated almond infused into moist golden sponge cake',
        color: '#D4782C',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0677/0537/2962/files/Tiny_-_Almond_Sponge_Cake.png?v=1745260054',
        textColor: '#FFFFFF',
    },
 {
        value: 'Variety Pack #1',
        label: 'Variety Pack #1',
        subText: 'Includes Cookie, Jelly Donut, Brownie, and Thin Mint liquors',
        color: '#87c8d5',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0677/0537/2962/files/Tiny_-_Flavor_Adventure_w_Shadow.png?v=1718393167',
        textColor: '#7C0101',
    },
     {
        value: 'Thin Mint',
        label: 'Thin Mint',
          subText: 'Luscious chocolate cookie meets spearmint freshness',
        color: '#27b376',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0677/0537/2962/files/Tiny_-_Thin_Mint.png?v=1718393168',
        textColor: '#7C0101',
     },
    {
        value: 'Limited Edition Blueberry Pie',
        label: 'Limited Edition Blueberry Pie',
        subText: 'A blueberry treat that is perfect for summer!',
        color: '#4E70B6',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0677/0537/2962/files/tiny-blueberry_pie.png?v=1722450830',
        textColor: '#FFFFFF',
    },
      {
        value: 'Limited Edition Salted Caramel Chocolate Truffle',
        label: 'Limited Edition Salted Caramel Chocolate Truffle',
        subText: 'Luscious chocolate cookie meets spearmint freshness',
        color: '#A71E22',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0677/0537/2962/files/Tiny_-_Salted_Caramel.png?v=1742827765',
        textColor: '#FFFFFF',
    },
      {
        value: 'Limited Edition Cinnamon Roll',
        label: 'Limited Edition Cinnamon Roll',
        subText: 'Gooey goodness, cinnamon swirling with icing',
        color: '#490406',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0677/0537/2962/files/Tiny_-_Cinnamon_Roll-min.png?v=1730916075',
        textColor: '#FFFFFF',
    },
];


const CustomSelect = ({ label, onSelect, defaultText }) => {
    const [selected, setSelected] = useState({ label: defaultText || "Select flavor", color: "white", textColor: "#7C0101" });
    const [isPopupOpen, setIsPopupOpen] = useState(false);
  
    const handleSelect = (flavor) => {
        setSelected(flavor);
        setIsPopupOpen(false);
        onSelect(flavor.label);
    };

    const handleTogglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    useEffect(() => {
        document.body.style.overflow = isPopupOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isPopupOpen]);

    return (
        <div className="relative w-full select-container">
            <label className="block mb-1 text-center">{label}</label>
            <div
                className="text-[.95rem] border-2 border-[#7C0101] p-2 cursor-pointer text-center font-bold h-[68px] flex items-center justify-center"
                style={{ backgroundColor: selected.color, color: selected.textColor }}
                onClick={handleTogglePopup}
            >
                {selected.label}
            </div>

            {isPopupOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '90%',
                        maxWidth: '360px',
                        height: '60vh',
                        zIndex: 9999,
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        backgroundColor: 'transparent',
                    }}
                >
                    <div
                        style={{
                            width: '100%',
                            backgroundColor: '#15C5D8',
                            padding: '10px 0',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                        }}
                    >
                        <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#FFFFFF', margin: 0 }}>Select your flavor</h2>
                        <button
                            onClick={handleClosePopup}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                right: '10px',
                                transform: 'translateY(-50%)',
                                border: 'none',
                                background: 'none',
                                color: '#FFFFFF',
                                fontSize: '20px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                            }}
                        >
                            &times;
                        </button>
                    </div>
                    <div
                        style={{
                            padding: '10px 0',
                            backgroundColor: 'transparent',
                            overflowY: 'auto',
                            flex: 1,
                        }}
                    >
                        {flavorOptions.map((flavor) => (
                            <div
                                key={flavor.value}
                                style={{
                                    backgroundColor: flavor.color,
                                    color: flavor.textColor,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '5px',
                                    marginBottom: '0',
                                }}
                                onClick={() => handleSelect(flavor)}
                            >
                                <img
                                    src={flavor.imageUrl}
                                    alt={flavor.label}
                                    style={{
                                        width: '75px',
                                        height: '75px',
                                        marginRight: '10px',
                                        borderRadius: '5px',
                                    }}
                                />
                                <div>
                                    <strong>{flavor.label}</strong>
                                    <p style={{ fontSize: '18px', margin: 0 }}>{flavor.subText}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomSelect;
