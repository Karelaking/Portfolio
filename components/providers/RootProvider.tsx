import React, { Fragment } from "react";
import { Footer, NavigationBar } from "../serverComponent";

const RootProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  return (
    <Fragment>
      <NavigationBar />
      <main className="mx-auto w-full">
        {children}
      </main>
      <Footer />
    </Fragment>
  );
};

export default RootProvider;
