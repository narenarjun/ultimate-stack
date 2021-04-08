import axios from "axios";

// ! the baseurls must be updated for prod build

const BuildClient = ({ req }) => {
  if (typeof window === "undefined") {
    // We are on the server
    console.log("executed on the server");

    return axios.create({
      // baseURL: `${process.env.NEXT_PUBLIC_BASEURL}`,
      baseURL: "http://istio-ingressgateway.istio-system.svc.cluster.local",
      headers: req.headers,
    });
  } else {
    // We must be on the browser

    console.log(`executed on the browser from the _app.js page, this is the base url: ${process.env.NEXT_PUBLIC_BASEURL}`);

    // return axios

    return axios.create({
      baseUrl: `http://${process.env.NEXT_PUBLIC_BASEURL}`,
    });
  }

  // console.log(`this is executed ${typeof window}, this is the baseurl ${process.env.NEXT_PUBLIC_BASEURL}`);

  // return axios.create({
  //   baseUrl: `${process.env.NEXT_PUBLIC_BASEURL}`,
  // });
};

export default BuildClient;
