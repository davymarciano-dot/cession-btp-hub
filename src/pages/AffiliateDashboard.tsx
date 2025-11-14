import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, TrendingUp, Users, Euro, ExternalLink, Check } from "lucide-react";
import { toast } from "sonner";

const AffiliateDashboard = () => {
  const [copied, setCopied] = useState(false);
  
  // Mock data
  const affiliateCode = "BTP-EXPERT-2024";
  const affiliateLink = `https://cessionbtp.fr?ref=${affiliateCode}`;
  
  const stats = {
    totalReferrals: 47,
    pendingEarnings: 18500,
    paidEarnings: 124000,
    thisMonth: 12,
  };

  const transactions = [
    { id: 1, date: "2024-11-10", company: "Plomberie Paris", amount: 8000, status: "paid" },
    { id: 2, date: "2024-11-08", company: "Électricité Lyon", amount: 6500, status: "pending" },
    { id: 3, date: "2024-11-05", company: "Maçonnerie Nice", amount: 4000, status: "approved" },
    { id: 4, date: "2024-10-28", company: "Menuiserie Toulouse", amount: 7200, status: "paid" },
  ];

  const resources = [
    { title: "Bannières publicitaires", type: "Images", link: "#" },
    { title: "Email templates", type: "Documents", link: "#" },
    { title: "Landing pages", type: "HTML", link: "#" },
    { title: "Présentation PowerPoint", type: "PDF", link: "#" },
  ];

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(affiliateLink);
    setCopied(true);
    toast.success("Lien copié !");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Programme d'Affiliation</h1>
          <p className="text-muted-foreground">Gagnez jusqu'à 50% de commission sur chaque vente</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Parrainages</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalReferrals}</div>
              <p className="text-xs text-muted-foreground">+{stats.thisMonth} ce mois</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Gains en attente</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingEarnings.toLocaleString()}€</div>
              <p className="text-xs text-muted-foreground">À valider</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Gains payés</CardTitle>
              <Euro className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.paidEarnings.toLocaleString()}€</div>
              <p className="text-xs text-muted-foreground">Total versé</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary to-purple-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-white/90">Revenu Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(stats.pendingEarnings + stats.paidEarnings).toLocaleString()}€
              </div>
              <p className="text-xs text-white/80">Depuis le début</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="resources">Ressources</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Affiliate Link */}
            <Card>
              <CardHeader>
                <CardTitle>Votre lien d'affiliation</CardTitle>
                <CardDescription>
                  Partagez ce lien pour gagner des commissions sur chaque vente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <div className="flex-1 p-3 bg-muted rounded-lg font-mono text-sm">
                    {affiliateLink}
                  </div>
                  <Button onClick={copyToClipboard} variant="outline" size="icon">
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Code parrain: {affiliateCode}</p>
                  <p className="text-sm text-muted-foreground">
                    Cookie de tracking : 90 jours
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Commission Structure */}
            <Card>
              <CardHeader>
                <CardTitle>Structure des commissions</CardTitle>
                <CardDescription>Vos taux de commission par type de vente</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                    <div>
                      <div className="font-semibold">Première vente</div>
                      <div className="text-sm text-muted-foreground">Commission initiale</div>
                    </div>
                    <Badge variant="secondary" className="text-lg">50%</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <div>
                      <div className="font-semibold">Ventes suivantes</div>
                      <div className="text-sm text-muted-foreground">Commissions récurrentes</div>
                    </div>
                    <Badge variant="secondary" className="text-lg">30%</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                    <div>
                      <div className="font-semibold">Abonnements</div>
                      <div className="text-sm text-muted-foreground">Commission lifetime</div>
                    </div>
                    <Badge variant="secondary" className="text-lg">20%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle>Historique des transactions</CardTitle>
                <CardDescription>Toutes vos commissions et paiements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <div className="font-semibold">{transaction.company}</div>
                        <div className="text-sm text-muted-foreground">{transaction.date}</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-semibold">{transaction.amount.toLocaleString()}€</div>
                          <Badge
                            variant={
                              transaction.status === "paid"
                                ? "default"
                                : transaction.status === "approved"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {transaction.status === "paid" ? "Payé" : 
                             transaction.status === "approved" ? "Approuvé" : "En attente"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources">
            <Card>
              <CardHeader>
                <CardTitle>Ressources marketing</CardTitle>
                <CardDescription>Téléchargez nos outils pour promouvoir CessionBTP</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {resources.map((resource, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div>
                        <div className="font-semibold">{resource.title}</div>
                        <div className="text-sm text-muted-foreground">{resource.type}</div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default AffiliateDashboard;
