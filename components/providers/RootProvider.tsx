import React, { Fragment } from "react";
import { Footer, NavigationBar } from "../layouts";

const RootProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  return (
    <Fragment>
      <NavigationBar />
      <main className="mx-auto w-full max-w-5xl border-x border-dashed px-4 pt-8 pb-12 sm:px-6 sm:pt-16 lg:px-8">
        {children}
      </main>
      <Footer />
    </Fragment>
  );
};

export default RootProvider;
