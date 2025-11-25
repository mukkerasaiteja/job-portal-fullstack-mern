import { Badge } from "@/components/ui/badge";

function LatestJobCard() {
  return (
    <div className="p-5 rounded-lg shadow-xl bg-white border border-gray-100 cursor-pointer">
      <div>
        <h1 className="font-medium text-lg">Company name</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>
      <div>
        <h1 className="text-lg font-bold my-2">Job title</h1>
        <p className="text-sm text-gray-600">Location</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          Badge1
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          Badge2
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">
          Badge3
        </Badge>
      </div>
    </div>
  );
}

export default LatestJobCard;
