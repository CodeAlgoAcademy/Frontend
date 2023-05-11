import React from "react";
import { describe, expect } from "@jest/globals";
import { render } from "@testing-library/react";
import Dashboard from "@/pages/teachers";
import { Provider } from "react-redux";
import { store } from "store/store";

describe("The dashboard page", () => {
   it("renders dom elements correctly", () => {
      const { getByTestId } = render(
         <Provider store={store}>
            <Dashboard />
         </Provider>
      );
      const dashbordPage = getByTestId("dashboard-heading");
      expect(dashbordPage.textContent).toContain("Today at a Glance");
   });
});
