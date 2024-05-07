import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="bg-white dark:bg-black ">
        <div className="container flex justify-between items-center py-24">
          <div>
            <h1 className="text-7xl text-black font-sans leading-tight">
              Super Deliciour pizza <br />
              <span className="text-primary">just in 45 minutes</span>
            </h1>
            <p className="text-2xl mt-8 max-w-lg leading-snug">
              Enjoy a free meal if you order online take only 45 minutes.
            </p>
            <Button className="mt-8 text-lg rounded-full py-7 px-8 font-bold">
              Get your pizza now!
            </Button>
          </div>
          <div>
            <Image
              src={"/pizza-main.png"}
              width={450}
              height={450}
              alt="image"
            />
          </div>
        </div>
      </section>
    </>
  );
}
