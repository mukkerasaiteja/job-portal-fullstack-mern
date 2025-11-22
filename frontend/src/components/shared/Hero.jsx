import { Input } from "../ui/Input";
import { LuSearch } from "react-icons/lu";
import { Button } from "../ui/button";

function Hero() {
  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-light text-sm">
          No.1 Website for Finding Jobs
        </span>
        <h1 className="text-4xl md:text-5xl font-bold">
          Search, Apply & Get your <br />{" "}
          <span className="text-[#6A38C2]">Dream Job</span>
        </h1>
        <div className="mx-auto w-full md:w-2/5">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe quos
          nihil alias, cupiditate excepturi modi repudiandae
        </div>
        <div className="flex shadow-lg mx-auto w-full max-w-2/5 rounded-full overflow-none mt-3">
          <Input
            type="text"
            placeholder="Search for jobs..."
            className="flex-grow rounded-r-none rounded-l-full h-12 text-lg"
          ></Input>
          <Button className="rounded-l-none rounded-r-full bg-[#6A38C2] hover:bg-[#6024c7] border-0 h-12 w-12 cursor-pointer flex items-center justify-center">
            <LuSearch className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
