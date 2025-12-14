import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utilis/const_endpoints";
import { Spinner } from "@/components/ui/spinner";
import useGetSingleJob from "@/customHooks/useGetSingleJob";

const JOB_TYPES = ["full-time", "part-time", "contract", "internship"];

function SetupJob() {
  const params = useParams();
  const { loading: isFetching } = useGetSingleJob(params.id);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const singleJob = useSelector((store) => store.job.job);

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    vacancies: "",
    salary: "",
    jobType: "",
  });

  // Load job when editing
  useEffect(() => {
    if (singleJob) {
      setInput({
        title: singleJob.title || "",
        description: singleJob.description || "",
        requirements: singleJob.requirements || "",
        location: singleJob.location || "",
        vacancies: singleJob.vacancies || "",
        salary: singleJob.salary || "",
        jobType: singleJob.jobType || "",
      });
    }
  }, [singleJob]);

  function handleChange(e) {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const resp = await axios.put(
        `${JOB_API_END_POINT}/${params.id}`,
        {
          ...input,
          vacancies: Number(input.vacancies),
          salary: Number(input.salary),
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (resp.status === 200) {
        toast.success(resp.data.message || "Job updated successfully");
        navigate("/admin/jobs");
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to update job.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="outline"
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <h1 className="text-2xl font-bold">Edit Job</h1>
      </div>

      {/* Form */}
      {isFetching ? (
        <div className="flex justify-center items-center py-20">
          <Spinner className="w-8 h-8" />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-card border border-border rounded-xl p-6 shadow-sm"
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Label>Job Title</Label>
            <Input
              className="col-span-3"
              name="title"
              value={input.title}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label>Description</Label>
            <Input
              className="col-span-3"
              name="description"
              value={input.description}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label>Requirements</Label>
            <Input
              className="col-span-3"
              name="requirements"
              value={input.requirements}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label>Location</Label>
            <Input
              className="col-span-3"
              name="location"
              value={input.location}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label>Vacancies</Label>
            <Input
              className="col-span-3"
              type="number"
              name="vacancies"
              value={input.vacancies}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label>Salary</Label>
            <Input
              className="col-span-3"
              type="number"
              name="salary"
              value={input.salary}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label>Job Type</Label>
            <RadioGroup
              className="col-span-3 flex flex-wrap gap-4"
              value={input.jobType}
              onValueChange={(value) =>
                setInput((prev) => ({ ...prev, jobType: value }))
              }
            >
              {JOB_TYPES.map((type) => (
                <div key={type} className="flex items-center gap-2">
                  <RadioGroupItem value={type} id={type} />
                  <Label htmlFor={type} className="cursor-pointer capitalize">
                    {type}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {loading ? (
            <Button disabled className="w-full cursor-pointer">
              <Spinner />
              Saving...
            </Button>
          ) : (
            <Button type="submit" className="w-full cursor-pointer">
              Update Job
            </Button>
          )}
        </form>
      )}
    </div>
  );
}

export default SetupJob;
