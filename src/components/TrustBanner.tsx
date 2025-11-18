const TrustBanner = () => {
  const partners = [
    { name: "BPI France", logo: "🏦" },
    { name: "CCI", logo: "🏛️" },
    { name: "FFB", logo: "🏗️" },
    { name: "Qualibat", logo: "✓" },
  ];

  return (
    <section className="bg-muted py-12 border-y border-border">
      <div className="container mx-auto px-4">
        <p className="text-center mb-8 text-muted-foreground font-medium">
          Ils nous font confiance
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity group"
            >
              <div className="text-5xl group-hover:scale-110 transition-transform">
                {partner.logo}
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
        
        <div className="mt-8 flex justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span>Certifié</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span>Sécurisé</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span>Confidentiel</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBanner;
