import { useEffect } from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";

const SignOut = () => {
  const { doRequest } = useRequest({
    url: `http://${process.env.NEXT_PUBLIC_BASEURL}/api/users/signout`,
    method: "post",
    body: {},
    onSuccess: () => Router.push("/"),
  });

  useEffect(() => {
    doRequest();
  }, []);

  return <div>Signing you out...</div>;
};

export default SignOut;
