import "bootstrap/dist/css/bootstrap.css";
import BuildClient from "../api/build-client";

import Header from "../components/header";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <div className="container">
        <Component currentUser={currentUser} {...pageProps} />
      </div>
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = BuildClient(appContext.ctx);

  let urlvl = "/api/users/currentuser";

  if (typeof window !== undefined) {
    urlvl = `http://${process.env.NEXT_PUBLIC_BASEURL}/api/users/currentuser`;
  }

  const { data } = await client.get(urlvl);


  console.log("this is data from _app.js page :", data);
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser
    );
  }

  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
