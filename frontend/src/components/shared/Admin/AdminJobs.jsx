import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setSearchAdminJobByText } from "@/redux/jobSlice";
import AdminJobsTable from "./AdminJobsTable";
import useGetAdminJobs from "@/customHooks/useGetAdminJobs";
import getCurrentTime from "@/utilis/currentTime";

function AdminJobs() {
  useGetAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchAdminJobByText(input));
  }, [input, dispatch]);

  const { user } = useSelector((store) => store.auth);

  return (
    <div>
      <div className="max-w-4xl mx-auto my-10 ">
        <h1 className="text-2xl font-semibold mb-7 text-center">
          Good {getCurrentTime()}, {user.fullName}! Manage your posted Jobs
          here!
        </h1>
        <div className="flex justify-between items-center mb-6">
          <Input
            className="w-fit"
            placeholder="Filter by Name"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            className="ml-4 cursor-pointer"
            onClick={() => {
              navigate("/admin/jobs/create");
            }}
          >
            Post a New Job
          </Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  );
}

export default AdminJobs;
