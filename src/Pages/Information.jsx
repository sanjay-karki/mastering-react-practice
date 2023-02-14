import React from "react";
import InfoComponent from "../Components/Info/InfoComponent";
import { InfoProvider } from "../Store/Store";

function Information() {
  return (
    <InfoProvider>
      <InfoComponent />
    </InfoProvider>
  );
}

export default Information;
