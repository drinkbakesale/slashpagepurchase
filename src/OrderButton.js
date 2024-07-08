import React from 'react';

const OrderButton = ({ onClick }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="bg-[#EF9433] text-[#7C0101] font-bold py-2 px-4 mx-2 rounded-lg mt-4 border-2 border-[#7C0101]"
        >
            Click to place order
        </button>
    );
};

export default OrderButton;
