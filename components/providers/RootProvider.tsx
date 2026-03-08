import React, { Fragment, Suspense } from "react";
import { Footer, NavigationBar } from "../serverComponent";
import { FooterSkeleton } from "../serverComponent/skeletons";

const RootProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  return (
    <Fragment>
        <NavigationBar />
      <main className="mx-auto w-full relative">
        {children}
      </main>
      <Suspense fallback={<FooterSkeleton />}>
        <Footer />
      </Suspense>
    </Fragment>
  );
};

export default RootProvider;
