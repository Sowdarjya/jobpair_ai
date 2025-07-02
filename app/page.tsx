import CallToAction from "@/components/CallToAction";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
const Home = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <Hero />
      <Features />
      <CallToAction />
    </div>
  );
};

export default Home;
