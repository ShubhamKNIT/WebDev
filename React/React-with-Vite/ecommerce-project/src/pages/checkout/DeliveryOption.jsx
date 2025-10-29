import formatDate from "../../utils/date";
import formatMoney from "../../utils/money";

export default function DeliveryOptions({ cartItem, deliveryOptions }) {
    return (
        <>
            {
                deliveryOptions.map((deliveryOption) => {
                let priceString = 'FREE Shipping';

                if (deliveryOption.priceCents > 0) {
                    priceString = `${formatMoney(deliveryOption.priceCents)} - Shipping`;
                }

                return (
                    <div key={deliveryOption.id} className="delivery-option">
                    <input type="radio"
                        checked={cartItem.deliveryOptionId === deliveryOption.id}
                        className="delivery-option-input"
                        name={`delivery-option-${cartItem.product.id}`} />
                    <div>
                        <div className="delivery-option-date">
                        {formatDate(deliveryOption.estimatedDeliveryTimeMs)}
                        {/* Tuesday, June 21 */}
                        </div>
                        <div className="delivery-option-price">
                        {priceString}
                        {/* FREE Shipping */}
                        </div>
                    </div>
                    </div>
                )
                })
            }
        </>
    )
}