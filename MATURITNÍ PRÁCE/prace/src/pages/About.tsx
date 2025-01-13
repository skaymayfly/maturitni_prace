import { GraduationCap, Home, Users } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              O Fair Estate
            </h1>
            <p className="text-xl text-gray-600">
              Usnadňujeme studentům cestu k ideálnímu bydlení
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              V Fair Estate věříme, že hledání studentského bydlení by mělo být jednoduché a příjemné. 
              Naše platforma vznikla s jediným cílem - pomoci studentům najít perfektní bydlení 
              a ideální spolubydlící pro nezapomenutelná studentská léta.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center space-y-3">
                <div className="mx-auto w-12 h-12 flex items-center justify-center bg-primary/10 rounded-full">
                  <Home className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-gray-900">Snadné hledání</h3>
                <p className="text-gray-600">
                  Přehledný katalog bytů a pokojů speciálně pro studenty
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="mx-auto w-12 h-12 flex items-center justify-center bg-primary/10 rounded-full">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-gray-900">Spolubydlící</h3>
                <p className="text-gray-600">
                  Najděte si spolubydlící se stejnými zájmy a životním stylem
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="mx-auto w-12 h-12 flex items-center justify-center bg-primary/10 rounded-full">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-gray-900">Pro studenty</h3>
                <p className="text-gray-600">
                  Platforma vytvořená na míru potřebám studentů
                </p>
              </div>
            </div>

            <div className="mt-8 text-lg text-gray-700 leading-relaxed">
              <p>
                Naše komunita neustále roste a pomáhá studentům po celé České republice najít 
                to pravé místo k životu během studia. Ať už hledáte samostatný byt, pokoj ve 
                sdíleném bytě nebo spolubydlící, Fair Estate je tu pro vás.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;