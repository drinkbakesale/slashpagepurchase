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
    "Limited Edition Snickerdoodle": "49991372013858",
    "Limited Edition Salted Caramel Chocolate Truffle": "49729571160354"
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

  const handleSubscriptionOrderClick = () => {
    const url = "https://drinkbakesale.com/cart/clear?return_to=%2Fcart%2Fadd%3Fitems%255B0%255D%255Bid%255D%3D49805529383202%26items%255B0%255D%255Bselling_plan%255D%3D5995528482%26items%255B0%255D%255Bquantity%255D%3D1%26return_to%3D%252Fcheckout";
    window.open(url, "_blank");
  };

 return (
    <div className="bg-[#F4EDE0] rounded-lg p-2 mx-auto text-[#7C0101] leading-tight">
      <form>
        <div className="flex flex-col gap-1">
          {/* 1 Box Option */}
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
                style={{ lineHeight: "0.67em" }}
              />
            </div>
            <OrderButton onClick={handleOrderClick} />
          </CustomRadio>

          {/* 2 Boxes Option */}
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
              {[1, 2].map((num) => (
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
                  style={{ lineHeight: "0.67em" }}
                />
              ))}
            </div>
            <OrderButton onClick={handleOrderClick} />
          </CustomRadio>

          {/* 3 Boxes Option */}
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
              {[1, 2, 3].map((num) => (
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
                  style={{ lineHeight: "0.67em" }}
                />
              ))}
            </div>
            <OrderButton onClick={handleOrderClick} />
          </CustomRadio>

          {/* 4 Boxes Option */}
          <CustomRadio
            value="4"
            checked={quantity === "4"}
            onChange={handleQuantityChange}
            label="4 Boxes - Share the Delight"
            priceOne="$126.00"
            priceTwo="$180.00"
            labelTwo="You save 30%"
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
                  style={{ lineHeight: "0.67em" }}
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
            priceOne="$157.50"
            priceTwo="$225.00"
            labelTwo="You save 30%"
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
                  style={{ lineHeight: "0.67em" }}
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
