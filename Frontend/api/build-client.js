import axios from "axios";

// ! the baseurls must be updated for prod build

const BuildClient = ({ req }) => {
  if (typeof window === "undefined") {
    // We are on the server

    return axios.create({
      baseURL: "http://istio-ingressgateway.istio-system.svc.cluster.local",
      headers: req.headers,
    });
  } else {
    // We must be on the browser

    return axios.create({
      baseUrl: `http://${process.env.NEXT_PUBLIC_BASEURL}`,
    });
  }

};

export default BuildClient;
