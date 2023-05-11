import Student from "@/pages/parents/student";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { openAddChildModal } from "store/modalSlice";
import { store } from "store/store";

it("Should render correctly", () => {
   render(
      <Provider store={store}>
         <Student />
      </Provider>
   );

   const dispatch = store.dispatch;

   const addChildButton = screen.getByTestId("add-child");

   const functionToBeCalled = () => {
      dispatch(openAddChildModal());
   };

   fireEvent.click(addChildButton);

   expect(functionToBeCalled).toBeCalled();
});
