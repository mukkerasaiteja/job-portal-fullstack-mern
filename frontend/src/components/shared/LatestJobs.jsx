import LatestJobCard from "./LatestJobCard";

const jobs = [1, 2, 3, 4, 5, 6];

function LatestJobs() {
  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        Latest & Top <span className="text-[#6A38C2]">Job Openings</span>
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5">
        {jobs.map((job, index) => (
          <div key={index} className="job-card">
            <LatestJobCard />
          </div>
        ))}
      </div>
    </div>
  );
}

export default LatestJobs;
