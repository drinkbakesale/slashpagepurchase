import React, { useState } from "react";
import CustomSelect from "./CustomSelect";
import CustomRadio from "./CustomRadio";
import OrderButton from "./OrderButton";

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
    "Variety Pack #1": "48766615650594",
    "Blueberry Pie": "48900876599586",
    "Thin Mint": "48766621876514",
    "5-Layer Bar": "49077761802530",
    "Cinnamon Roll": "49275197653282",
    "Salted Caramel Chocolate Truffle": "49729571160354"
  };
  
  function buildShopifyCartUrl(cartItems) {
    const baseUrl = "https://drinkbakesale.com/cart/";
    const queryString = Object.entries(cartItems)
      .map(([productNumber, quantity]) => `${productNumber}:${quantity}`)
      .join(",");

    return `${baseUrl}${queryString}?utm_source=swipesX&utm_medium=swipesX`;
  }

  const handleOrderClick = () => {
    const cartItems = {};
    for (const [box, flavor] of Object.entries(flavors)) {
      const productNumber = productNumbers[flavor];
      if (productNumber) {
        console.log(box);
        if (cartItems[productNumber]) {
          cartItems[productNumber] = String(
            parseInt(cartItems[productNumber], 10) + 1
          );
        } else {
          cartItems[productNumber] = "1";
        }
      }
    }
    const url = buildShopifyCartUrl(cartItems);
    console.log(url);
    window.open(url, "_blank");
  };

  const handleSubscriptionOrderClick = () => {
    const url = "https://drinkbakesale.com/cart/clear?return_to=%2Fcart%2Fadd%3Fitems%255B0%255D%255Bid%255D%3D49729571160354%26items%255B0%255D%255Bselling_plan%255D%3D5995528482%26items%255B0%255D%255Bquantity%255D%3D1%26return_to%3D%252Fcheckout";
    window.open(url, "_blank");
  };

  return (
    <div className="bg-[#F4EDE0] rounded-lg p-2 mx-auto text-[#7C0101] leading-tight">
      <form>
        <div className="flex flex-col gap-1">
          <div className="relative">
            <CustomRadio
              value="1"
              checked={quantity === "1"}
              onChange={handleQuantityChange}
              label="Single Box"
              priceOne="$45.00"
            >
              <div className="flex gap-2 mt-2 w-full">
                <CustomSelect
                  label="Box #1"
                  defaultText="Click to select flavor"
                  onSelect={(flavor) => handleFlavorChange("box1", flavor)}
                  isOpen={openSelectIndex === 1}
                  setOpen={() =>
                    setOpenSelectIndex(openSelectIndex === 1 ? null : 1)
                  }
                  close={() => setOpenSelectIndex(null)}
                />
              </div>
              <OrderButton onClick={handleOrderClick} />
            </CustomRadio>
            <div
              className="absolute font-bold bg-[#8adcfa] px-4 border-2"
              style={{ bottom: "-19px", right: "70px", borderColor: "#7C0101" }}
            >
              Most Popular
            </div>
          </div>
          <CustomRadio
            value="2"
            checked={quantity === "2"}
            onChange={handleQuantityChange}
            label="2 Boxes - Treat Yourself"
            priceOne="$68.00"
            priceTwo="$90.00"
            labelTwo="You save 24%"
          >
            <div className="flex gap-2 mt-2 w-full">
              <CustomSelect
                label="Box #1"
                defaultText="Click to select flavor"
                onSelect={(flavor) => handleFlavorChange("box1", flavor)}
                isOpen={openSelectIndex === 1}
                setOpen={() =>
                  setOpenSelectIndex(openSelectIndex === 1 ? null : 1)
                }
                close={() => setOpenSelectIndex(null)}
              />
              <CustomSelect
                label="Box #2"
                defaultText="Click to select flavor"
                onSelect={(flavor) => handleFlavorChange("box2", flavor)}
                isOpen={openSelectIndex === 2}
                setOpen={() =>
                  setOpenSelectIndex(openSelectIndex === 2 ? null : 2)
                }
                close={() => setOpenSelectIndex(null)}
              />
            </div>
            <OrderButton onClick={handleOrderClick} />
          </CustomRadio>
          <CustomRadio
            value="3"
            checked={quantity === "3"}
            onChange={handleQuantityChange}
            label="3 Boxes - Treat Everyone"
            priceOne="$95.00"
            priceTwo="$135.00"
            labelTwo="You save 30%"
          >
            <div className="flex gap-2 mt-2 w-full">
              <CustomSelect
                label="Box #1"
                onSelect={(flavor) => handleFlavorChange("box1", flavor)}
                isOpen={openSelectIndex === 1}
                setOpen={() =>
                  setOpenSelectIndex(openSelectIndex === 1 ? null : 1)
                }
                close={() => setOpenSelectIndex(null)}
              />
              <CustomSelect
                label="Box #2"
                onSelect={(flavor) => handleFlavorChange("box2", flavor)}
                isOpen={openSelectIndex === 2}
                setOpen={() =>
                  setOpenSelectIndex(openSelectIndex === 2 ? null : 2)
                }
                close={() => setOpenSelectIndex(null)}
              />
              <CustomSelect
                label="Box #3"
                onSelect={(flavor) => handleFlavorChange("box3", flavor)}
                isOpen={openSelectIndex === 3}
                setOpen={() =>
                  setOpenSelectIndex(openSelectIndex === 3 ? null : 3)
                }
                close={() => setOpenSelectIndex(null)}
              />
            </div>
            <OrderButton onClick={handleOrderClick} />
        </div>
      </form>
    </div>
  );
};

export default FlavorForm;
