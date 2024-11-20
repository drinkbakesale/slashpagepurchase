import React, { useState, useRef, useEffect } from 'react';

const flavorOptions = [
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
        value: 'Limited Edition Gingerbread Liquor',
        label: 'Limited Edition Gingerbread Liquor',
        subText: 'Spiced gingerbread cookie with sweet molasses and warm cinnamon',
        color: '#3EB65F',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0677/0537/2962/files/Tiny_-_Gingerbread-min.png?v=1732037885',
        textColor: '#FFFFFF',
    },
];

const CustomSelect = ({ label, onSelect, isOpen, setOpen, close, defaultText }) => {
    const [selected, setSelected] = useState({ label: defaultText || 'Select flavor', color: 'white', textColor: '#7C0101' });
    const selectRef = useRef(null);
    const dropdownRef = useRef(null);

    const handleSelect = (flavor) => {
        setSelected(flavor);
        setOpen(false);
        onSelect(flavor.label);
    };

    const handleToggle = () => {
        setOpen(!isOpen);
    };

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                setOpen(false);
            }
        };
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, setOpen]);

    return (
        <div className="relative w-full select-container" ref={selectRef}>
            <label className="block mb-1 text-center">{label}</label>
            <div
                className="text-[.95rem] border-2 border-[#7C0101] p-2 cursor-pointer text-center font-bold h-[68px] flex items-center justify-center"
                style={{ backgroundColor: selected.color, color: selected.textColor }}
                onClick={handleToggle}
            >
                {selected.label}
            </div>
            {isOpen && (
                <div
                    id="dropdown-menu"
                    className="fixed inset-0 flex items-center justify-center z-50"
                >
                    <div
                        className="bg-white border-4 border-[#7C0101] mt-1 rounded shadow-lg z-10 grid grid-cols-2"
                        style={{ width: '600px' }} // Adjust width as needed
                        ref={dropdownRef}
                    >
                        {flavorOptions.map((flavor) => (
                            <div
                                key={flavor.value}
                                className="flex flex-col items-center p-2"
                                onClick={() => handleSelect(flavor)}
                                style={{ backgroundColor: flavor.color }}
                            >
                                <span
                                    className="font-bold text-lg text-center w-full mb-2"
                                    style={{ color: flavor.textColor }}
                                >
                                    {flavor.label}
                                </span>
                                <div className="flex items-center w-full">
                                    <img
                                        src={flavor.imageUrl}
                                        alt={flavor.label}
                                        className="flex-shrink-0"
                                        style={{ width: '33%', margin: 0 }}
                                    />
                                    <div
                                        className="text-sm leading-tight"
                                        style={{
                                            width: '67%',
                                            color: flavor.textColor,
                                            margin: 0,
                                        }}
                                    >
                                        {flavor.subText}
                                    </div>
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
