import AddClass from "@/pages/teachers/addClass";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { store } from "store/store";

it("should have a title - home", () => {
   render(
      <Provider store={store}>
         <AddClass />
      </Provider>
   );
   const title = screen.getByText(/home/i);
   expect(title).toBeInTheDocument();
});

test("modal workflow", () => {
   render(
      <Provider store={store}>
         <AddClass />
      </Provider>
   );
   const addClassModal = screen.getByTestId("addClassModal");
   const modalController = screen.getByTestId("open-modal");
   fireEvent.click(modalController);
   expect(addClassModal).toBeVisible();
});
