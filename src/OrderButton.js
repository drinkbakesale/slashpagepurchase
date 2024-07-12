import React from 'react';

const OrderButton = ({ onClick, buttonText="Click to place order" }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="bg-[#EF9433] text-[#7C0101] font-bold py-2 px-4 mx-2 rounded-lg mt-4 border-2 border-[#7C0101]"
        >
            {buttonText}
        </button>
    );
};

export default OrderButton;
