import React from 'react';

const CustomRadio = ({value, checked, onChange, label, priceOne, priceTwo, labelTwo, children}) => {
    return (
        <label className="flex flex-col p-2 border-2 rounded-lg border-[#7C0101] cursor-pointer w-full">
            <div className="flex items-start justify-between mb-[2px]">
                <div className="flex items-center">
                    <input
                        type="radio"
                        value={value}
                        checked={checked}
                        onChange={onChange}
                        className="hidden peer"
                    />
                    <span
                        className={`flex items-start ${checked ? 'bg-[#F4EDE0] border-[#7C0101]' : ''} block  pt-1 rounded-lg cursor-pointer`}>
            <span
                className={`shrink-0 h-4 w-4 border-2 border-[#7C0101] rounded-full mt-[2px] ${checked ? 'bg-[#7C0101]' : ''} mr-2`}></span>
            <div>
              <div className="font-bold">{label}</div>
                {labelTwo && <div className="-ml-1 text-[#7C0101] font-bold">{labelTwo}</div>}
            </div>
          </span>
                </div>
                <div className="text-right mt-1 font-bold">
                    <div className="text-[#7C0101] w-20">{priceOne}</div>
                    {priceTwo && (
                        <div className="text-gray-400 line-through">{priceTwo}</div>
                    )}
                </div>
            </div>
            {checked && <div className="flex flex-col">{children}</div>}
        </label>
    );
};

export default CustomRadio;
