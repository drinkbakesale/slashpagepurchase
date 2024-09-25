import React, { useState, useRef, useEffect } from 'react';

const flavorOptions = [
    // ... your flavor options here
];

const CustomSelect = ({ label, onSelect, isOpen, setOpen, defaultText }) => {
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
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !selectRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        if (isOpen) {
            document.body.style.overflow = 'auto'; // Ensure overflow is enabled
            document.addEventListener('keydown', handleEsc);
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.body.style.overflow = 'auto'; // Reset overflow
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
                    <div className='bg-white border-4 border-[#7C0101] mt-1 rounded shadow-lg z-10 w-[300px]' ref={dropdownRef}>
                        {flavorOptions.map((flavor) => (
                            <div
                                key={flavor.value}
                                className="flex items-center gap-2 px-2 py-2 cursor-pointer hover:bg-gray-200"
                                onClick={() => handleSelect(flavor)}
                                style={{ backgroundColor: flavor.color }}
                            >
                                <img src={flavor.imageUrl} alt={flavor.label} className="w-20 h-20" />
                                <div>
                                    <span className="font-bold text-2xl leading-tight" style={{ color: flavor.textColor }}>
                                        {flavor.label}
                                    </span>
                                    <div className='text-xs' style={{ color: flavor.textColor }}>{flavor.subText}</div>
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
