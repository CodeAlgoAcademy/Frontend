import Curriculum from "@/pages/teachers/curriculum";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "store/store";

test("expect page to display 3 tabs that filter the curriculums", () => {
   render(
      <Provider store={store}>
         <Curriculum />
      </Provider>
   );

   const tabs = screen.getAllByTestId("curriculum-tabs");

   expect(tabs.length).toBe(3);
});
