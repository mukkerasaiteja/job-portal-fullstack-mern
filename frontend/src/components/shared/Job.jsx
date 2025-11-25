import { Button } from "../ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { IoLocation } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Job() {
  const navigate = useNavigate();
  const jobId = 1; // Example job ID
  return (
    <div className="p-5 rounded-xl bg-background border border-border shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-muted-foreground">Timeline</p>
        <Button
          variant="outline"
          className="rounded-full cursor-pointer"
          size="icon"
        >
          <Bookmark size={18} />
        </Button>
      </div>

      {/* Company Section */}
      <div className="flex items-center gap-3 my-3">
        <Avatar className="shadow-sm rounded-md size-10">
          <AvatarImage
            src="https://via.placeholder.com/40"
            alt="Company Logo"
          />
        </Avatar>

        <div>
          <h1 className="font-semibold text-base">Company name</h1>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <IoLocation size={14} /> Location
          </p>
        </div>
      </div>

      {/* Job Details */}
      <div>
        <h1 className="font-bold text-lg my-2">Job Title</h1>
        <p className="text-sm text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
          ducimus enim qui delectus obcaecati.
        </p>
      </div>

      {/* Badges */}
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

      {/* Buttons */}
      <div className="flex gap-2 mt-4">
        <Button
          variant="outline"
          className="cursor-pointer flex-1"
          onClick={() => navigate(`/description/${jobId}`)}
        >
          Details
        </Button>

        <Button className="cursor-pointer flex-1 bg-[#7209b7] hover:bg-[#5d0ca5] text-white">
          Save for later
        </Button>
      </div>
    </div>
  );
}

export default Job;
