import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const filterData = [
  {
    filterType: "Location",
    options: ["New York", "San Francisco", "California", "Austin"],
  },
  {
    filterType: "Job Type",
    options: ["Full-time", "Part-time", "Contract", "Internship"],
  },
  {
    filterType: "Salary Range",
    options: [
      "$40,000 - $60,000",
      "$60,000 - $80,000",
      "$80,000 - $100,000",
      "$100,000+",
    ],
  },
];

function FilterCard() {
  return (
    <div className="p-4 rounded-lg border border-border bg-background text-foreground">
      <h1 className="font-bold text-lg mb-3">Filter Jobs</h1>
      <hr className="mb-4" />

      {filterData.map((section, index) => (
        <div key={index} className="mb-6">
          <Label className="font-medium text-base block mb-2">
            {section.filterType}
          </Label>

          <div className="flex flex-col gap-2">
            {section.options.map((option, idx) => (
              <label
                key={idx}
                className="flex items-center gap-3 cursor-pointer"
              >
                <Checkbox id={`${section.filterType}-${option}`} />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default FilterCard;
