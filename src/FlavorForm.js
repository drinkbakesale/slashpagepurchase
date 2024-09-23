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
    "Flavor Adventure": "48766615650594",
    "Jelly Donut": "48766619058466",
    "Chocolate Chip Cookie": "48766610997538",
    Brownie: "48766158111010",
    "Thin Mint": "48766621876514",
    "Limited Edition 5-Layer Bar": "49097034596642",
  };

  function buildShopifyCartUrl(cartItems) {
    const baseUrl = "https://drinkbakesale.com/cart/";
    const queryString = Object.entries(cartItems)
      .map(([productNumber, quantity]) => `${productNumber}:${quantity}`)
      .join(",");

    return `${baseUrl}${queryString}?utm_source=swipesF&utm_medium=swipesF`;
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
    const url = "https://drinkbakesale.com/subscribetoflavorofthemmonth";
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
            priceTwo="$80.00"
            labelTwo="You save 15%"
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
            priceOne="$96.00"
            priceTwo="$120.00"
            labelTwo="You save 20%"
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
          </CustomRadio>
          <CustomRadio
            value="subscription"
            checked={quantity === "subscription"}
            onChange={handleQuantityChange}
            label="Subscription - Flavor of the Month Box"
            priceOne="$34.00 per month"
            labelTwo="You save 15%"
          >
            <p className="ml-5 mt-2">
              Starting with this month’s flavor, Blueberry Pie Liquor, each
              month you receive Bakesale’s newest limited-edition flavor
              inspired by America’s favorite treats and sweets!
            </p>
            <OrderButton
              buttonText="Click to purchase subscription"
              onClick={handleSubscriptionOrderClick}
            />
          </CustomRadio>
        </div>
      </form>
    </div>
  );
};

export default FlavorForm;
