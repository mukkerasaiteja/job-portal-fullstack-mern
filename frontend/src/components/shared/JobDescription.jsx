import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

function JobDescription() {
  const isApplied = true;
  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">Title</h1>
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <Badge
              variant="secondary"
              className="text-blue-700 dark:text-blue-300 font-medium"
            >
              Full-time
            </Badge>
            <Badge variant="secondary" className="text-[#F83002] font-medium">
              Remote
            </Badge>
            <Badge
              variant="secondary"
              className="text-[#7209b7] dark:text-purple-300 font-medium"
            >
              Senior
            </Badge>
          </div>
        </div>
        <div>
          <Button className="cursor-pointer" disabled={isApplied}>
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>
      </div>
      <h1 className="border-b-2 border-border font-medium py-4">
        Job Description
      </h1>
      <div className="my-3 flex flex-col gap-1">
        <h1 className="font-bold my-1">
          Role:
          <span className="pl-1 font-normal text-gray-800">Full Stack</span>
        </h1>
        <h1 className="font-bold my-1">
          Location:
          <span className="pl-1 font-normal text-gray-800">Hyderabad</span>
        </h1>
        <h1 className="font-bold my-1">
          Description:
          <span className="pl-1 font-normal text-gray-800">
            lorem fmdnkjkl dfnklnflm ndkl
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Experience:
          <span className="pl-1 font-normal text-gray-800">3-5 years</span>
        </h1>
        <h1 className="font-bold my-1">
          Salary:
          <span className="pl-1 font-normal text-gray-800">
            $60,000 - $80,000
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Total Applicants:
          <span className="pl-1 font-normal text-gray-800">120</span>
        </h1>
        <h1 className="font-bold my-1">
          Posted Date:
          <span className="pl-1 font-normal text-gray-800">2025-11-10</span>
        </h1>
      </div>
    </div>
  );
}

export default JobDescription;
