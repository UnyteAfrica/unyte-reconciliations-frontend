export const AgentPolicyCategories: React.FC<{
  policyCategories: string[];
  onSelect: (page: number, category: string) => void;
}> = ({ policyCategories, onSelect }) => {
  return (
    <main className="space-y-4">
      {policyCategories.map((policyCategory, idx) => (
        <div
          onClick={() => onSelect(2, policyCategory)}
          key={idx}
          className="bg-white rounded-2xl p-4 cursor-pointer"
        >
          <div className="flex">
            <div>
              <h3 className="not-italic text-sm font-medium inline-block mb-1 text-[#101323]">
                {policyCategory}
              </h3>
            </div>
          </div>
        </div>
      ))}
    </main>
  );
};
