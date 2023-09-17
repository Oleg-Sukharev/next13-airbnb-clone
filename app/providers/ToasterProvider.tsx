"use client";

import { Toaster } from "react-hot-toast";
// create component to make sure it use client directive
const ToasterProvider = () => {
  return <Toaster />;
};

export default ToasterProvider;
