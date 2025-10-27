const TestimonialSection = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ils Nous Font Confiance</h2>
          <p className="text-xl text-muted-foreground">
            Partenaires et experts qui soutiennent notre projet
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-12 rounded-2xl shadow-2xl">
            <blockquote className="text-2xl italic mb-8 leading-relaxed">
              "Enfin une solution dédiée au BTP ! La valorisation par IA et le matching intelligent 
              vont permettre aux entrepreneurs de maximiser la valeur de leur entreprise."
            </blockquote>
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-blue-400 flex items-center justify-center text-2xl font-bold">
                JPL
              </div>
              <div>
                <p className="font-bold text-lg">Jean-Pierre Lambert</p>
                <p className="text-blue-200">Ancien dirigeant BTP • Expert en transmission</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
