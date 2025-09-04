import { useSelector } from "react-redux";
import { RootState } from "store/store";

interface Step2Props {
 selectedChildren: (string | number)[];
  setSelectedChildren: React.Dispatch<React.SetStateAction<(string | number)[]>>;
  goNext: () => void;
  goBack: () => void;
}

const Step2SelectChildren: React.FC<Step2Props> = ({
  selectedChildren,
  setSelectedChildren,
  goNext,
  goBack,
}) => {
  const { children } = useSelector((state: RootState) => state.parentChild);

 const toggleChild = (id: string | number) => {
  setSelectedChildren((prev) =>
    prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
  );
};

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">Select Child(ren)</h2>
      <div className="space-y-2">
        {children.map((child) => (
          <label key={child.id} className="flex items-center gap-2 border p-3 rounded-lg">
            <input
              type="checkbox"
              checked={selectedChildren.includes(child.id)}
              onChange={() => toggleChild(child.id)}
            />
            <span>{child.fullName}</span>
          </label>
        ))}
      </div>

      <div className="mt-6 flex gap-4">
        <button onClick={goBack} className="px-4 py-2 border rounded-lg bg-gray-200">Back</button>
        <button
          disabled={selectedChildren.length === 0}
          onClick={goNext}
          className="px-4 py-2 bg-mainColor text-white rounded-lg disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Step2SelectChildren;