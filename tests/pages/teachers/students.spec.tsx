import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import Students from "@/pages/teachers/students";
import { Provider } from "react-redux";
import { store } from "store/store";

it("should have a search box", () => {
   render(
      <Provider store={store}>
         <Students />
      </Provider>
   );
   const searchBox: HTMLInputElement = screen.getByTestId(/searchbox/i);
   fireEvent.change(searchBox, { target: { value: "CodeAlgo" } });
   expect(searchBox.value).toBe("CodeAlgo");
});
