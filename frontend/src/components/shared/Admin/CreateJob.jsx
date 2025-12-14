import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utilis/const_endpoints";
import { Spinner } from "@/components/ui/spinner";
import useGetAllCompanies from "@/customHooks/useGetAllCompanies";

const JOB_TYPES = ["full-time", "part-time", "contract", "internship"];

function CreateJob() {
  useGetAllCompanies();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { companies } = useSelector((store) => store.company);

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    vacancies: "",
    salary: "",
    jobType: "",
    companyId: "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  function validate() {
    const newErrors = {};

    if (!input.title.trim()) newErrors.title = "Job title is required";
    if (!input.description.trim())
      newErrors.description = "Description is required";
    if (!input.requirements.trim())
      newErrors.requirements = "Requirements are required";
    if (!input.location.trim()) newErrors.location = "Location is required";
    if (!input.vacancies || input.vacancies <= 0)
      newErrors.vacancies = "Valid number of vacancies is required";
    if (!input.salary || input.salary <= 0)
      newErrors.salary = "Valid salary is required";
    if (!input.jobType) newErrors.jobType = "Job type is required";
    if (!input.companyId) newErrors.companyId = "Please select a company";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const resp = await axios.post(
        JOB_API_END_POINT,
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

      if (resp.status === 201) {
        toast.success(resp.data.message || "Job posted successfully");
        navigate("/admin/jobs");
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to post job.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <div className="my-10">
        <h1 className="font-bold text-2xl">Post a New Job</h1>
        <p className="text-muted-foreground mt-2">
          Fill in the details below to create a new job posting. Make sure to
          select the company this job belongs to.
        </p>
      </div>

      {companies.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground mb-4">
            You need to create a company first before posting a job.
          </p>
          <Button onClick={() => navigate("/admin/companies/create")}>
            Create a Company
          </Button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-card border border-border rounded-xl p-6 shadow-sm"
        >
          {/* Company Selection */}
          <div className="space-y-2">
            <Label>Select Company</Label>
            <select
              name="companyId"
              value={input.companyId}
              onChange={handleChange}
              className={`w-full p-2 rounded-md border bg-background ${
                errors.companyId ? "border-red-500" : "border-input"
              }`}
            >
              <option value="">-- Select a Company --</option>
              {companies.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.companyName}
                </option>
              ))}
            </select>
            {errors.companyId && (
              <p className="text-red-500 text-sm">{errors.companyId}</p>
            )}
          </div>

          {/* Job Title */}
          <div className="space-y-2">
            <Label>Job Title</Label>
            <Input
              name="title"
              value={input.title}
              onChange={handleChange}
              placeholder="e.g. Frontend Developer"
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <Input
              name="description"
              value={input.description}
              onChange={handleChange}
              placeholder="Job description"
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          {/* Requirements */}
          <div className="space-y-2">
            <Label>Requirements</Label>
            <Input
              name="requirements"
              value={input.requirements}
              onChange={handleChange}
              placeholder="e.g. React, Node.js, MongoDB"
              className={errors.requirements ? "border-red-500" : ""}
            />
            {errors.requirements && (
              <p className="text-red-500 text-sm">{errors.requirements}</p>
            )}
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label>Location</Label>
            <Input
              name="location"
              value={input.location}
              onChange={handleChange}
              placeholder="e.g. Remote, New York, etc."
              className={errors.location ? "border-red-500" : ""}
            />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location}</p>
            )}
          </div>

          {/* Vacancies & Salary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Vacancies</Label>
              <Input
                type="number"
                name="vacancies"
                value={input.vacancies}
                onChange={handleChange}
                placeholder="e.g. 5"
                className={errors.vacancies ? "border-red-500" : ""}
              />
              {errors.vacancies && (
                <p className="text-red-500 text-sm">{errors.vacancies}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Salary (per year)</Label>
              <Input
                type="number"
                name="salary"
                value={input.salary}
                onChange={handleChange}
                placeholder="e.g. 50000"
                className={errors.salary ? "border-red-500" : ""}
              />
              {errors.salary && (
                <p className="text-red-500 text-sm">{errors.salary}</p>
              )}
            </div>
          </div>

          {/* Job Type */}
          <div className="space-y-2">
            <Label>Job Type</Label>
            <RadioGroup
              className="flex flex-wrap gap-4 mt-2"
              value={input.jobType}
              onValueChange={(value) =>
                setInput((prev) => ({ ...prev, jobType: value }))
              }
            >
              {JOB_TYPES.map((type) => (
                <div key={type} className="flex items-center gap-2">
                  <RadioGroupItem value={type} id={`create-${type}`} />
                  <Label
                    htmlFor={`create-${type}`}
                    className="cursor-pointer capitalize"
                  >
                    {type}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {errors.jobType && (
              <p className="text-red-500 text-sm">{errors.jobType}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              onClick={() => navigate("/admin/jobs")}
            >
              Cancel
            </Button>
            {loading ? (
              <Button className="cursor-pointer" disabled>
                <Spinner />
                Posting Job...
              </Button>
            ) : (
              <Button type="submit" className="cursor-pointer">
                Post Job
              </Button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}

export default CreateJob;
