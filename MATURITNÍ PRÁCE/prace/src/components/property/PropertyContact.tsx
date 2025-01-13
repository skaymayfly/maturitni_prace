import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PropertyContactProps {
  ownerContact: string | null;
}

export const PropertyContact = ({ ownerContact }: PropertyContactProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Phone className="mr-2 h-4 w-4" />
          Zobrazit kontakt
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Kontaktní informace</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <p className="text-lg font-medium flex items-center">
            <Phone className="mr-2 h-4 w-4" />
            {ownerContact}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};