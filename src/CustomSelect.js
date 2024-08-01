import React, { useState, useRef, useEffect } from 'react';

const flavorOptions = [
    {
        value: 'Variety Pack #1',
        label: 'Variety Pack #1',
        color: '#87c8d5',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0677/0537/2962/files/Tiny_-_Flavor_Adventure_w_Shadow.png?v=1718393167',
        textColor: '#7C0101',
    },
    {
        value: 'Blueberry Pie',
        label: 'Limited Edition Blueberry Pie',
        color: '#4E70B6',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0677/0537/2962/files/tiny-blueberry_pie.png?v=1722450830',
        textColor: '#FFFFFF',
    },
    {
        value: 'Jelly Donut',
        label: 'Jelly Donut',
        color: '#e27b9c',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0677/0537/2962/files/Tiny_-_Jelly_Donut.png?v=1718393168',
        textColor: '#7C0101',
    },
    {
        value: 'Chocolate Chip Cookie',
        label: 'Chocolate Chip Cookie',
        color: '#e88b37',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0677/0537/2962/files/Tiny_-_Cookie_Box.png?v=1718393167',
        textColor: '#7C0101',
    },
    {
        value: 'Brownie',
        label: 'Brownie',
        color: '#9965a2',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0677/0537/2962/files/Tiny_-_Brownie_Box.png?v=1718393167',
        textColor: '#FFFFFF',
    },
    {
        value: 'Thin Mint',
        label: 'Thin Mint',
        color: '#27b376',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0677/0537/2962/files/Tiny_-_Thin_Mint.png?v=1718393168',
        textColor: '#7C0101',
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
        if (isOpen && selectRef.current && dropdownRef.current) {
            const select = selectRef.current;
            const dropdown = dropdownRef.current;
            const selectRect = select.getBoundingClientRect();

            dropdown.style.position = 'fixed';
            dropdown.style.top = `${selectRect.top + window.scrollY + (selectRect.height / 2)}px`;
            dropdown.style.left = '50%';
            dropdown.style.transform = 'translateX(-50%) translateY(-50%)';
        }
    }, [isOpen]);

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
                    className="fixed bg-white border-2 border-[#7C0101] mt-1 rounded shadow-lg z-10 w-[230px]"
                    ref={dropdownRef}
                >
                    {flavorOptions.map((flavor) => (
                        <div
                            key={flavor.value}
                            className="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-gray-200"
                            onClick={() => handleSelect(flavor)}
                            style={{ backgroundColor: flavor.color }}
                        >
                            <img src={flavor.imageUrl} alt={flavor.label} className="w-14 h-14" />
                            <span className="font-bold text-lg leading-tight" style={{ color: flavor.textColor }}>
                                {flavor.label}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomSelect;
