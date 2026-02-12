import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SignedIn, SignedOut, SignOutButton, SignUp, SignUpButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <h1>HomePage</h1>
      <SignedOut>
    <SignUpButton>SignIn</SignUpButton>
    </SignedOut>

    <SignedIn>
            <SignOutButton>LogOut</SignOutButton>
    </SignedIn>
    </div> 
  )
   
     
       
}
