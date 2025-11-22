import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const categoryNames = [
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "DevOps Engineer",
  "Data Scientist",
];

function CategoryCarousel() {
  return (
    <div>
      <Carousel
        className="w-full max-w-xl mx-auto my-10"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {categoryNames.map((category, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/4 lg:basis-1/3 sm:basis-1/3 "
            >
              <Button variant="outline" className="rounded-full cursor-pointer">
                {category}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default CategoryCarousel;
