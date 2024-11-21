import React, { useState } from 'react';

const flavorOptions = [
        {
        value: 'Limited Edition 5-Layer Bar',
        label: 'Limited Edition 5-Layer Bar',
        subText: 'Honeyed graham, caramel swirls, toasted coconut bliss',
        color: '#C7832E',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0677/0537/2962/files/5-layer_Bar_-_Tiny.png?v=1725552129',
        textColor: '#FFFFFF',
    },
         {
        value: 'Limited Edition Banana Bread',
        label: 'Limited Edition Banana Bread',
        subText: 'Ripe bananas, vanilla, and cinnamon in cake-like harmony',
        color: '#FBE04B',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0677/0537/2962/files/Tiny_Banana_Bread-min_a54d6154-5221-4c95-9356-d579b4f20e87.png?v=1727897778',
        textColor: '#830005',
    },
      {
        value: 'Limited Edition Blueberry Pie',
        label: 'Limited Edition Blueberry Pie',
        subText: 'Sun-kissed blueberries meet buttery, flaky pie crust',
        color: '#4E70B6',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0677/0537/2962/files/tiny-blueberry_pie.png?v=1722450830',
        textColor: '#FFFFFF',
    },
      {
        value: 'Limited Edition Lemon Bar',
        label: 'Limited Edition Lemon Bar',
        subText: 'Zesty lemon filling over rich, honeyed graham cracker',
        color: '#FFC627',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0677/0537/2962/files/Tiny_-_Lemon_Bar-min.png?v=1732037885',
        textColor: '#7C0101',
    },
      {
        value: 'Limited Edition Peach Cobbler',
        label: 'Limited Edition Peach Cobbler',
        subText: 'Juicy peaches, cinnamon, and brown sugar—summer in a sip',
        color: '#F99D22',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0677/0537/2962/files/Tiny_-_Peach_Cobbler.png?v=1719851632',
        textColor: '#FFFFFF',
    },
      {
        value: 'Limited Edition Smores',
        label: 'Limited Edition Smores',
        subText: 'Toasted marshmallow, rich chocolate, and graham cracker',
        color: '#4B2D13',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0677/0537/2962/files/Tiny_-_Smores.png?v=1718393168',
        textColor: '#FFFFFF',
    },
      {
        value: 'Limited Edition Gingerbread',
        label: 'Limited Edition Gingerbread',
        subText: 'Spiced gingerbread cookie with sweet molasses and warm cinnamon',
        color: '#3EB65F',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0677/0537/2962/files/Tiny_-_Gingerbread-min.png?v=1732037885',
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
        value: 'Limited Edition Cinnamon Roll',
        label: 'Limited Edition Cinnamon Roll',
        subText: 'Cinnamon swirled buttery dough with sweet icing',
        color: '#A25D33',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0677/0537/2962/files/Tiny_-_Cinnamon_Roll-min.png?v=1730832932',
        textColor: '#FFFFFF',
    },
    {
        value: 'Jelly Donut',
        label: 'Jelly Donut',
        subText: 'Jam-filled joyride with bursts of raspberry jam and fluffy donut',
        color: '#e27b9c',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0677/0537/2962/files/Tiny_-_Jelly_Donut.png?v=1718393168',
        textColor: '#7C0101',
    },
    {
        value: 'Chocolate Chip Cookie',
        label: 'Chocolate Chip Cookie',
        subText: 'A perfect ratio of chocolate chips to golden, buttery cookie',
        color: '#e88b37',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0677/0537/2962/files/Tiny_-_Cookie_Box.png?v=1718393167',
        textColor: '#7C0101',
    },
    {
        value: 'Brownie',
        label: 'Brownie',
        subText: 'Rich, fudgy, chocolatey, yet delicate, this flavor is indulgent!',
        color: '#9965a2',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0677/0537/2962/files/Tiny_-_Brownie_Box.png?v=1718393167',
        textColor: '#FFFFFF',
    },
    {
        value: 'Thin Mint',
        label: 'Thin Mint',
        subText: 'Luscious chocolate cookie meets spearmint freshness',
        color: '#27b376',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0677/0537/2962/files/Tiny_-_Thin_Mint.png?v=1718393168',
        textColor: '#7C0101',
    },
];

const CustomSelect = ({ label, onSelect, defaultText }) => {
  const [selected, setSelected] = useState({ label: defaultText || 'Select flavor', color: 'white', textColor: '#7C0101' });
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
            maxWidth: '400px',
            height: '60vh', // 60% of visible screen height
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden', // Prevent content overflow
            backgroundColor: 'transparent', // Transparent background
          }}
        >
          {/* Header Section */}
          <div
            style={{
              width: '100%',
              backgroundColor: '#FFFFFF', // White background
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
                fontWeight: 'normal',
                fontFamily: 'Arial, sans-serif', // Same font as subtext
                color: '#000000',
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
                color: '#000000', // Black close button
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
