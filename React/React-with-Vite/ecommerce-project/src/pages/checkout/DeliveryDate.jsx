import formatDate from "../../utils/date";

export default function DeliveryDate({ selectedDeliveryOption }) {
  return (
    <>
      <div className="delivery-date">
        Delivery date: {formatDate(selectedDeliveryOption.estimatedDeliveryTimeMs)}
      </div>
    </>
  );
}