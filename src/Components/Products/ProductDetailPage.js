import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const ProductDetailPage = ({ details }) => {
  const {
    id,
    seller,
    shippingInfo,
    attributes,
    images,
    title,
    quantity,
    price,
    currency,
    description,
    category,
  } = details;

  return (
    <div className="bg-transparent">
      <input type="checkbox" id="product-detail" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box lg:max-w-2xl sm:max-w-lg w-screen">
          <label
            htmlFor="product-detail"
            className="btn btn-sm btn-circle btn-ghost bg-red-500 absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="card bg-transparent">
            <div className="grid lg:grid-cols-2">
              <div>
                <figure>
                  <img className="mx-auto" src={images} alt="product" />
                </figure>
                <h2 className="text-center text-2xl text-primary font-extrabold">
                  {title}
                </h2>
              </div>
              <div>
                <div className="card-body"></div>
                <p className="pt-2">
                  <strong className="text-primary underline">Price:</strong>{" "}
                  {price} {currency}
                </p>
                <p className="pt-2">
                  <strong className="text-primary underline">Category:</strong>{" "}
                  {category}
                </p>
                <p className="pt-2">
                  <strong className="text-primary underline">Quantity:</strong>{" "}
                  {quantity}
                </p>
                <p className="pt-2">
                  <strong className="text-primary underline">
                    Description :
                  </strong>{" "}
                  {description}
                </p>

                <p className="pt-2">
                  <strong className="text-primary underline">Seller:</strong>{" "}
                  {details.seller?.name}
                </p>
                <p className="pt-2">
                  <strong className="text-primary underline">
                    Seller Rating:
                  </strong>{" "}
                  {details.seller?.rating}
                </p>

                <p className="pt-2">
                  <strong className="text-primary underline">
                    Shipping Time:
                  </strong>{" "}
                  {shippingInfo?.deliveryTime}
                </p>
                <p className="pt-2">
                  <strong className="text-primary underline">
                    Shipping Cost:
                  </strong>{" "}
                  {shippingInfo?.shippingCost} {currency}
                </p>

                <p className="pt-2">
                  <strong className="text-primary underline">
                    Attributes:
                  </strong>{" "}
                </p>
                <ul>
                  {attributes?.map((attribute, index) => (
                    <li key={index}>
                      <strong>{attribute.name}:</strong> {attribute.value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* <div className="flex items-end justify-end">
              <label
                htmlFor="product-detail"
                className="btn btn-sm text-white font-bold w-1/4 btn-primary"
              >
                OK
              </label>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
