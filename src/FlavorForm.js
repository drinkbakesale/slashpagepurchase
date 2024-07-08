import React, {useState} from 'react';
import CustomSelect from './CustomSelect';
import CustomRadio from './CustomRadio';
import OrderButton from './OrderButton';

const FlavorForm = () => {
    const [quantity, setQuantity] = useState(null);
    const [flavors, setFlavors] = useState({});
    const [openSelectIndex, setOpenSelectIndex] = useState(null);

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
        setFlavors({});
        setOpenSelectIndex(null);
    };

    const handleFlavorChange = (box, flavor) => {
        setFlavors((prevFlavors) => ({
            ...prevFlavors,
            [box]: flavor,
        }));
    };
    const productNumbers = {
        'Variety Pack #1': '47635501908258',
        'Flavor Adventure': '48168170389794',
        'Jelly Donut': '47825809637666',
        'Chocolate Chip Cookie': '43724077891874',
        'Brownie': '46649579372834',
        'Thin Mint': '47594913628450',
        'Peach Cobbler': '48774708461858',
    };


    function buildShopifyCartUrl(cartItems) {
        const baseUrl = 'https://drinkbakesale.com/cart/';
        const queryString = Object.entries(cartItems)
            .map(([productNumber, quantity]) => `${productNumber}:${quantity}`)
            .join(',');

        return `${baseUrl}${queryString}`;
    }

    const handleOrderClick = () => {
        const cartItems = {};
        for (const [box, flavor] of Object.entries(flavors)) {
            const productNumber = productNumbers[flavor];
            if (productNumber) {
                if (cartItems[productNumber]) {
                    cartItems[productNumber] = String(parseInt(cartItems[productNumber], 10) + 1);
                } else {
                    cartItems[productNumber] = '1';
                }
            }
        }
        const url = buildShopifyCartUrl(cartItems);
        console.log(url)
        window.open(url, '_blank');
    };

    const handleSubscriptionOrderClick = () => {
        const url = buildShopifyCartUrl({'48168170389794': '1'});
        window.open(url, '_blank');
    };

    return (
        <div className="bg-[#F4EDE0] rounded-lg p-2 w-96 mx-auto text-[#7C0101]">
            <h2 className="text-center text-lg font-bold mb-4">
                Ready to begin your flavor adventure? Choose your Bakesale quantity below:
            </h2>
            <div className="mb-4 flex border-t-2 border-b-2 -mx-2 px-6 py-2 border-[#7C0101] bg-[#DEBDBE]">
                <div>
                    <div className="text-center font-bold">MONEY-BACK GUARANTEE</div>
                    <div className="text-center text-sm font-semibold">Your money back if it's not love at first sip.
                    </div>
                </div>
                <div>
                    <div className="text-center font-bold">FREE + FAST SHIPPING</div>
                    <div className="text-center text-sm font-semibold">Average of 3 days from order to delivery.</div>
                </div>
            </div>
            <form>
                <div className="flex flex-col gap-4">
                    <CustomRadio
                        value="1"
                        checked={quantity === "1"}
                        onChange={handleQuantityChange}
                        label="Single Box"
                        priceOne="$40.00"
                    >
                        <div className="flex gap-2 mt-2 w-full">
                            <CustomSelect
                                label="Box #1"
                                defaultText="Click to select flavor"
                                onSelect={(flavor) => handleFlavorChange('box1', flavor)}
                                isOpen={openSelectIndex === 1}
                                setOpen={() => setOpenSelectIndex(openSelectIndex === 1 ? null : 1)}
                                close={() => setOpenSelectIndex(null)}
                            />
                        </div>
                        <OrderButton onClick={handleOrderClick}/>
                    </CustomRadio>
                    <CustomRadio
                        value="2"
                        checked={quantity === "2"}
                        onChange={handleQuantityChange}
                        label="2 Boxes - Treat Yourself"
                        priceOne="$68.00"
                        priceTwo="$80.00"
                        labelTwo="You save 15%"
                    >
                        <div className="flex gap-2 mt-2 w-full">
                            <CustomSelect
                                label="Box #1"
                                defaultText="Click to select flavor"
                                onSelect={(flavor) => handleFlavorChange('box1', flavor)}
                                isOpen={openSelectIndex === 1}
                                setOpen={() => setOpenSelectIndex(openSelectIndex === 1 ? null : 1)}
                                close={() => setOpenSelectIndex(null)}
                            />
                            <CustomSelect
                                label="Box #2"
                                defaultText="Click to select flavor"
                                onSelect={(flavor) => handleFlavorChange('box2', flavor)}
                                isOpen={openSelectIndex === 2}
                                setOpen={() => setOpenSelectIndex(openSelectIndex === 2 ? null : 2)}
                                close={() => setOpenSelectIndex(null)}
                            />
                        </div>
                        <OrderButton onClick={handleOrderClick}/>
                    </CustomRadio>
                    <CustomRadio
                        value="3"
                        checked={quantity === "3"}
                        onChange={handleQuantityChange}
                        label="3 Boxes - Treat Everyone"
                        priceOne="$96.00"
                        priceTwo="$120.00"
                        labelTwo="You save 20%"
                    >
                        <div className="flex gap-2 mt-2 w-full">
                            <CustomSelect
                                label="Box #1"
                                onSelect={(flavor) => handleFlavorChange('box1', flavor)}
                                isOpen={openSelectIndex === 1}
                                setOpen={() => setOpenSelectIndex(openSelectIndex === 1 ? null : 1)}
                                close={() => setOpenSelectIndex(null)}
                            />
                            <CustomSelect
                                label="Box #2"
                                onSelect={(flavor) => handleFlavorChange('box2', flavor)}
                                isOpen={openSelectIndex === 2}
                                setOpen={() => setOpenSelectIndex(openSelectIndex === 2 ? null : 2)}
                                close={() => setOpenSelectIndex(null)}
                            />
                            <CustomSelect
                                label="Box #3"
                                onSelect={(flavor) => handleFlavorChange('box3', flavor)}
                                isOpen={openSelectIndex === 3}
                                setOpen={() => setOpenSelectIndex(openSelectIndex === 3 ? null : 3)}
                                close={() => setOpenSelectIndex(null)}
                            />
                        </div>
                        <OrderButton onClick={handleOrderClick}/>
                    </CustomRadio>
                    <CustomRadio
                        value="subscription"
                        checked={quantity === "subscription"}
                        onChange={handleQuantityChange}
                        label="Subscription - Flavor of the Month Box"
                        priceOne="$34.00 per month"
                        labelTwo="You save 15%"
                    > <OrderButton onClick={handleSubscriptionOrderClick}/></CustomRadio>
                </div>
            </form>
        </div>
    );
};

export default FlavorForm;
