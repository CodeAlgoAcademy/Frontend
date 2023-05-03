import Layout from "@/components/Layout";
import ScreenTime from "@/pages/parents/screen-time";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "store/store";
import { getAccessToken } from "utils/getTokens";

const myMock = jest.fn();

jest.mock("getAccessToken");
(getAccessToken as any).mockImplementation(() => Promise.resolve());

it("Should render two containers", () => {
   render(
      <Provider store={store}>
         <Layout>
            <ScreenTime />
         </Layout>
      </Provider>
   );

   const container1 = screen.getByText("Screen time");
   const container2 = screen.getByText("Current screen time restrictions");

   expect(container1).toBeInTheDocument();
   expect(container2).toBeInTheDocument();
});
