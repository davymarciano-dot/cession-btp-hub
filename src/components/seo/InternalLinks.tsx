import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

interface InternalLink {
  label: string;
  href: string;
  description?: string;
}

interface InternalLinksProps {
  title: string;
  links: InternalLink[];
}

export const InternalLinks = ({ title, links }: InternalLinksProps) => {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {links.map((link, i) => (
              <Link
                key={i}
                to={link.href}
                className="group flex items-start gap-3 bg-card p-4 rounded-lg border hover:border-primary transition-all hover:shadow-md"
              >
                <ExternalLink className="w-5 h-5 text-primary shrink-0 mt-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                <div>
                  <div className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
                    {link.label}
                  </div>
                  {link.description && (
                    <div className="text-sm text-muted-foreground mt-1">
                      {link.description}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
