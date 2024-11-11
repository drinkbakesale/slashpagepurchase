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

  const handleFlavorChange = (flavorBox, flavor) => {
    setFlavors((prevFlavors) => ({
      ...prevFlavors,
      [flavorBox]: flavor,
    }));
  };

  const productNumbers = {
    "Variety Pack #1": "48766615650594",
    "Flavor Adventure": "48766615650594",
    "Jelly Donut": "48766619058466",
    "Chocolate Chip Cookie": "48766610997538",
    Brownie: "48766158111010",
    "Thin Mint": "48766621876514",
    "Limited Edition Cinnamon Roll": "49275197653282",
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
    for (const flavor of Object.values(flavors)) {
      const productNumber = productNumbers[flavor];
      if (productNumber) {
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
    window.open(url, "_blank");
  };

  return (
    <div className="bg-[#F4EDE0] rounded-lg p-2 mx-auto text-[#7C0101] leading-tight">
      <form>
        <div className="flex flex-col gap-1">
          {/* Single, 2, 3 Box, and Subscription Options */}
          {/* Existing code remains unchanged for these options */}

          {/* 4 Boxes Option */}
          <CustomRadio
            value="4"
            checked={quantity === "4"}
            onChange={handleQuantityChange}
            label="4 Boxes - Share the Delight"
            priceOne="$120.00"
            priceTwo="$170.00"
            labelTwo="You save 35%"
          >
            <div className="flex gap-2 mt-2 w-full">
              {[1, 2, 3, 4].map((num) => (
                <CustomSelect
                  key={`box${num}`}
                  label={`Box #${num}`}
                  defaultText="Click to select flavor"
                  onSelect={(flavor) => handleFlavorChange(`box${num}`, flavor)}
                  isOpen={openSelectIndex === num}
                  setOpen={() =>
                    setOpenSelectIndex(openSelectIndex === num ? null : num)
                  }
                  close={() => setOpenSelectIndex(null)}
                />
              ))}
            </div>
            <OrderButton onClick={handleOrderClick} />
          </CustomRadio>

          {/* 5 Boxes Option */}
          <CustomRadio
            value="5"
            checked={quantity === "5"}
            onChange={handleQuantityChange}
            label="5 Boxes - Flavor Extravaganza"
            priceOne="$145.00"
            priceTwo="$200.00"
            labelTwo="You save 40%"
          >
            <div className="flex gap-2 mt-2 w-full">
              {[1, 2, 3, 4, 5].map((num) => (
                <CustomSelect
                  key={`box${num}`}
                  label={`Box #${num}`}
                  defaultText="Click to select flavor"
                  onSelect={(flavor) => handleFlavorChange(`box${num}`, flavor)}
                  isOpen={openSelectIndex === num}
                  setOpen={() =>
                    setOpenSelectIndex(openSelectIndex === num ? null : num)
                  }
                  close={() => setOpenSelectIndex(null)}
                />
              ))}
            </div>
            <OrderButton onClick={handleOrderClick} />
          </CustomRadio>
        </div>
      </form>
    </div>
  );
};

export default FlavorForm;
