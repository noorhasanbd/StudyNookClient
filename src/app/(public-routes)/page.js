import CardSection from "@/components/homepage/CardSection";
import { CommunityActivity } from "@/components/homepage/Community";
import HeroSection from "@/components/homepage/HeroSection";
import { WorkspaceTiers } from "@/components/homepage/WorkSpace";
import Navbar from "@/components/shared/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <CardSection />
      <WorkspaceTiers />
      <CommunityActivity />
    </div>
  );
}
