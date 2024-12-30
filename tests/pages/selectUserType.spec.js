import SelectUserType from "@/pages/login";
import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { store } from "store/store";

it("Should display three account options for user", () => {
   render(
      <Provider store={store}>
         <SelectUserType />
      </Provider>
   );

   const accountsEl = screen.getAllByTestId("accountType");

   expect(accountsEl.length).toBe(3);

   // They should be in this order - Parent, Teacher & Student
   expect(accountsEl[0].textContent).toBe("Parent");
   expect(accountsEl[1].textContent).toBe("Teacher");
   expect(accountsEl[2].textContent).toBe("Student");
});
