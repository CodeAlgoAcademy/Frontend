import ContentBox from "@/components/parents/UI/ContentBox";
import { IChildProgress } from "types/interfaces/parent.interface";

interface ICompletedStandardProps {
  completedItems?: IChildProgress[];
  isLoading?: boolean;
}

const CompletedStandard = ({ completedItems, isLoading }: ICompletedStandardProps) => {
  const filteredItems = completedItems?.filter(item => {
    const bothNoCurriculum = 
      item.iready_math_desc?.includes("(No direct curriculum unit)") && 
      item.common_core_math_desc?.includes("(No direct curriculum unit)");
    return !bothNoCurriculum;
  }) || [];

  const hasData = filteredItems.length > 0;

  return (
    <ContentBox size="base" title="Completed Standards" padding="large" style={{
      minWidth: "100%", 
        maxWidth: "100%", 
        height: "400px",
        overflowY: "auto"}}>
      <div className="mt-6">
        {isLoading ? (
          <p className="text-gray-500 animate-pulse">Loading completed standards...</p>
        ) : hasData ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-2 text-left font-medium w-[15%]">CS</th>
                <th className="px-4 py-2 text-left font-medium w-[40%]">IR</th>
                <th className="px-4 py-2 text-left font-medium w-[45%]">CC</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, index) => (
                <tr key={`completed-${index}`} className="border-b border-gray-200">
                  <td className="px-4 py-2 text-[0.75rem] w-[15%]">{item.standard_code || "N/A"}</td>
                  <td className="px-4 py-2 text-[0.75rem]">
                    <div className="max-h-20 overflow-y-auto">
                      {item.iready_math_desc || "No description"}
                    </div>
                  </td>
                  <td className="px-4 py-2 text-[0.75rem]">
                    <div className="max-h-20 overflow-y-auto">
                      {item.common_core_math_desc || "No description"}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No standards completed yet.</p>
        )}
      </div>
    </ContentBox>
  );
};

export default CompletedStandard;