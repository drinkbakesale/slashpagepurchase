import React, { useState, useRef } from 'react';

const flavorOptions = [
    {
        value: 'Variety Pack #1',
        label: 'Variety Pack #1',
        color: '#87c8d5',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0677/0537/2962/files/Tiny_-_Flavor_Adventure_w_Shadow.png?v=1718393167',
    },
    {
        value: 'Limited Edition Peach Cobbler',
        label: 'Peach Cobbler',
        color: '#f99d22',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0677/0537/2962/files/Tiny_-_Peach_Cobbler.png?v=1719851632',
    },
    {
        value: 'Jelly Donut',
        label: 'Jelly Donut',
        color: '#e27b9c',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0677/0537/2962/files/Tiny_-_Jelly_Donut.png?v=1718393168',
    },
    {
        value: 'Chocolate Chip Cookie',
        label: 'Chocolate Chip Cookie',
        color: '#f4bd79',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0677/0537/2962/files/Tiny_-_Cookie_Box.png?v=1718393167',
    },
    {
        value: 'Brownie',
        label: 'Brownie',
        color: '#9965a2',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0677/0537/2962/files/Tiny_-_Brownie_Box.png?v=1718393167',
    },
    {
        value: 'Thin Mint',
        label: 'Thin Mint',
        color: '#27b376',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0677/0537/2962/files/Tiny_-_Thin_Mint.png?v=1718393168',
    },
];

const CustomSelect = ({ label, onSelect, isOpen, setOpen, close }) => {
    const [selected, setSelected] = useState({ label: 'Select flavor', color: 'white' });
    const selectRef = useRef(null);

    const handleSelect = (flavor) => {
        setSelected(flavor);
        setOpen(false);
        onSelect(flavor.label);
    };

    return (
        <div className="relative w-full select-container" ref={selectRef}>
            <label className="block mb-1 text-center">{label}</label>
            <div
                className="border-2 border-[#7C0101] p-2 cursor-pointer text-center"
                style={{ backgroundColor: selected.color }}
                onClick={() => setOpen(!isOpen)}
            >
                {selected.label}
            </div>
            {isOpen && (
                <div className="absolute -top-1/2 bg-white border-2 border-[#7C0101] mt-1 rounded shadow-lg z-10 w-[200px]">
                    {flavorOptions.map((flavor) => (
                        <div
                            key={flavor.value}
                            className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-200"
                            onClick={() => handleSelect(flavor)}
                            style={{ backgroundColor: flavor.color }}
                        >
                            <img src={flavor.imageUrl} alt={flavor.label} className="w-8 h-8" />
                            <span style={{ color: flavor.color === '#ffeb3b' ? 'black' : 'white' }}>{flavor.label}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomSelect;
