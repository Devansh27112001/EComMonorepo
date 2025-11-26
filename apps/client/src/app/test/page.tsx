import { auth } from "@clerk/nextjs/server";

const page = async () => {
  const { getToken } = await auth();
  const token = await getToken();
  // Product-service
  const responseProduct = await fetch("http://localhost:8003/test", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const dataProduct = await responseProduct.json();
  console.log(dataProduct);

  // Order-service
  const responseOrder = await fetch("http://localhost:8001/test", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const dataOrder = await responseOrder.json();
  console.log(dataOrder);

  // Payment-service
  const responsePayment = await fetch("http://localhost:8002/test", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await responsePayment.json();
  console.log(data);

  return <div>page</div>;
};

export default page;
