import { CreateListingForm } from "@/components/CreateListingForm";

export const CreateListing = () => {
  return (
    <div className="page-container">
      <div className="content-container max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Přidat novou nemovitost</h1>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <CreateListingForm />
        </div>
      </div>
    </div>
  );
};