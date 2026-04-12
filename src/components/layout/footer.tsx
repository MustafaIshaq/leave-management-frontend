import { Separator } from "@/components/ui/separator";

// Simple footer component
export default function Footer() {
  return (
    <footer className="mt-auto bg-white">
      <Separator />
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 text-sm text-muted-foreground">
        {/* Left side */}
        <p>© 2026 LeaveFlow. All rights reserved.</p>

        {/* Right side */}
        <p>Leave Management System</p>
      </div>
    </footer>
  );
}