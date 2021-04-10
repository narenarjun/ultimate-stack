import { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import Router from "next/router";
import useRequest from "../../hooks/use-request";

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const { doRequest, errors } = useRequest({
    url: `http://${process.env.NEXT_PUBLIC_BASEURL}/api/payments`,
    method: "post",
    body: {
      orderId: order.id,
    },
    onSuccess: () => Router.push("/orders"),
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  if (timeLeft < 0) {
    return <div>Order Expired</div>;
  }

  return (
    <div>
      Time left to pay: {timeLeft} seconds
      <StripeCheckout
        token={({ id }) => doRequest({ token: id })}
        stripeKey= {`${process.env.NEXT_PUBLIC_STRIPE_KEY}`}
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />
      {errors}
    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;

  let urlvl = `/api/orders/${orderId}`;

  if (typeof window !== undefined) {
    urlvl = `http://${process.env.NEXT_PUBLIC_BASEURL}/api/orders/${orderId}`;
  }

  const { data } = await client.get(urlvl);
  return { order: data };
};

export default OrderShow;
