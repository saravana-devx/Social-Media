import { router } from "@/router/router";
import React from "react";
import { RouterProvider as ReactRouterProvider } from "react-router-dom";

const RouterProvider: React.FC = () => {
  return <ReactRouterProvider router={router} />;
};

export default RouterProvider;
