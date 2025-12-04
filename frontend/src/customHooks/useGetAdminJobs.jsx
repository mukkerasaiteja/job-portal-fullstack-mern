import { JOB_API_END_POINT } from "@/utilis/const_endpoints";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setAdminJobs } from "@/redux/jobSlice";

function useGetAdminJobs() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${JOB_API_END_POINT}/my/jobs`, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
        if (response.status === 200) {
          dispatch(setAdminJobs(response.data.jobs));
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);
}

export default useGetAdminJobs;
