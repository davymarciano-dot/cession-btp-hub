import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { trackSignUp } from './Analytics';
import { useToast } from '@/hooks/use-toast';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const registrationSchema = z.object({
  email: z.string().email('Email invalide').max(255),
  password: z.string().min(8, 'Minimum 8 caractères').max(100),
  name: z.string().min(2, 'Nom requis').max(100),
  phone: z.string().min(10, 'Téléphone invalide').max(20),
  company: z.string().max(100).optional(),
  type: z.enum(['buyer', 'seller']),
  budget: z.string().optional(),
  location: z.string().max(100).optional(),
  acceptTerms: z.boolean().refine(val => val === true, 'Vous devez accepter les CGU'),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

interface RegistrationFormProps {
  userType?: 'buyer' | 'seller';
}

export default function RegistrationForm({ userType = 'buyer' }: RegistrationFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<RegistrationFormData>({
    email: '',
    password: '',
    name: '',
    phone: '',
    company: '',
    type: userType,
    budget: '',
    location: '',
    acceptTerms: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate form data
      const validatedData = registrationSchema.parse(formData);

      // Create auth account
      const redirectUrl = `${window.location.origin}/`;
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: validatedData.email,
        password: validatedData.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            name: validatedData.name,
            type: validatedData.type,
          },
        },
      });

      if (authError) throw authError;

      if (!authData.user) {
        throw new Error('Erreur lors de la création du compte');
      }

      // Create profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          email: validatedData.email,
          name: validatedData.name,
          phone: validatedData.phone,
          company: validatedData.company || null,
          user_type: validatedData.type,
          budget_range: validatedData.budget || null,
          location: validatedData.location || null,
          interested_sectors: [],
        });

      if (profileError) throw profileError;

      // Track conversion
      trackSignUp(validatedData.type);

      // Send welcome email
      try {
        await supabase.functions.invoke('send-welcome-email', {
          body: { email: validatedData.email, name: validatedData.name },
        });
      } catch (emailError) {
        console.error('Welcome email error:', emailError);
        // Don't fail registration if email fails
      }

      // Success
      toast({
        title: '✅ Inscription réussie !',
        description: 'Vérifiez vos emails pour confirmer votre compte.',
      });

      // Redirect
      if (validatedData.type === 'seller') {
        navigate('/vendre');
      } else {
        navigate('/acheter');
      }
    } catch (error) {
      console.error('Registration error:', error);
      if (error instanceof z.ZodError) {
        toast({
          variant: 'destructive',
          title: 'Erreur de validation',
          description: error.errors[0]?.message || 'Données invalides',
        });
      } else if (error instanceof Error) {
        toast({
          variant: 'destructive',
          title: 'Erreur',
          description: error.message,
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Erreur',
          description: "Erreur lors de l'inscription",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>
          {formData.type === 'seller' ? '🏗️ Vendre mon entreprise' : '🔍 Trouver une entreprise'}
        </CardTitle>
        <CardDescription>
          Créez votre compte pour accéder à toutes les fonctionnalités
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="email@example.com"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe *</Label>
            <Input
              id="password"
              type="password"
              required
              minLength={8}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Minimum 8 caractères"
            />
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Nom complet *</Label>
            <Input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Jean Dupont"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone *</Label>
            <Input
              id="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="06 12 34 56 78"
            />
          </div>

          {/* Company */}
          <div className="space-y-2">
            <Label htmlFor="company">Entreprise</Label>
            <Input
              id="company"
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="SARL Construction"
            />
          </div>

          {/* Budget (for buyers) */}
          {formData.type === 'buyer' && (
            <div className="space-y-2">
              <Label htmlFor="budget">Budget</Label>
              <Select
                value={formData.budget}
                onValueChange={(value) => setFormData({ ...formData, budget: value })}
              >
                <SelectTrigger id="budget">
                  <SelectValue placeholder="Sélectionner..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-250k">0 - 250 000€</SelectItem>
                  <SelectItem value="250-500k">250 000 - 500 000€</SelectItem>
                  <SelectItem value="500k-1m">500 000 - 1M€</SelectItem>
                  <SelectItem value="1m+">Plus de 1M€</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Terms */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={formData.acceptTerms}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, acceptTerms: checked as boolean })
              }
            />
            <Label htmlFor="terms" className="text-sm leading-tight cursor-pointer">
              J'accepte les{' '}
              <a href="/terms" className="text-primary hover:underline">
                CGU
              </a>{' '}
              et la{' '}
              <a href="/privacy" className="text-primary hover:underline">
                politique de confidentialité
              </a>
            </Label>
          </div>

          {/* Submit */}
          <Button type="submit" disabled={loading || !formData.acceptTerms} className="w-full">
            {loading ? '⏳ Inscription...' : '🚀 Créer mon compte'}
          </Button>

          {/* Benefits */}
          <Card className="bg-muted">
            <CardContent className="pt-4">
              <h3 className="font-semibold mb-2">✅ Vos avantages</h3>
              <ul className="text-sm space-y-1">
                {formData.type === 'seller' ? (
                  <>
                    <li>• Évaluation gratuite de votre entreprise</li>
                    <li>• Mise en relation avec acheteurs qualifiés</li>
                    <li>• Accompagnement personnalisé</li>
                    <li>• Confidentialité garantie</li>
                  </>
                ) : (
                  <>
                    <li>• Accès à +500 entreprises à vendre</li>
                    <li>• Alertes personnalisées</li>
                    <li>• Mise en relation directe</li>
                    <li>• Conseils d'experts</li>
                  </>
                )}
              </ul>
            </CardContent>
          </Card>
        </form>
      </CardContent>
    </Card>
  );
}
