import React, { useState, useEffect } from 'react';

const flavorOptions = [


    {
        value: 'Variety Pack #1',
        label: 'Variety Pack #1',
        subText: 'Includes Cookie, Jelly Donut, Brownie, and Thin Mint liquors',
        color: '#87c8d5',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0677/0537/2962/files/Tiny_-_Flavor_Adventure_w_Shadow.png?v=1718393167',
        textColor: '#7C0101',
        product_id: '9342358421794',
    },
    {
        value: 'Jelly Donut',
        label: 'Jelly Donut',
        subText: 'Jam-filled joyride with bursts of raspberry jam and fluffy donut',
        color: '#e27b9c',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0677/0537/2962/files/Tiny_-_Jelly_Donut.png?v=1718393168',
        textColor: '#7C0101',
        product_id: '9342359044386',
    },
    {
        value: 'Chocolate Chip Cookie',
        label: 'Chocolate Chip Cookie',
        subText: 'A perfect ratio of chocolate chips to golden, buttery cookie',
        color: '#e88b37',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0677/0537/2962/files/Tiny_-_Cookie_Box.png?v=1718393167',
        textColor: '#7C0101',
        product_id: '9342357668130',
    },
      {
        value: 'Thin Mint',
        label: 'Thin Mint',
        subText: 'Luscious chocolate cookie meets spearmint freshness',
        color: '#27b376',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0677/0537/2962/files/Tiny_-_Thin_Mint.png?v=1718393168',
        textColor: '#7C0101',
        product_id: '9342359601442',
    },
];


const CustomSelect = ({ label, onSelect, defaultText }) => {
  const [selected, setSelected] = useState({ label: defaultText || "Select flavor", color: "white", textColor: "#7C0101" });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [inventory, setInventory] = useState({});

   useEffect(() => {
    const fetchInventory = async () => {
  try {
    const response = await fetch("https://shopify-inventory-server.netlify.app/.netlify/functions/getIDS");
    const data = await response.json();
    console.log("Fetched Inventory Data:", data); // Debug log
    const inventoryMap = data.reduce((acc, item) => {
      acc[item.id] = item.inventory_quantity || "N/A";
      return acc;
    }, {});
    setInventory(inventoryMap);
  } catch (error) {
    console.error("Error fetching inventory:", error);
  }
};

    fetchInventory();
  }, []);

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
    if (isPopupOpen) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
      document.body.style.overflow = ''; // Re-enable scrolling
    }

    return () => {
      document.body.style.overflow = ''; // Cleanup
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
            transform: 'translate(-50%, -50%)', // Center popup
            width: '90%',
            maxWidth: '360px',
            height: '60vh', // Set popup height to 60% of the visible screen
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            backgroundColor: 'transparent',
          }}
        >
          {/* Header Section */}
          <div
            style={{
              width: '100%',
              backgroundColor: '#15C5D8', // Updated background color
              padding: '10px 0',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <h2
              style={{
                fontSize: '18px',
                fontWeight: 'bold', // Bold text
                color: '#FFFFFF', // White text
                margin: 0,
                textAlign: 'center',
              }}
            >
              Select your flavor
            </h2>
            <button
              onClick={handleClosePopup}
              style={{
                position: 'absolute',
                top: '50%',
                right: '10px',
                transform: 'translateY(-50%)',
                border: 'none',
                background: 'none',
                color: '#FFFFFF', // White close button color
                fontSize: '20px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              &times;
            </button>
          </div>

          {/* Flavor Options */}
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
                  marginBottom: '0', // Removed vertical spacing
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
                <p>Inventory: {inventory[flavor.id] || "Loading..."}</p>
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
