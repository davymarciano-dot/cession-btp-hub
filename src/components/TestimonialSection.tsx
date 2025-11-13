const TestimonialSection = () => {
  // Array de témoignages - à remplir avec de vrais témoignages
  const testimonials = [
    // Exemple de structure pour futurs témoignages :
    // {
    //   quote: "Citation du témoignage...",
    //   author: "Nom Prénom",
    //   role: "Poste • Entreprise",
    //   initials: "NP"
    // }
  ];

  // N'afficher la section que s'il y a des témoignages
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ils nous font confiance</h2>
          <p className="text-xl text-muted-foreground">
            Partenaires et experts qui soutiennent notre projet
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-12 rounded-2xl shadow-2xl mb-6">
              <blockquote className="text-2xl italic mb-8 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-blue-400 flex items-center justify-center text-2xl font-bold">
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-bold text-lg">{testimonial.author}</p>
                  <p className="text-blue-200">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
