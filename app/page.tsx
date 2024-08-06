import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function LandingPage() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      Landing Page{" "}
      <Link href="/dashboard" className="w-42 h-10">
        <Button variant={"link"}>Dashboard</Button>
      </Link>
    </div>
  );
}
