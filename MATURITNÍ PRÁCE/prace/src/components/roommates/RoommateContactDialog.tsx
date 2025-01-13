import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";

interface RoommateContactDialogProps {
  contact: string | null;
  instagramHandle: string | null;
}

export const RoommateContactDialog = ({ contact, instagramHandle }: RoommateContactDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Kontakt
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Kontaktní informace</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <p className="text-lg">
            {contact || "Kontakt není k dispozici"}
          </p>
          {instagramHandle && (
            <div className="flex items-center space-x-2">
              <Instagram className="h-5 w-5 text-pink-500" />
              <a
                href={`https://instagram.com/${instagramHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                @{instagramHandle}
              </a>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};