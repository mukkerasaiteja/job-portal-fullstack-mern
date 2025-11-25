import Job from "./Job";

const jobResults = [1, 2, 3, 4, 5];

function Browse() {
  return (
    <div className="max-w-7xl mx-auto px-4 my-10">
      {/* Title */}
      <h1 className="font-bold text-xl md:text-2xl">
        Search Results ({jobResults.length})
      </h1>

      <hr className="border-border mt-4 mb-8" />

      {/* Grid of jobs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobResults.map((job, index) => (
          <Job key={index} job={job} />
        ))}
      </div>
    </div>
  );
}

export default Browse;
