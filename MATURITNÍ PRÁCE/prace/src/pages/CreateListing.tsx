import { CreateListingForm } from "@/components/CreateListingForm";

export const CreateListing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-8 animate-fade-in">
          Přidat novou nemovitost
        </h1>
        <div className="bg-white/80 backdrop-blur-md p-8 rounded-lg shadow-lg border border-purple-100 animate-fade-in">
          <CreateListingForm />
        </div>
      </div>
    </div>
  );
};